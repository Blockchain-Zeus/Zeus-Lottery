# Zeus Lottery
Zeus Lottery is a decentralized lottery system built on the Ethereum blockchain. This Github project provides the necessary code to run and test the project locally using Docker Compose.

## Prerequisites
To run Zeus Lottery locally, you'll need the following:

- Docker: You can download and install Docker from the official website.
- Git: You can download and install Git from the official website.

## Getting Started
To get started with Zeus Lottery, follow these steps:

Clone the repository to your local machine:

```
git clone https://github.com/Blockchain-Zeus/Zeus-Lottery.git
```
Navigate to the project directory:

```
cd zeus-lottery
```
Start the Docker Compose file:

```
docker-compose up
```
This will start all the necessary services and expose the frontend on port 3000 of the host machine.

Open a web browser and go to `http://localhost:3000` to view the frontend.

Start developing! You can modify the code in the `./lottery-frontend` and `./truffle` directories to customize the project to your needs.

## Manual Testing

To test this project, you need to have the MetaMask wallet installed. MetaMask is a browser extension that allows users to manage their Ethereum wallets and interact with Ethereum-based dApps. You can download MetaMask from their official website at https://metamask.io/.

### Adding a Network
Once you have installed MetaMask, you need to add a new network to it. To do this, click on the network selection dropdown and select "Custom RPC". Then, enter the following details:

- Network Name: `Testnet`
- New RPC URL: `http://localhost:8545`
Click on save, and you should now be connected to the network running on localhost port 8545.

### Adding a Wallet
Next, you need to add an existing wallet to your MetaMask wallet using a private key. You can find all the private keys in the `./keys/keys.json` file. To add a wallet, follow these steps:

Click on the MetaMask extension icon to open the wallet.
Click on the account avatar in the top-right corner of the wallet.
Select "Import Account" from the dropdown menu.
Paste the private key of the wallet you want to add from the `./keys/keys.json` file.
Click on "Import".
You should now be able to interact with the project using your MetaMask wallet. Happy testing!