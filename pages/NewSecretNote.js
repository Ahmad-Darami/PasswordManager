import Navbar from "@/components/Dashboard/Navbar";
import styled from 'styled-components';
import Footer from '@/components/LandingPage/Footer';
import React from 'react';
import {useState,useEffect} from "react";
import {ethers, Signer} from 'ethers';
import contractABI from '@/contracts/SecretStore.json'
import { encryptText, decryptText, getEncryptionKey } from "@/backend/encrypt";
import { useStateContext } from "@/context/StateContext";


const NewSecretNote = () => {
  const [Textbody, setTextbody] = useState('');
  const [EncryptedText, SetEncryptedText] = useState('');
  const [Timestamp, setTimestamp] = useState('');

  const {signer} = useStateContext();
  const WalletAddress = "empty address"

  const encrypt = async () =>{
    const key = await getEncryptionKey(signer);
    const encrypted = await encryptText(Textbody, signer)
    console.log('encrypted', encrypted)
    
  };
  

  return (
      <>
      <Navbar/>
      <Section>
      <ElementSection>
          
      <Title>Add a New Secret Note</Title>
      
      <InputText 
      placeholder='enter decryped code'
      value = {Textbody}
      onChange={(e) => setTextbody(e.target.value)}
      ></InputText>
      
      <SubmitButton onClick={(e) => encrypt()}>submit</SubmitButton>
      {EncryptedText && (
        <p style={{ marginTop: '10px', wordBreak: 'break-all' }}>
          🔒 Encrypted Text: <br /> {EncryptedText}
        </p>
      )}


      </ElementSection>
      
      </Section>
      <Footer/>
      </>
  )
}

const Section = styled.section`
  display: flex; /* Keeps elements side by side */
  height: 86.5vh;
  width: 100%;
  background-color: #EEEEEE;
  padding: 2vw;

`

const InputText = styled.textarea`
  height: 30vh;
  width: 60vh;
  resize:none;
  font-size:50px;
  margin:25px;

`

const ElementSection = styled.div`
  display: flex;
  flex-grow: 1; /* Allows it to take the remaining space */
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px; /* Provides padding around the content */
  background-color: #f8f9fa; /* A light background color */
  border-radius: 5px;
`;

const Title = styled.h2`
  display:flex;
  font-size: 40px; /* Makes the font size responsive */
  margin: 10px; /* Adds spacing below the title */
  color: #333; /* Darker text color for better readability */
  text-align:center;
  align-items:center;
  margin:50px;
`;

const SubmitButton = styled.button`
  font-size: 25px;
  border-radius:5px;

`


export default NewSecretNote