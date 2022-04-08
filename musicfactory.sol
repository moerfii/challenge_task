pragma solidity >=0.8.0 <0.9.0;

import "./SafeMath.sol";



contract MusicFactory {

    using SafeMath for uint256;

    uint money_pool;
    uint user_id = 0;
    uint requiredAmount = 0.001 ether;

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
        user_id.add(1);
        emit newUser(msg.sender, false);
    }

    function buy_membership() public payable {
        require(msg.value == requiredAmount);
        money_pool += msg.value;
        uint current_userid = AddressToUserid[msg.sender];
        User storage current_user = users[current_userid];
        current_user.time_horizon = block.timestamp + 30 days; //
        current_user.is_active = true;
        emit newAbo(msg.sender, current_user.time_horizon, current_user.is_active);
    }

    /*

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