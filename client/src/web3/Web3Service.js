import Web3 from 'web3';
import musicFactory from 'contracts/MusicFactory.json';

let currentAccount;

let musicFactoryContract;

let setupDone = false;

const local_contract_address = "0x6A18b08168a0726f660d45bA5e98C34Ef2B7A93c";
const local_account = "0xd2Bad569ee8f11c3E6Df92EE39Da0F60F95e0eb1";

export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined'){
      provider.request({method: 'eth_requestAccounts'}).then((accounts) => {
        currentAccount = accounts[0];
        console.log(`Current account address is: ${currentAccount}`);
      }).catch((error) => {
        console.log(error);
        return;
      });

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
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.register_user().send({from: local_account});
}

export const register_artist = async (name) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.register_artist(name).send({from: local_account});
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

export const payout = async (id, clicks) => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.payout(id, clicks).send({from: local_account});
}

export const _validate_abo = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods._validate_abo().send({from: local_account});
}

export const buy_membership = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.buy_membership().send({from: local_account});
}

