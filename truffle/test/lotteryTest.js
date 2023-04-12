// Import the necessary libraries
const Lottery = artifacts.require("Lottery");
const { expect } = require("chai");

// Define the test suite
contract("Lottery", (accounts) => {
  let lottery;

  // Define the before hook to create a new instance of the contract before each test
  before(async () => {
    lottery = await Lottery.new(100, 3); // Set ticket price to 100 and ticket count to 3
  });

  // Define the first test case to ensure the contract was deployed correctly
  it("should deploy the contract correctly", async () => {
    const owner = await lottery.owner();
    expect(owner).to.equal(accounts[0]);
    const ticketPrice = await lottery.ticketPrice();
    expect(ticketPrice).to.equal("100");
    const ticketCount = await lottery.ticketCount();
    expect(ticketCount).to.equal("3");
  });

  // Define the second test case to ensure a player can buy a ticket and be added to the players array
  it("should allow a player to buy a ticket and be added to the players array", async () => {
    const player = accounts[1];
    const initialBalance = await web3.eth.getBalance(lottery.address);

    await lottery.buyTicket({ from: player, value: 100 });

    const players = await lottery.getPlayers();
    expect(players.length).to.equal(1);
    expect(players[0]).to.equal(player);

    const newBalance = await web3.eth.getBalance(lottery.address);
    expect(newBalance).to.equal(Number(initialBalance) + 100);
  });

  // Define the third test case to ensure the contract can select a winner and transfer the jackpot
  it("should select a winner and transfer the jackpot to the winner's account", async () => {
    const players = [accounts[1], accounts[2], accounts[3]];
    const jackpot = web3.utils.toWei("3", "ether");
    await lottery.buyTicket({ from: players[0], value: jackpot });
    await lottery.buyTicket({ from: players[1], value: jackpot });
    await lottery.buyTicket({ from: players[2], value: jackpot });

    const initialBalance = await web3.eth.getBalance(players[0]);

    await lottery.buyTicket({ from: accounts[4], value: jackpot }); // This should trigger the winner selection and jackpot transfer

    const winner = await lottery.winner();
    expect(players.includes(winner)).to.be.true;

    const newBalance = await web3.eth.getBalance(players[0]);
    expect(newBalance).to.equal(Number(initialBalance) + Number(jackpot) * players.length);
  });
});
