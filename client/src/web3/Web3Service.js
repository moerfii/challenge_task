import Web3 from 'web3';
import musicFactory from 'contracts/MusicFactory.json';

let currentAccount;

let musicFactoryContract;

let setupDone = false;

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
    const local_contract_address = "0x6cab8F9FA2a719b73E33C5814fd6B0f05fB9773b";

    musicFactoryContract = new web3.eth.Contract(musicFactory.abi, local_contract_address);

    setupDone = true;
};

export const get_abo_price = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_abo_price().call();
}

export const get_user_id = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.get_user_id().call();
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

export const regist_user = async () => {
    if (!setupDone){
        await init();
    }
    return musicFactoryContract.methods.regist_user().send({from: "0x763677e9987bc21e7AD127389d3A0eF495E3d78D"});
}

