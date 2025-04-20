import React from 'react';
import styled from 'styled-components';
import GlobalStyle from '/pages/_app.js'; 
import { useRouter } from 'next/router';
import {handleConnectWallet} from '/components/Dashboard/Navbar'


const Landing = () => {
  const router = useRouter();
  return (
    <Section>
      <Overlay>
        <Container>
          <HeroTextColumn>
            <Header>
              Welcome to your new Password Manager
              {/* <Highlight>Start Here</Highlight> */}
            </Header>
            <SubheaderAndStarsColumn>
              {/* <SubHeader>Insert creative subheader here</SubHeader> */}
              <CTAButton onClick = {handleConnectWallet} >Get Started</CTAButton>
            </SubheaderAndStarsColumn>
          </HeroTextColumn>
        </Container>
      </Overlay>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 85vh;
  color: #fff;
  background: linear-gradient(150deg, #6a11cb 0%, #2575fc 100%);
  position: relative;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90vh;
  width: 80%;
  padding: 0 7vw;
`;

const HeroTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Header = styled.h1`
  font-size: calc(2rem + 2vw);
  text-align: center;
  overflow: hidden;
  font-family: '';
  font-family: 'JetBrains Mono', monospace;
`;

const Highlight = styled.span`
  color: #00d4ff;
  text-shadow: 1px 1px 8px rgba(0, 212, 255, 0.7);
`;

const SubHeader = styled.h2`
  font-size: calc(1rem + 1vw);
  margin-top: 20px;
`;

const SubheaderAndStarsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`;

const CTAButton = styled.button`
   align-items: center;
  appearance: none;
  background-color: #EEF2FF;
  border-radius: 8px;
  border-width: 2px;
  border-color: #536DFE;
  box-shadow: rgba(83, 109, 254, 0.2) 0 2px 4px, rgba(83, 109, 254, 0.15) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #536DFE;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 50px;
  width: 250px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 20px;
}

.button:focus {
  outline: none;
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(83, 109, 254, 0.4) 0 2px 4px, rgba(83, 109, 254, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button:hover {
  box-shadow: rgba(83, 109, 254, 0.3) 0 4px 8px, rgba(83, 109, 254, 0.2) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
`;

export default Landing;
