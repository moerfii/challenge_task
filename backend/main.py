import json
import os
from web3 import Web3
import time

def http_connect(url):
    web3 = Web3(Web3.HTTPProvider(endpoint_uri=url))
    t0 = time.time()
    while not web3.isConnected():
        web3 = Web3(Web3.HTTPProvider(url))
        t1 = time.time()
        if (t1-t0) > 86400:
            raise TimeoutError
    return web3

def get_new_order_events():
    pass

def execute_relay(contract, pin, pk, order):
    transaction = {
        'nonce': contract.web3.eth.getTransactionCount(pin),
        'value': int(0),
        "gasPrice": int(70*1e9),
        'gas': 200000,
    }
    print(order)
    order_id = order['orderID']
    location = order['_location']
    print(location)
    datapoint, status = get_datapoint(location)
    print(f"datapoint:{datapoint}, status:{status}")
    tx = contract.functions.Relay(
        order_id, 
        datapoint, 
        status
    ).buildTransaction(transaction)
    signed_tx = contract.web3.eth.account.signTransaction(tx, private_key=pk)
    tx_hash = contract.web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    print(tx_hash.hex())
    contract.web3.eth.waitForTransactionReceipt(tx_hash)
    print('Relay called')

def get_datapoint(location):
    with open('artists.json') as artistfile:
        artist_dict = json.load(artistfile)
        try:
            datapoint = artist_dict[location]
            status = True
        except KeyError:
            datapoint = 404
            status = False
    return datapoint, status




if __name__ == "__main__":
    """
    Instructions:

    Add your credentials to a file credentials.txt as such:

    {"pin":"0x2E44....",              ## make sure to use the address you have used in the new_sender registration process
    "private_key":"abjf4fj....."}


    set the test_url to a light node http connection address
    set the test_contract address to the address of the deployed main.sol


    run script. It will execute the last order received only. 
    """

    if os.path.isfile("credentials.txt"):
        with open("credentials.txt", "r") as f3:
            credentials = json.load(f3)
            pin = credentials['pin']
            pk = credentials['private_key']

    test_url = "http://127.0.0.1:8545"
    web3 = http_connect(url=test_url)
    test_contract_address = '0xBcC56746a7958BeD53D4E2B246b8a75c0f049E34'
    address = web3.toChecksumAddress(test_contract_address)

    print(f'connected to web3: {web3.isConnected()}')
    with open('contract_abi.json') as f:
        abi = json.load(f)
    contract = web3.eth.contract(
        address=address, abi=abi)

    eventfilter = contract.events.newOrder.createFilter(toBlock='latest', fromBlock=0)
    order_events = [event for event in eventfilter.get_all_entries()]
    events = [event for event in order_events if
                dict(event)['args']['_PIN'] in pin and dict(event)['address'] == address]
    execute_relay(contract=contract, pin=pin, pk=pk, order=events[-1]['args'])

