import {ethers} from 'ethers';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { useStateContext } from '@/context/StateContext';



const Navbar = () => {
  const { user, handleConnectWallet, logOutWallet } = useStateContext()


  const logout = async () => {
  await logOutWallet();
  }


  return (
    <Nav>
      <NavLinks>
      <Logo href="/">BlockPass</Logo>
      {/* <ButtonLink href="/dashboard">Dashboard</ButtonLink> */}
      </NavLinks>
      <NavLinks>
      {user ? (
          <>
          <WalletTag>
            Wallet ID {user.slice(0, 6)}...{user.slice(-4)}
          </WalletTag>
          <Walletbutton onClick={logout}>Log Out</Walletbutton>
          </>
        ) : (
          <></>
          // <Walletbutton onClick={''}>Connect Wallet</Walletbutton>
      )}
      </NavLinks>
    </Nav>
  );
};

const WalletTag = styled.div`
  background: #1e1e1e;
  color: #fff;
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  font-size: 0.85rem;
  font-family: monospace;
  margin-left: 1rem;
  border: 1px solid #444;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  background-color: #007bff; /* Blue */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const Logo = styled(Link)`
  color:rgb(255, 255, 255);
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
`;

const Walletbutton = styled.button`
  background-color: ${(props) => (props.primary ? '#ffa500' : 'transparent')};
  color: ${(props) => (props.primary ? '#ffffff' : '#ffa500')};
  padding: 0.5rem 1rem;
  border: 1px solid #ffa500;
  color:rgb(255, 255, 255); 
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor:pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.primary ? '#ff8c00' : '#007bff')};
    color: #ffffff;
  }

  &:button:focus {
  outline: none;
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(83, 109, 254, 0.4) 0 2px 4px, rgba(83, 109, 254, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  }
  &:button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
  }

`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonLink = styled(Link)`
  background-color: ${(props) => (props.primary ? '#ffa500' : 'transparent')};
  color: ${(props) => (props.primary ? '#ffffff' : '#ffa500')};
  padding: 0.5rem 1rem;
  border: 1px solid #ffa500;
  color:rgb(255, 255, 255); 
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.primary ? '#ff8c00' : '#007bff')};
    color: #ffffff;
  }

  &:button:focus {
  outline: none;
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(83, 109, 254, 0.4) 0 2px 4px, rgba(83, 109, 254, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  }
  &:button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
  }

  
`;


export default Navbar;
