import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {ethers} from 'ethers';

const Context = createContext();

export const StateContext = ({ children }) => {

  // Variables to Carry Across Multiple Pages
  const [user, setUser] = useState(null)

  const router = useRouter()
  const { asPath } = useRouter()

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } else {
      throw new Error("MetaMask not found");
    }
  };
  
  const handleConnectWallet = async (e) => {
    try {
      const { address } = await connectWallet();
      console.log("Connected wallet:", address);
      setUser(address); // Set in global state (if storing address)
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const logOutWallet = () => {
    setUser(null);
    localStorage.removeItem("walletAddress"); // Optional
  };


  return (
    <Context.Provider
      value={{
        user,
        setUser,
        connectWallet,
        handleConnectWallet,
        logOutWallet,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);