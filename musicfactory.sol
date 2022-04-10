pragma solidity >=0.8.0 <0.9.0;

import "./SafeMath.sol";
import "./Ownable.sol";



contract MusicFactory is Ownable {

    using SafeMath for uint256;

    uint current_money_pool;
    uint next_money_pool;
    uint user_id = 0;
    uint abo_price = 10 gwei;
    uint payout_period = 10; // 190k blocks = more or less 1 month
    uint block_number_start_period = block.number;
    address pear_owner = msg.sender;

    struct Artist {
    /// everything we need to know about an artist
        string name;
        address _address; /// the eth address

    }

    struct User {
    /// everything we need to know about a user
        uint id;
        address _address;
        uint time_horizon; /// eth address
        bool is_active;

    }

    Artist[] private artists;
    User[] private users;

    mapping (address=>uint) private AddressToUserid;


    event newArtist(
        string name,
        address _address
    );

    event newUser(
        address _address,
        bool is_active
    );

    event newAbo(
        address _address,
        uint time_horizon,
        bool is_active
    );

    // check if memory or calldata
    function register_artist(string memory name) public {
        /// check if artist is already registered ?
        /// check in excel sheet if artist is really artist :D (oracle)
        artists.push(Artist(name, msg.sender));
        emit newArtist(name, msg.sender);
    }

    function regist_user() public {
        users.push(User(user_id, msg.sender, 0, false));
        AddressToUserid[msg.sender] = user_id;
        user_id = user_id.add(1);
        emit newUser(msg.sender, false);
    }

    function buy_membership() public payable {
        require(msg.value == abo_price);
        uint blocks_passsed_since_start_period = block.number - block_number_start_period;
        uint money_pool_ratio = 100*blocks_passsed_since_start_period/payout_period;
        uint future_money = (abo_price * money_pool_ratio) / 100;
        current_money_pool = current_money_pool.add(abo_price-future_money);
        next_money_pool = next_money_pool.add(future_money);
        uint current_userid = AddressToUserid[msg.sender];
        User storage current_user = users[current_userid];
        current_user.time_horizon = block.timestamp + 30 days; //
        current_user.is_active = true;
        emit newAbo(msg.sender, current_user.time_horizon, current_user.is_active);
    }


        function payout(address[] memory artist_ids, uint[] memory clicks) public payable onlyOwner {
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
            //address payable addr = artist_ids[i];
            uint salary_wei = artist_salary * oneWei;
            payable(artist_ids[i]).transfer(salary_wei);
        }

        current_money_pool = next_money_pool;
        next_money_pool = 0;
        block_number_start_period = block.number;

        uint leftovers_brutto = current_money_pool - address(this).balance;
        uint leftovers_netto = leftovers_brutto - 21000;
        payable(pear_owner).transfer(leftovers_netto);
    }


    function set_abo_price(uint price) public onlyOwner{
        abo_price = price;
    }

    function set_payout_period(uint number_of_blocks) public onlyOwner{
        payout_period = number_of_blocks;
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

    function get_user_id() public view returns(uint) {
        return user_id;
    }




    /*
    
    function _validate_abo() public {
    if (time_horizon <= block.timestamp) {
        is_active = false;
        }
    }





    function register_user(string name, address user_address){
        /// do we also need a password?

         users.push(User(name, user_id, user_address, 0)); //set abo to 0 at the beginning
         user_id = user_id.add(1);
    }

    // we can remove an artist from artists but leads to a hole in the array

    function remove_artist(uint id) {

        ///is there an efficient way to do this in solidity?
    }

    function remove_user(uint id) {
        ///is there an efficient way to do this in solidity?
    }



    function extend_membership(uint user_id, uint money){
        User user = users[user_id];
        if (user.abo == 0) {
            // return not possible or something
        } else {
            uint end_of_month = 0; // compute end of month somehow
            user.abo.time_horizon = end_of_month;
            user.abo.money_pool = money;
            user.abo.is_active = true;
        }


    }

    */

    // do we even need cancel membership when abos are running for one month?





}