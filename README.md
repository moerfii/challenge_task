# Challenge Task
BCOLN FS2022
Group Poseidon:
- Ben Murphy 
- Dario Gagulic
- Dave Brian Basler
- Jason Immanuel Browne
- Lynn Zumtaugwald



## Pearify
A decentralized music streaming platform.

## What is Pearify
In the current version of Pearify, users can purchase a monthly subscription which costs an adjustable amount. After purchasing the abo, the user gains access to all the music on Pearify. The collected money enters a pot and is distributed to artists on a monthly basis via the music factory smart contract. The amount is defined by the amount of listens an artist has received. We initially intended to pay artists directly (from user to artist) however we realized that this would have led to many more transactions with smaller amounts of money. Since transaction fees on the Ethereum blockchain are high this would have reduced the revenue generated to near zero, rendering this approach infeasible.

Artists can register and log in via the GUI and get a custom page on Pearify. The registration process is completed off- and on-chain via the blockchain oracle service provided by Blockchain Presence AG (BCP), a spin-off by the University of Zurich. Once the transaction is confirmed, they can observe monthly statistics about their performance in terms of numbers of clicks and revenue generated.


