const lottery = artifacts.require("Lottery.sol")
const fs = require("fs");

module.exports = function (deployer) {
    const keys = JSON.parse(fs.readFileSync("keys/keys.json"));
    const privateKey = keys.private_keys[Object.keys(keys.private_keys)[0]]
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log(keys)
    deployer.deploy(lottery, 1000000000000000000n, 5, {from: account.address})
}