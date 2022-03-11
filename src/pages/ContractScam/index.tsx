import { useState } from "react";
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';


interface WalletResponse {
  connectedStatus: boolean;
  status: string;
  address?: string;
  balance?: string;
}

export function ContractScam(){
  const [isConnected, setConnectedStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [walletAddress, setWallet] = useState('')
  const [walletBalance, setWalletBalance] = useState('0.0')
  const ethereum = window.ethereum as MetaMaskInpageProvider;
  
  const disconnectWalletPressed = () => {
    if(!isConnected) return alert("Conta desconectada! ")
    setConnectedStatus(false)
    setStatus('')
    setWallet('')
  }

  const connectWalletPressed = async () => {
    if(isConnected) return alert(
      "Conta já conectada! " +
      String(walletAddress).substring(0, 5) +
      "..." +
      String(walletAddress).substring(38)
    )
    
    
    const walletResponse = await connectWallet()
    setConnectedStatus(walletResponse.connectedStatus)
    setStatus(walletResponse.status)
    if(walletResponse.address)
      setWallet(walletResponse.address)
    
    if(walletResponse.balance)
      setWalletBalance(walletResponse.balance);
    
  }

  const connectWallet = async () => {
    let response: WalletResponse = {} as WalletResponse
    
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request<string[]>({ method: 'eth_requestAccounts' });
            if(!accounts){
              response = {
                connectedStatus: false,
                status: "Cancelado pelo usuário."
              }
              return response
            }
            const address = !accounts[0] ? "" : accounts[0];
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address.toString());
       
            response = {
              connectedStatus:true,
              status:"Conectado",
              address: address,
              balance: ethers.utils.formatEther(balance.toString())
            }

            return response;
        } catch (error) {
            console.log(error)

            response = {
                connectedStatus: false,
                status: "Erro durante a conexão com a conta",
            }
            return response;
        }
    } else {
        response = {
            connectedStatus: false,
            status: "Instale a Metamask no seu browser: https://metamask.io/download.html"
        }
        return response;
    }
  };

  return (
    <div className="contractScam">
      <div className="topnav">
        <a href="#">Home</a>
        <a href="#">Contract Scam</a>
        <a href="#">About</a>
      </div>

      <div className="row">
        <div className="column side">
          <h2>Wallet Connection</h2>
          <button 
            className="btnMetaMask" 
            onClick={!isConnected ? connectWalletPressed : disconnectWalletPressed}
          >
            {!isConnected ? "Conectar" : "Disconectar" } MetaMask 🦊
          </button>
          <p>Status: {status}</p>
          <p>Adress: {String(walletAddress).substring(0, 5) + "..." + String(walletAddress).substring(38)}</p>    
          <p>Balance: {walletBalance}</p>
        </div>

        <div className="column side">
          <h2>Contract Scam</h2>
          <form action="">
            <p>Scam contract</p>
            <input id="inputContract" placeholder="Informe o contrato"/>
            <p/>
            <button type="submit" disabled={isConnected}>Scam (BNB 0.0027)</button>
          </form>
        </div>

        <div className="column middle">
          <h2>Wallet Transactions</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristique. Quisque vehicula, risus eget aliquam placerat, purus leo tincidunt eros, eget luctus quam orci in velit. Praesent scelerisque tortor sed accumsan convallis.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, eget elementum magna tristique. Quisque vehicula, risus eget aliquam placerat, purus leo tincidunt eros, eget luctus quam orci in velit. Praesent scelerisque tortor sed accumsan convallis.</p>
        </div>
      </div>
    </div>
  )
}