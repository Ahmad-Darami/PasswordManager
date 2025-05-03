import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import Footer from '@/components/LandingPage/Footer'
import { useStateContext } from '@/context/StateContext';
import { useRouter } from 'next/router';
import {ethers} from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/contract'
import { decryptText } from '@/backend/encrypt'
import DecryptedModal from '@/components/Windows/Modal'

const Dashboard = () => {
  const { user, handleConnectWallet, logOutWallet } = useStateContext();
  const router = useRouter();
  const [passwords,setPasswords] = useState([]);
  const [notes,setNotes] = useState([]);
  const {signer} = useStateContext();
  const [activeTag, setactiveTag] = useState('')
  const [decryptednote,setDecryptednote] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [TempHash, setTempHash] = useState('')
  

  const [dataFromContract, setDataFromContract] = useState(null)

  useEffect(() => {
    if (user == null) {
      router.push('/')
  
    }
  },[user]); // run this effect whenever `user` changes)

  useEffect(() => {
    const fetchPasswords = async () => {
      if (!signer) return;
  
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const result = await contract.viewNotes(); 
        const resultpasswords = await contract.viewPasswords();
        setNotes(result);
        setPasswords(resultpasswords);
        console.log("Fetched passwords:", result);
      } catch (err) {
        console.error("Failed to load passwords:", err);
      }
    };
  
    fetchPasswords();
  }, [signer]);

  const handleDecrypt = async () => {
    try {
    const result = await decryptText(TempHash,signer)
    setDecrypted(result)
    setShowPassword(true)
    } catch (err) {
      console.error('Decryption failed:',err)
    }
  }

  return (
    <>
        <Navbar/>
        <Section>
          <ElementSection>
            <TitleElements>
                <Title>Dashboard</Title>
                <div>
                <DashButton onClick={() => router.push('/NewSecretNote')}>New Secret Note</DashButton>
                <DashButton onClick={() => router.push('/NewPassword')}>New Password</DashButton>
                </div>
            </TitleElements>
            <></>
            <InfoContainer>
                Wallet ID: {user}
            </InfoContainer>
            <CardColumns>
            
            <DashboardElements>
            
            {notes.length > 0 ? (
              notes.map((entry, index) => {
                const handleDecryptThisEntry = async () => {
                  try {
                    const result = await decryptText(entry.ipfsHash, signer);
                    setDecryptednote(result);
                    setactiveTag(entry.DecodedHint);
                    setShowPassword(true);
                  } catch (err) {
                    console.error('Decryption failed:', err);
                  }
                };

                return (
                  <EntryCards key={index} style={{
                    border: '1px solid #ccc',
                    padding: '16px',
                    marginBottom: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                  }}>
                    <p><strong>Note Hint:</strong> {entry.DecodedHint}</p>
                    <p><strong>Timestamp:</strong> {new Date(Number(entry.timestamp) * 1000).toLocaleString()}</p>
                    <p><strong>Encrypted Hash:</strong> {entry.ipfsHash.slice(0, 6)}...{entry.ipfsHash.slice(-4)}</p>
                    <Elementbutton onClick={handleDecryptThisEntry}>decrypt note</Elementbutton>
                  </EntryCards>
                );
                    })
                  ) : (
                    <p>No notes stored yet.</p>
                  )}
            </DashboardElements>



            <DashboardElements>
            {passwords.length > 0 ? (
              passwords.map((entry, index) => {
                const handleDecryptThisEntry = async () => {
                  try {
                    const result = await decryptText(entry.ipfsHash, signer);
                    setDecryptednote(result);
                    setactiveTag(entry.tag);
                    setShowPassword(true);
                  } catch (err) {
                    console.error('Decryption failed:', err);
                  }
                };

                return (
                  <EntryCards key={index} style={{
                    border: '1px solid #ccc',
                    padding: '16px',
                    marginBottom: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                  }}>
                    <p><strong>Password Tag:</strong> {entry.tag}</p>
                    <p><strong>Timestamp:</strong> {new Date(Number(entry.timestamp) * 1000).toLocaleString()}</p>
                    <p><strong>Encrypted Hash:</strong> {entry.ipfsHash.slice(0, 6)}...{entry.ipfsHash.slice(-4)}</p>
                    <Elementbutton onClick={handleDecryptThisEntry}>decrypt password</Elementbutton>
                  </EntryCards>
                );
                    })
                  ) : (
                    <p>No passwords stored yet.</p>
                  )} 


            </DashboardElements>
            </CardColumns> {/* end of rows */}
          </ElementSection>
            

        </Section>
      <Footer/>
      {showPassword && (
  <DecryptedModal
    decrypted={decryptednote}
    tag={activeTag}
    onClose={() => setShowPassword(false)}
  />
  )}
    </>
  )
}

const TitleCard = styled.div`

`

const CardColumns = styled.div`
display:flex;
flex-direction:row;
`

const ModalBox = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const Elementbutton = styled.button`
  background-color: ${(props) => (props.primary ? '#ffa500' : 'transparent')};
  color: ${(props) => (props.primary ? '#ffffff' : '#ffa500')};
  padding: 0.2rem 0.5rem;
  border: 1px solid #007bff;
  color:rgb(0, 0, 0); 
  border-radius: 5px;
  margin-top: 3px;
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.41);
  z-index: 999;
`;

const EntryCards = styled.div`
  width: 300px;                   /* fixed card width for wrapping */
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);  

`

const Section = styled.section`
  display: flex; /* Keeps elements side by side */
  height: 86.5vh;
  width: 100%;
  background-color: #EEEEEE;
  padding: 2vw;

`
const ElementSection = styled.div`
  display: flex;
  flex-grow: 1; /* Allows it to take the remaining space */
  max-height:80vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px; /* Provides padding around the content */
  background-color: #f8f9fa; /* A light background color */
  border-radius: 5px;
`;


const TitleElements = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f9fa;
  gap: 15px;
`;


const DashButton = styled.button`
background-color: ${(props) => (props.primary ? '#ffa500' : 'transparent')};
  color: ${(props) => (props.primary ? '#ffffff' : '#ffa500')};
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  color:rgb(0, 0, 0); 
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor:pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  margin:10px;
  font-size:16px;

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

const DashboardElements = styled.div`
  display: flex;
  flex-wrap: wrap;                /* wraps items to form rows */
  flex-direction: column;            /* row-wise layout */
  align-items: flex-start;
  justify-content: center;
  width:100%;
  gap: 15px;
  padding: 20px;
  max-height: 80vh;               /* limits height */
  overflow-y: auto;               /* scrolls vertically if too tall */
  overflow-x: hidden;             /* no horizontal scroll */
`;

const Title = styled.h2`
  display:flex;
  font-size: 38px; /* Makes the font size responsive */
  margin: 10px; /* Adds spacing below the title */
  color: #333; /* Darker text color for better readability */
  text-align:center;
  align-items:center;
`;


const InfoContainer = styled.div`
  display: flex;
  justify-content: inline-block; /* Spreads content across the container */
  align-items: center;
  border-radius: 8px; /* Rounded corners for a modern look */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Consistent shadow with the main section */
  padding: 12px; /* More padding for a spacious feel */
  width: ; /* width to utilize available space */
  margin: 10px 0; /* Adds margin for spacing between items */
  background-color: #fafafa; /* Slightly off-white for subtle contrast */
`;


export default Dashboard