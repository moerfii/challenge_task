pragma solidity >=0.8.0 <0.9.0;

contract MusicFactory {

    uint public artist_id = 0;
    uint public user_id = 0;


    struct Artist {
    /// everything we need to know about an artist
        string name;
        uint id;
        address _address; /// the eth address

    }

    struct User {
    /// everything we need to know about a user
        string name;
        uint id;
        address _address; /// eth address
        Abo abo;

    }

    Artist[] private artists;
    User[] private users;
    Abo[] private abos;


    function register_artist(string name, address artist_address){
        /// check if artist is already registered ?
        /// check in excel sheet if artist is really artist :D

        artists.push(Artist(name, artist_id, artist_address);
        artist_id = artist_id.add(1); /// increment artist_id and prevent overflow
    }

    function register_user(string name, address user_address){
        /// do we also need a password?

         users.push(User(name, user_id, user_address, 0); //set abo to 0 at the beginning
         user_id = user_id.add(1);
    }

    // we can remove an artist from artists but leads to a hole in the array

    function remove_artist(uint id) {

        ///is there an efficient way to do this in solidity?
    }

    function remove_user(uint id) {
        ///is there an efficient way to do this in solidity?
    }

    function buy_membership(uint user_id, uint money){
        User user = users[user_id];
        uint end_of_month = 0; // compute end of month somehow
        user.abo = Abo(end_of_month, true, money); // how to money? does the abo has a wallet? or make one big wallet from musicfactory and every payment from there?

    }

    function extend_membership(uint user_id, uint money){
        User user = users[user_id];
        if (user.abo == 0) {
            // return not possible or something
        } else {
            uint end_of_month = 0 // compute end of month somehow
            user.abo.time_horizon = end_of_month;
            user.abo.money_pool = money;
            user.abo.is_active = true
        }


    }

    // do we even need cancel membership when abos are running for one month?





}