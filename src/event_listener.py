import json
import time
from web3 import Web3


def http_connect(url):
    web3 = Web3(Web3.HTTPProvider(endpoint_uri=url))
    t0 = time.time()
    while not web3.isConnected():
        web3 = Web3(Web3.HTTPProvider(url))
        t1 = time.time()
        if (t1-t0) > 86400:
            raise TimeoutError
    return web3

def call_new_artist(contract, name: str, public_key,private_key):
    transaction = {
        'nonce': web3.eth.getTransactionCount(public_key),
        'value': int(0),
        "gasPrice": int(20*1e9),
        'gas': 150000,
        }
    tx = contract.functions.register_artist(name).buildTransaction(transaction)
    signed_tx = web3.eth.account.signTransaction(tx, private_key=private_key)
    tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    print(f'{name} created')





if __name__ == "__main__":
    pin = '0x2E44c0b8ABA332601F294698B7fD047E04A60015'
    private_key = '6a291711918c9695bdb57e0cc9f048d1d2fc5c4bf16d0ee0042f3dbd0d2d1796'
    puk = '0xa5727D7F321Ae6DA6B9219f7aeA596f2240D08B5'
    puk_pk = '2aed0271ebab4d64413d08d4ad7d1fad987ecb8391b4c36732cf336c3413697a' # pls don't rob my test-ether
    url = "http://127.0.0.1:8545"
    web3 = http_connect(url=url)
    contract_address = "0xc90A19cb4A096441c8cF503FDFd7BAE6683cE716"
    address = web3.toChecksumAddress(contract_address)
    print(f'connected to web3: {web3.isConnected()}')
    with open('./contract_abi.json') as f:
        abi = json.load(f)
    contract = web3.eth.contract(
        address=address, abi=abi)

    call_new_artist(contract, "ben miller", puk, puk_pk)

    eventfilter = contract.events.newAbo.createFilter(toBlock='latest', fromBlock=0)
    events = [event for event in eventfilter.get_all_entries()]
    #print(events)

    ["0x2E44c0b8ABA332601F294698B7fD047E04A60015", "0xa5727D7F321Ae6DA6B9219f7aeA596f2240D08B5"]
    []