pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

import "./SafeMath.sol";
import "./Ownable.sol";
import "./BCP_informed.sol";

contract MusicFactory is BCP_informed, Ownable {

    using SafeMath for uint256;

    /* global variables */
    uint current_money_pool;
    uint next_money_pool;
    uint abo_price                      = 10 gwei;
    uint payout_period                  = 10; // 190k blocks = more or less 1 month
    uint block_number_start_period      = block.number;
    int64 commitmentID;

    constructor(
    int64 _commitmentID,
    address payable bcpAddress
    ) payable BCP_informed(bcpAddress) {
        commitmentID = _commitmentID;
    }

    /* Structs */
    struct Artist {
        bool exists;
        string name;
        int88 active;
        uint32 orderID;
    }

    struct User {
        bool exists;
        uint time_horizon;
    }

    /* Lists */
    Artist[] private artists;
    User[] private users;

    /* Mappings */
    mapping (address=>User) private AddressToUser;
    mapping (address=>Artist) private AddressToArtist;
    mapping (uint32=>address) private orderIDToAddress;

    /* Events */
    event newArtist(
        string name,
        address _address
    );

    event newUser(
        address _address
    );

    event newAbo(
        address _address,
        uint time_horizon
    );

    event payout_artist(
        address artist_ids, 
        uint salary_wei
    );

    event receivedData(
        int88 data
    );


    /* Artist Functions */
    function register_artist(string memory name, string memory artist_address) public payable {
        require(!AddressToArtist[msg.sender].exists, "This address has already registered as an artist");
        uint32 _gasForMailbox = 60000;
        uint64 _gasPriceInGwei = 5; 
        uint256 _transactionCosts = BCP.GetTransactionCosts(
            commitmentID,
            _gasForMailbox,
            _gasPriceInGwei
        );
        uint32 orderID = BCP.ORDER{value: _transactionCosts}(
            commitmentID,
            _gasForMailbox,
            artist_address,
            uint32(block.timestamp),
            _gasPriceInGwei
        );
        AddressToArtist[msg.sender] = Artist(true, name, 0, orderID);
        orderIDToAddress[orderID] = msg.sender;
        artists.push(AddressToArtist[msg.sender]);
        emit newArtist(name, msg.sender);
    }


    /* User Functions */
    function register_user() public {
        require(!AddressToUser[msg.sender].exists, "This address has already registered as a user");
        AddressToUser[msg.sender] = User(true, 0);
        users.push(AddressToUser[msg.sender]);
        emit newUser(msg.sender);
    }

    function buy_membership() public payable {
        require(AddressToUser[msg.sender].exists, "You need to sign up before buying a membership");
        require(!validate_abo(msg.sender), "You have an active membership");
        require(msg.value == abo_price, "You have entered an incorrect fee for the desired duration of membership");
        uint blocks_passsed_since_start_period = block.number - block_number_start_period;
        uint money_pool_ratio = 100*blocks_passsed_since_start_period/payout_period;
        uint future_money = (abo_price * money_pool_ratio) / 100;
        current_money_pool = current_money_pool.add(abo_price-future_money);
        next_money_pool = next_money_pool.add(future_money);
        User storage current_user = AddressToUser[msg.sender];
        current_user.time_horizon = block.timestamp + 60 seconds; // 60 seconds for testing purposes, otherwise 30 days
        emit newAbo(msg.sender, current_user.time_horizon);
    }

    /* Admin Functions */
    function payout(address[] memory artist_ids, uint[] memory clicks) public payable onlyOwner {
        // Has to be called in <= payout_period (currently 1 month) otherwise money_pool ratio in func buy_membership is > 1
        // input for this function will be two lists or a dict coming from frontend artist id's and counts
        // convert them to internal representation and use mapping to get artists addresses
        uint oneWei = 1 wei;
        uint count_payouts = artist_ids.length;
        uint amount_gas_for_payouts = count_payouts * 21000;
        uint amount_left_for_payouts = current_money_pool - amount_gas_for_payouts;
        uint total_clicks = 0;
        for (uint i = 0; i < clicks.length; i++) {
            total_clicks += clicks[i];
        }
        uint payout_amount_per_click = amount_left_for_payouts/ total_clicks;

        for (uint i=0; i < artist_ids.length; i++) {
            uint artist_salary = clicks[i] * payout_amount_per_click;
            uint salary_wei = artist_salary * oneWei;
            payable(artist_ids[i]).transfer(salary_wei);
            emit payout_artist(artist_ids[i], salary_wei);
        }

        uint leftovers_brutto = address(this).balance - next_money_pool;
        uint leftovers_netto = 0;
        if (leftovers_brutto> 21000){
            leftovers_netto = leftovers_brutto - 21000;
        }
        current_money_pool = next_money_pool;
        next_money_pool = 0;
        block_number_start_period = block.number;
        if (leftovers_netto != 0){
            payable(msg.sender).transfer(leftovers_netto);
        }
    }

    function validate_abo(address address_to_check) public view returns(bool) {
        User storage current_user = AddressToUser[address_to_check];
        if (current_user.time_horizon <= block.timestamp) {
            return false;
            }
        else {
            return true;
        }
        }

    function set_abo_price(uint price) public onlyOwner{
        abo_price = price;
    }

    function set_payout_period(uint number_of_blocks) public onlyOwner{
        payout_period = number_of_blocks;
    }

    function check_artist_active(address artist_address) public view returns(int88) {
        return AddressToArtist[artist_address].active;
    }

    function get_current_moneypool() public view returns(uint) {
        return current_money_pool;
    }

    function get_next_moneypool() public view returns(uint) {
        return next_money_pool;
    }

    function get_block_number_start_period() public view returns(uint) {
        return block_number_start_period;
    }

    function get_abo_price() public view returns(uint) {
        return abo_price;
    }

    function get_time_horizon() public view returns(uint) {
        return AddressToUser[msg.sender].time_horizon;
    }

    function get_artists() public view returns(Artist[] memory) {
        return artists;
    }


    function get_current_block() public view returns(uint){
        return block.number;
    }

    function Mailbox(uint32 _orderID, int88 _data, bool _statusFlag) override external payable onlyBCP {
        emit receivedData(_data);
        if (_statusFlag){
             address ArtistAdress = orderIDToAddress[_orderID];
             Artist storage artist = AddressToArtist[ArtistAdress];
             artist.active = _data;
            }
        }

    fallback() external payable override {}
    receive() external payable override {}
}