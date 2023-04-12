// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Lottery {
    address public owner;
    address[] public players;
    uint256 public ticketPrice;
    uint256 public ticketCount;
    address public winner;

    event NewPlayer(address indexed player, uint256 ticketCount);

    constructor(uint256 _ticketPrice, uint256 _ticketCount) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        ticketCount = _ticketCount;
    }

    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Incorrect ticket price.");
        

        players.push(msg.sender);

        if (players.length == ticketCount) {
           
            uint256 winnerIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.basefee, players))) % ticketCount;

            winner = players[winnerIndex];

            payable(winner).transfer(address(this).balance);
            players = new address[](0);
        }

        emit NewPlayer(msg.sender, players.length);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }


}
