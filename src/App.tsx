import { ethers } from "ethers";
import { useState } from 'react';
import './App.css';

function App() {
  
  const [eth, setEth] = useState('')
  const [address, setAddress] = useState('')
  const [sendAddress, setSendAddress] = useState('')
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  
  const INFURA_ID = 'c70d9d442c00407c9b4efbf74e4a4054'
  const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
  const wallet = new ethers.providers.Web3Provider(window.ethereum);
  
  const connect = async () => {
    
    
    await wallet.send("eth_requestAccounts", []);
    const signer = wallet.getSigner();
    
    console.log(provider);
    setSigner(signer);
  }
 
  const sendTransaction = () => {
    signer?.sendTransaction({
      to: sendAddress,
      value: ethers.utils.parseEther('.01')
    })
  }


 const main = async () => {
    const balance = await provider.getBalance(`${address}`)
    console.log(ethers.utils.formatEther(balance))
    setEth(ethers.utils.formatEther(balance))
  }
  
  return (
    <div className="App">
      <input placeholder="Find account balance" onChange={event => setAddress(event.target.value)}></input>
      <button onClick={() => main()}> click me </button>
      <input placeholder="Send tx to this account" onChange={event => setSendAddress(event.target.value)}></input>
      <button onClick={() => sendTransaction()}> Send transaction </button>
      <div>
        <button onClick={() => connect()}> connect wallet </button>
        <h1>{eth}</h1>
        <button onClick={() => console.log(signer)}> what is the signer </button>
      </div>
    </div>
  );
}

export default App;
