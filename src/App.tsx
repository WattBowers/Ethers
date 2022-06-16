import { ethers } from "ethers";
import { useState } from 'react';
import './App.css';

function App() {
  
  const [eth, setEth] = useState('')
  const [address, setAddress] = useState('')
  const [sendAddress, setSendAddress] = useState('')
  const [value, setValue] = useState('')
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  const [page, setPage] = useState('')
  const [metamask, setMetamask] = useState('')
  
  const INFURA_ID = 'c70d9d442c00407c9b4efbf74e4a4054'
  const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)
  const wallet = new ethers.providers.Web3Provider(window.ethereum);
  
  const connect = async () => {
    await wallet.send("eth_requestAccounts", []);
    const signer = wallet.getSigner();
    const address = await signer.getAddress()
    setMetamask(address);
    setSigner(signer);
  }
 
  const sendTransaction = () => {
    if(sendAddress.length === 42 && !value.includes('-') && value !== '')
    try{
    signer?.sendTransaction({
      to: sendAddress,
      value: ethers.utils.parseEther(`${value}`)
    })
  } catch(err) {
    console.log(err);
  }
    else {
      window.alert('There was an error processing your request')
    }
  }

 const main = async () => {
    const balance = await provider.getBalance(`${address}`)
    console.log(ethers.utils.formatEther(balance))
    setEth(ethers.utils.formatEther(balance))
  }
  
  return (
    <div className="App">
      <div>
        <h1>This website uses the Kovan test network, you can query the blockchain or use metamask to send test transactions to another wallet. </h1>
        <button onClick={() => setPage('query')}>Query blockchain</button>
        <button onClick={() => setPage('transact')}>Send test transaction</button>
      </div>
      
      {(() => {
        if(page === 'query') {
          return(
            <div>
              <input placeholder="Find account balance" onChange={event => setAddress(event.target.value)}></input>
              <button onClick={() => main()}> click me </button>
              <h1>{eth}</h1>
            </div>
          )
        }
        if(page === 'transact') {
          return(
          <div>
            <input placeholder="Send tx to this account" onChange={event => setSendAddress(event.target.value)}></input>
            <input placeholder="# of eth to send" onChange={event => setValue(event.target.value)}></input>
            <button onClick={() => sendTransaction()}> Send transaction </button>
            <div>
              <button onClick={() => connect()}> connect wallet </button>
              <h3>{metamask}</h3>
              <button onClick={() => console.log(signer)}> what is the signer </button>
            </div>
          </div>
          )
        }
      })()
    }
      </div>
  );
}

export default App;
