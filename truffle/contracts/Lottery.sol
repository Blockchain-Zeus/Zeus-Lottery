// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Lottery {
    address public owner;
    address[] public players;
    uint256 public ticketPrice;
    uint256 public ticketCount;
    address public winner;
    bool public isLocked;
    mapping(address => uint256) public ticketsPerAddress; // keep track of tickets purchased by each address
    uint256 public maxTicketsPerAddress = 1; // limit ticket per address
    uint256 public soldTickets;

    event NewPlayer(address indexed player, uint256 ticketCount);

    constructor(uint256 _ticketPrice, uint256 _ticketCount) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        ticketCount = _ticketCount;
        isLocked = false;
        soldTickets = 0;
    }

    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Incorrect ticket price.");
        require(!isLocked, "Lottery is locked. Please try again later.");
        require(ticketsPerAddress[msg.sender] < maxTicketsPerAddress, "You have already purchased the maximum number of tickets.");
        require(soldTickets < ticketCount, "All tickets have been sold.");

        isLocked = true;

        players.push(msg.sender);
        ticketsPerAddress[msg.sender] += 1; // increment the number of tickets purchased by the sender
        soldTickets += 1;

        if (soldTickets == ticketCount) {
        
            uint256 winnerIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.basefee, players))) % ticketCount;

            winner = players[winnerIndex];

            payable(winner).transfer(address(this).balance);
            players = new address[](0);
            soldTickets = 0;
        }

        emit NewPlayer(msg.sender, players.length);

        isLocked = false;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

}
