import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import PhotoUploader from '@/components/PhotoUploader'
import { useStateContext } from '@/context/StateContext'
import { getAllUserPhotos } from '@/backend/Database'
const Dashboard = () => {

  const { user } = useStateContext()
  const [ photoData, setPhotoData ] = useState()
  useEffect(() => {
    if(user){
      (async () => {
        console.log('this is the user ID', user.uid)
          const userPhotos = await getAllUserPhotos(user)
          console.log('here are the photos', userPhotos)
          setPhotoData(orderPhotos(userPhotos))
      })()
    }
  }, [user])

  function orderPhotos(photos) {
   
    photos.sort((a, b) => {
      const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date.seconds * 1000);
      const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date.seconds * 1000);
    
      return dateB - dateA; // Sort in descending order
    });
    return photos;
  }

  function convertToStringDate(object){
    const date = new Date(object.seconds * 1000); 
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const dateString = `${month}-${day}-${year}`;
    return dateString
  }

  function makePhotoComponent(photo, index){
    return (<PhotoInfoContainer key={index} status={photo.status}>
      <DetailsColumn>
        <PhotoName>{photo.name}</PhotoName>
      </DetailsColumn>
        <DateDisplay>
          {photo.date ? convertToStringDate(photo.date) : ''}
        </DateDisplay>
        <ActionButton href={`/photos/${photo.location}`}> { /* this should ideally be photo.id instead */}
              Click to View Photo
        </ActionButton>
      </PhotoInfoContainer>)
  }


  return (
    <>
        <Navbar/>
        
        <Section>
          <PhotoUploaderContainer>
            <PhotoUploader photos={photoData} setPhotos={setPhotoData}/>
          </PhotoUploaderContainer>
          <RightSide>
            <Title>Your Photos</Title>

            <ScrollableMainSection>
                {photoData ? 
                <>
                {photoData.length > 0 ? 
                <>
                    {photoData.map(makePhotoComponent)}
                </> 
                : <>No Photos Yet</>}
                </>
                : <>Loading Your Photos</>}
            </ScrollableMainSection>
            </RightSide>

        </Section>
    </>
  )
}

const Section = styled.section`
  display: flex; /* Keeps elements side by side */
  height: 90vh;
  width: 100%;
  background-color: #EEEEEE;
  padding: 2vw;

`
const RightSide = styled.div`
  display: flex;
  flex-grow: 1; /* Allows it to take the remaining space */
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px; /* Provides padding around the content */
  background-color: #f8f9fa; /* A light background color */
`;

const Title = styled.h2`
  font-size: 24px; /* Makes the font size responsive */
  margin-bottom: 16px; /* Adds spacing below the title */
  color: #333; /* Darker text color for better readability */
`;

const ScrollableMainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%; /* Takes the full width of its container */
  max-width: 600px; /* Maximum width to maintain readability */
  height: 70vh;
  overflow-y: auto;
  padding: 10px;
  border-radius: 8px; /* Adds rounded corners */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Soft shadow for depth */
  background-color: #fff; /* White background for the scrollable area */
`;


const PhotoInfoContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Spreads content across the container */
  align-items: center;
  border-radius: 8px; /* Rounded corners for a modern look */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Consistent shadow with the main section */
  padding: 12px; /* More padding for a spacious feel */
  width: 100%; /* Full width to utilize available space */
  margin: 10px 0; /* Adds margin for spacing between items */
  background-color: #fafafa; /* Slightly off-white for subtle contrast */
`;

const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Adjusts space between name and potentially other details */
`;


const PhotoName = styled.span`
  font-size: 18px; /* Larger font size for emphasis */
  color: #007bff; /* Blue color for a modern look */
  font-weight: 500; /* Medium font weight */
`;



const DateDisplay = styled.span`
  font-size: 14px; /* Smaller font size for subtlety */
  color: #6c757d; /* Gray color for a modern, subdued look */
`;

const ActionButton = styled(Link)`
  display: inline-flex; /* Inline-flex for alignment */
  align-items: center;
  justify-content: center;
  padding: 8px 16px; /* Adjusted padding for better touch targets */
  border-radius: 4px; /* More modern, subtle rounding */
  border: 1px solid #007bff; /* Solid border using brand color */
  background-color: transparent; /* Keeps background transparent for a button-like appearance */
  color: #007bff; /* Text color matches border for consistency */
  text-decoration: none; /* Removes underline */
  font-size: 14px; /* Adjusted font size for readability */
  transition: background-color 0.2s ease, color 0.2s ease; /* Smooth transition for hover effects */

  &:hover {
    background-color: #007bff; /* Brand color on hover for emphasis */
    color: #ffffff; /* White text on hover for contrast */
  }
`;

const PhotoUploaderContainer = styled.div`
  width: 50%; /* Adjust to take half of the section's width */
  display: flex;
  flex-direction: column;
  align-items: center; /* Align items in the center of the container */
  padding-right: 2vw; /* Ensure spacing between uploader and photo list */
`


export default Dashboard