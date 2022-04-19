# Challenge Task Client

<!-- ABOUT THE PROJECT -->
## About The Project

This is the client app which works with the smart contract "main.sol". Users are able to register or login to the app. Once the app is accessed, users can buy a membership for a limited amount of time, enabling them to listen to as many songs as desired. Artists can register themselves on the app as well, and link their music to the app. Each time a song of artist is listened by an user, a counter is incremented in order to keep track of the amount of playbacks. In regurlar intervalls artists receive their payout via the smart contract based on how many clicks their songs had.

### Built With

The following are the major frameworks/libraries used in this project:

* [web3.js](https://web3js.readthedocs.io/en/v1.7.3/#)
* [React.js](https://reactjs.org/)
* [Ant Design](https://ant.design/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Install the dependencies of the client:
* npm
  ```sh
  npm install npm
  ```
Install Ganache and start a local blockchain:
* [Ganache](https://trufflesuite.com/ganache/)

Install MetaMask for Google Chrome:
* [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)

Add a local Ganache account to MetaMask:
* "Import Account" --> Enter secret key (from Ganache)
* Connect the account to the local Ganache network (usually HTTP://127.0.0.1:7545) in MetaMask

Compile and Deploy the smart contract "main.sol":
* install the VS Code Extension "Ethereum Remix"
* Compile the contract with "Compiler"
* The .json files should be in the folder "artifacts" (if compiling doesn't work: make a local copy of "main.sol" and move it into the highest hierarchy of the folder structure, then compile again on the copy)
* Use "Run & Deploy" to deploy the contract
* Once deployed, copy the Deployed Contract Address

Add your deployed contract address and your account (from Ganache) to the client code:
* file: "Web3Service.js"
  ```sh
  const local_contract_address = "YOUR_LOCAL_CONTRACT_ADDRESS";
  const local_account = "YOUR_LOCAL_ACCOUNT";
  ```
  
### Run the client

1. Start the react app
   ```sh
   npm start react
   ```
