import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {login, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        return false;
    }
    // const emailResponse = await isEmailInUse(email)
    // if(emailResponse.length == 0 ){
    //     return false;
    // }
    return true;
}

  async function handleLogin(){
    const isValidEmail = await validateEmail()
    console.log('isValidEmail: ', isValidEmail)
    if(!isValidEmail){ return; }
    
    try{
        await login(email, password, setUser)
        console.log('login successful')
        router.push('/dashboard')
    }catch(err){
        console.log('Error Logging In', err)
    }
  }


  return (
    <>
    <Navbar/>
    <Section>
        <Header>Login</Header>
        <InputTitle>Email</InputTitle>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <InputTitle>Password</InputTitle>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

        <MainButton onClick={handleLogin}>Login</MainButton>

    </Section>
    </>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #333;
  background-color: #f5f5f5;
`;

const Header = styled.h1`
  font-size: 24px; /* Adjusted for better scalability */
  margin: 0;
  padding: 20px 0;
  color: #444;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  width: 80%; /* Responsive width */
  box-sizing: border-box; /* Includes padding in width */
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0,123,255,.2);
  }
`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  margin-top: 10px;
  display: block; /* Ensures it takes its own line */
`;

const MainButton = styled.button`
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }
`;


export default Login