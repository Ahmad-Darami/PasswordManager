import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import Home from '@/components/Dashboard/Home'
const Navbar = () => {
  const { setUser } = useStateContext()

  return (
    <Nav>
      <NavLinks>
      <Logo onClick={() => logOut(setUser)} href="/">BlockPass</Logo>
      <ButtonLink href="/about">Dashboard</ButtonLink>
      </NavLinks>
      <NavLinks>
        <ButtonLink href="/auth/signup">Sign Up</ButtonLink>
        <ButtonLink href="/auth/login">Login</ButtonLink>
      </NavLinks>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #007bff; /* Blue */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const Logo = styled(Link)`
  color: #ffa500; /* Orange */
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
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
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.primary ? '#ff8c00' : '#007bff')};
    color: #ffffff;
  }
`;

export default Navbar;
