import Web3 from 'web3';
import musicFactory from 'contracts/MusicFactory.json';

let musicFactoryContract;

let setupDone = false;

var currentAccount = "";

const local_contract_address = "0x95a511c60A2A5C40523Ee74EC1F6f7751D294a46";
const local_account = "0x2E44c0b8ABA332601F294698B7fD047E04A60015";

//     provider.request({method: 'eth_requestAccounts'}).then((accounts) => {
//     currentAccount = accounts[0];
//     console.log(`Current account address is: ${currentAccount}`);
//     console.log(typeof(currentAccount));
export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined'){
        try{
            var accounts = await provider.request({method: 'eth_requestAccounts'})
            currentAccount = accounts[0];
            console.log(`Current account address is: ${currentAccount}`);
        } catch(error) {
            console.log(error)
        }
      /* }).catch((error) => {
        console.log(error);
        return;
      }); */

      window.ethereum.on('accountChanged', function (accounts){
        currentAccount = accounts[0];
        console.log(`Current account (changed) address is: ${currentAccount}`);
      });
    }

    const web3 = new Web3(provider);
    //const netId = await web3.eth.net.getId();

    musicFactoryContract = new web3.eth.Contract(musicFactory.abi, local_contract_address);
    setupDone = true;
};

export const get_abo_price = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_abo_price().call();
}

export const get_time_horizon = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_time_horizon().call();
}

export const get_artists = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_artists().call();
}

export const get_block_number_start_period = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_block_number_start_period().call();
}

export const get_next_moneypool = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_next_moneypool().call();
}

export const get_current_moneypool = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_current_moneypool().call();
}

export const register_user = async () => {
    console.log(setupDone);
    if (!setupDone){
        await init();
        
    }
    console.log(setupDone);
    console.log(`Current account address is: ${currentAccount}`);
    return musicFactoryContract.methods.register_user().send({from: currentAccount}).then(console.log)
    .catch(console.log);    
}

export const register_artist = async (name) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.register_artist(name).send({from: currentAccount, value: Web3.utils.toWei("500000","gwei")});
}

export const set_abo_price = async (price) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.set_abo_price(price).send({from: local_account});
}

export const set_payout_period = async (period) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.set_payout_period(period).send({from: local_account});
}

export const payout = async (artist_ids, clicks) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.payout(artist_ids, clicks).send({from: local_account});
}

export const validate_abo = async (address) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.validate_abo(address).call();
}

export const buy_membership = async (address, price) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.buy_membership().send({from: address, value: price});
}

