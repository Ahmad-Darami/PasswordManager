import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {ethers} from 'ethers';

const Context = createContext();

export const StateContext = ({ children }) => {

  // Variables to Carry Across Multiple Pages
  const [user, setUser] = useState(null)
  const router = useRouter()

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
      localStorage.removeItem("loggedOut"); // Clear logout flag on login
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const logOutWallet = () => {
    setUser(null);
    localStorage.setItem("loggedOut", "true")
  };

  useEffect(() => {
    const autoConnectWallet = async () => {
      const isLoggedOut = localStorage.getItem("loggedOut");
  
      if (isLoggedOut === "true") return; // user chose to log out
  
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
  
        if (accounts.length > 0) {
          setUser(accounts[0]);
          console.log("Auto-connected to:", accounts[0]);
        }
      }
    };
  
    autoConnectWallet();
  }, []);
  
  


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