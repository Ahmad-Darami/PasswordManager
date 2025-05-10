import Navbar from "@/components/Dashboard/Navbar";
import styled from 'styled-components';
import Footer from '@/components/LandingPage/Footer';
import React from 'react';
import {useState,useEffect} from "react";
import {ethers, Signer} from 'ethers';
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '@/contracts/contract'
import { encryptText, decryptText, getEncryptionKey } from "@/backend/encrypt";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from 'next/router';


const NewSecretNote = () => {
  const { user, handleConnectWallet, logOutWallet } = useStateContext()
  const [Textbody, setTextbody] = useState('');
  const [EncryptedText, SetEncryptedText] = useState('');
  const [response,setResponse] = useState('');
  const [NoteHint, setNoteHint] = useState('');
  const [Timestamp, setTimestamp] = useState('');
  const {signer} = useStateContext();
  const WalletAddress = "empty address"
  const router = useRouter();

  useEffect(() => {
      if (user == null) {
        router.push('/')
    
      }
    },[user]); // run this effect whenever `user` changes)


  const encryptAndSend = async() => {
    if (!signer) {
      setResponse("Wallet not Connected")
      return;
    }
    if (!Textbody) {
      setResponse("Please enter something to encrypt")
      return;
    }
    if (!NoteHint) {
      setResponse("Please provide a hint")
      return;
    }
    try {
      const encrypted = await encryptText(Textbody, signer)
      console.log('encrypted', encrypted)
      SetEncryptedText(encrypted)
      const contract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,signer)
      const tx = await contract.StoreSecretNote(encrypted,NoteHint)
      const receipt = await tx.wait();
      console.log(receipt)

    } catch (err) {
      console.error("❌ Error in encrypting or uploading:", err);
      SetEncryptedText("❌ Upload failed.");
    }
  };

  return (
      <>
      <Navbar/>
      <Section>
      <ElementSection>
          
      <Title>Add a New Secret Note</Title>
      
      <InputText 
      placeholder='enter decrypted code'
      value = {Textbody}
      onChange={(e) => setTextbody(e.target.value)}
      ></InputText>

      <InputHint 
      placeholder='add a hint (WARNING: this is decrypted!)'
      value = {NoteHint}
      onChange={(e) => setNoteHint(e.target.value)}
      ></InputHint>
      
      <SubmitButton onClick={(e) => encryptAndSend()}>Encrypt and Send</SubmitButton>
      {setResponse && (
        <p style={{ marginTop: '10px', wordBreak: 'break-all' }}>
          {response} <br /> 🔒 Encrypted Text:  <br /> {EncryptedText}
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

const InputHint = styled.textarea`
  height: 8vh;
  width: 30vh;
  resize:none;
  font-size:20px;
  margin:25px;
  text-align:center;
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