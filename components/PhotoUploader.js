import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useStateContext } from '@/context/StateContext';
import { savePhoto } from '@/backend/Storage';
import { uploadPhotoInformation } from '@/backend/Database'
import crypto from 'crypto'
const PhotoUploader = ({photos, setPhotos}) => {

    const { user } = useStateContext()

  const [ isLoading, setIsLoading ] = useState(false);
  const fileInputRef = useRef()

  const handlePhotoInput = async (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      return;
    }
    event.target.value = ''; // Clear the input after selecting the file
    setIsLoading(true);
      
    // Assuming 'currentUser' or another unique identifier is used as photoId
    const photoId = generateRandomString(20);
    await savePhoto(photoId, file);
    const photoInformation = await uploadPhotoInformation(user, photoId, 'Cool Photo')
    const localPhotos = structuredClone(photos);
    localPhotos.unshift(photoInformation);
    setPhotos(localPhotos);

    setIsLoading(false);
  };
  function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substring(0, length);
  }

  return (
    <>
    <FileInput
          type="file"
          accept=".png"
          ref={fileInputRef}
          onChange={handlePhotoInput}
      />

      <MainUploadContainer>
          <Text>{isLoading ? 'Loading...' : 'Upload Your Photo'}</Text>
          <UploadButton onClick={() => fileInputRef.current.click()}>Upload</UploadButton>
      </MainUploadContainer>
    </>
  )
}
const FileInput = styled.input`
display: none;
`

const UploadButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem 1rem;
border-radius: 0.25rem;
font-size: 1rem;
font-weight: 600;
color: white;
background-color: orange;
border: none;
cursor: pointer;
transition: background-color 0.2s;

&:hover {
  background-color: darkorange;
}
`

const Text = styled.div`
font-weight: 600;
font-size: 1.25rem;
color: white;
`
const MainUploadContainer = styled.label`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 20px;
width: 100%;
padding: 2rem;
border: 2px dashed orange;
border-radius: 0.5rem;
background: blue;
transition: background-color 0.2s, border-color 0.2s;

&:hover {
  background-color: lightblue;
  border-color: darkorange;
  cursor: pointer;
}
`



export default PhotoUploader