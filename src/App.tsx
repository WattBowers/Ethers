import { ethers } from "ethers";
import { useState } from 'react';
import './App.css';

function App() {
  
  const [eth, setEth] = useState('')
  const [address, setAddress] = useState('')
  
  const INFURA_ID = 'c70d9d442c00407c9b4efbf74e4a4054'
  const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

 const main = async () => {
    const balance = await provider.getBalance(`${address}`)
    console.log(ethers.utils.formatEther(balance))
    setEth(ethers.utils.formatEther(balance))
  }
  
  
  
  return (
    <div className="App">
      <input onChange={event => setAddress(event.target.value)}></input>
      <button onClick={() => main()}> click me </button>
      <h1>{eth}</h1>
    </div>
  );
}

export default App;
