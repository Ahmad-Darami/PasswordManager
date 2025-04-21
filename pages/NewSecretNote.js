import Navbar from "@/components/Dashboard/Navbar"
import styled from 'styled-components'
import Footer from '@/components/LandingPage/Footer'

const NewSecretNote = () => {

    return (
        <>
        <Navbar/>
        <Section>
        <ElementSection>
            
        <Title>Add a New Secret Note</Title>
        <textarea placeholder='benis'></textarea>
            
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
  font-size: 24px; /* Makes the font size responsive */
  margin: 10px; /* Adds spacing below the title */
  color: #333; /* Darker text color for better readability */
  text-align:center;
  align-items:center;
`;


export default NewSecretNote