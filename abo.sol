pragma solidity >=0.8.0 <0.9.0;

contract Abo{
    uint time_horizon;
    uint money_pool;
    bool is_active;
    
    mapping (id => address) artist; 


    uint Arists[2] = [0xF62b6fec19BCcDD2C0f9a881f1473A756dC91012, 0x5E4047654775631C306750B04E55B31cd3c94855];
    uint counts[2] = [5,10];


    constructor() public {
        time_horizon = block.timestamp + 20 seconds; // no idea if public private 
        is_active = true;
        money_pool = 1000 wei;
    }

    function _validate_abo() public {
        if (time_horizon <= block.timestamp) {
            is_active = false;
            }
    }

    function get_is_active() public view returns(bool) {
        return is_active;
    }

    function payout(address[] artists, uint[] clicks) public {
        uint count_payouts = artists.length;
        uint amount_gas_for_payouts = count_payouts * 21000;
        uint amount_left_for_payouts = money_pool - amount_gas_for_payouts;
        uint total_clicks = 0;
        for (uint i = 0; i < clicks.length; i++) {
            total_clicks += clicks[i];
        }
        uint payout_amount_per_click = amount_left_for_payouts/ total_clicks;

        for (uint i=0; i < artists.length; i++) {
            uint artist_clicks = clicks[i] * payout_amount_per_click;
            artists[i].transfer(artist_clicks);
        }


    }
}