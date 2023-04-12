const lottery = artifacts.require("Lottery.sol")

module.exports = function (deployer) {
    deployer.deploy(lottery, 1000000000000000000n, 5)
}