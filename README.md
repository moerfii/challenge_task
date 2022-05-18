# Challenge Task
BCOLN FS2022
Group Poseidon:
- Ben Murphy 
- Dario Gagulic
- Dave Brian Basler
- Jason Immanuel Browne
- Lynn Zumtaugwald



# Pearify
A decentralized music streaming platform.

## What is Pearify
In the current version of Pearify, users can purchase a monthly subscription which costs an adjustable amount. After purchasing the abo, the user gains access to all the music on Pearify. The collected money enters a pot and is distributed to artists on a monthly basis via the music factory smart contract. The amount is defined by the amount of listens an artist has received. We initially intended to pay artists directly (from user to artist) however we realized that this would have led to many more transactions with smaller amounts of money. Since transaction fees on the Ethereum blockchain are high this would have reduced the revenue generated to near zero, rendering this approach infeasible.

Artists can register and log in via the GUI and get a custom page on Pearify. The registration process is completed off- and on-chain via the blockchain oracle service provided by Blockchain Presence AG (BCP), a spin-off by the University of Zurich. Once the transaction is confirmed, they can observe monthly statistics about their performance in terms of numbers of clicks and revenue generated.


# Installation Guidelines
## Local Database/JSON Storage

<!-- ABOUT THE PROJECT -->
### About The Project

This is the local database/JSON storage solution of the app. Basically, it is a collection of JSON files, which are hosted locally and can be accessed by the client through axios calls (GET, POST, PUT, DELETE). It simulates a potential future centralized storage solution.

### Built With

The following frameworks is used:

* [json-server](https://www.npmjs.com/package/json-server)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Install the dependencies of the client:
* npm
  ```sh
  npm install npm
  ```
  
### Run the client

1. Start the app
   ```sh
   npm start
   ```
## Client

<!-- ABOUT THE PROJECT -->
### About The Project

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

Add your deployed contract address to the client code:
* file: "Web3Service.js"
  ```sh
  const local_contract_address = "YOUR_LOCAL_CONTRACT_ADDRESS";
  ```
  
### Run the client

1. Start the react app
   ```sh
   npm start react
   ```
