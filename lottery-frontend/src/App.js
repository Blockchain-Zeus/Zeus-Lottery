import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MyContract from './Lottery.json';
import Stat from './components/Stat';
import PieChart from './components/PieChart';

const web3 = new Web3("HTTP://localhost:8545");

function App() {
  const [contract, setContract] = useState(null);
  const [lastWinner, setLastWinner] = useState(null);
  const [players, setPlayers] = useState([]);
  const [maxPlayers, setMaxPlayers] = useState(null);
  const [countBuy, setCountBuy] = useState(null);
  const [address, setAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [nextAddress, setNextAddress] = useState('');
  const [participants, setParticipants] = useState([]);

  // Load the smart contract when the component mounts
  useEffect(() => {
    async function loadContract() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      setAddress(userAddress);
      const networkId = await web3.eth.net.getId();
      const contractAddress = MyContract.networks[networkId].address;
      const contractInstance = new web3.eth.Contract(MyContract.abi, contractAddress);
      setContract(contractInstance);
    }

    loadContract();
  }, []);

  useEffect(()=>{
    async function getVariables(){
      if(!contract){
        return
      }
      const winner = await contract.methods.winner().call();
      const players = await contract.methods.getPlayers().call();
      const maxPlayers = await contract.methods.ticketCount().call();
      const accounts = await web3.eth.getAccounts();
      const nextAddress = accounts[Math.floor(Math.random() * accounts.length)]
      console.log(typeof nextAddress)
      setLastWinner(winner)
      setPlayers(players)
      setMaxPlayers(maxPlayers)
      setNextAddress(nextAddress)
    }
    getVariables()

  },[contract, countBuy])

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const contractAddress = MyContract.networks[networkId].address;
        const lotteryContract = new web3.eth.Contract(MyContract.abi, contractAddress);
        const fetchedParticipants = await lotteryContract.methods.getPlayers().call({ from: accounts[0] });
        setParticipants(fetchedParticipants);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParticipants();
  }, [contract, countBuy]);

 

  // Call a function on the smart contract when a button is clicked
  async function handleClick() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      setAddress(userAddress);
      
    const result = await contract.methods.buyTicket().send({ 
      from: userAddress,
      value: web3.utils.toWei('1', 'ether'),
      gas: 3000000
     });
    console.log(result);
    setCountBuy(countBuy+1)
    }else{
      alert("You need to have a Wallet to buy a Ticket, for example Metamask")
    }
  }
  
  return (
    <div className='flex flex-row justify-center pt-3 bg-gray-900 min-h-screen items-start text-white'>
    <div className='lg:w-0.8 p-5 rounded-lg bg-gray-800 drop-shadow-lg'>
      
      <div className='flex flex-col space-y-3'>
      <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Zeus Lottery</h1>
        <Stat description={"Last Winner"} value={lastWinner}></Stat>
      <div className='flex flex-row justify-between gap-4'>
        <div className='flex-col flex justify-between gap-4'>
      <Stat description={"Tickets in the pool"} value={players.length}></Stat>
      <Stat description={participants.length === 0 ? "Your Chance of winning: 0%" : "Your Chance of winning: " + (100/participants.length * (participants.filter(participant => participant.toLowerCase() === address.toLowerCase())).length).toString()+ '%'}></Stat>
      <Stat description={"Maximum Tickets"} value={maxPlayers}></Stat>
      <Stat description={"Tickets left"} value={maxPlayers-participants.length}></Stat>
      </div>
      <PieChart description={"Participants"} list={participants}></PieChart>
      
      </div>
     {/* <TextField label="Address" type="text" onInputChange={handleInputChange} value={nextAddress} /> */}
      <button className='rounded-lg p-3 bg-black text-white uppercase' onClick={handleClick}>Buy a ticket for the lottery</button>
      </div>
      
      
    </div>
    </div>
  );
}

export default App;
