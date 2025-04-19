import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <LeftContainer>
          © {new Date().getFullYear()} MVP Starter App. All rights reserved.
        </LeftContainer>
        <CenterContainer>
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </CenterContainer>
        <RightContainer>
          <SocialIcon href="#" aria-label="Facebook">FB</SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">TW</SocialIcon>
          <SocialIcon href="#" aria-label="Instagram">IG</SocialIcon>
        </RightContainer>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  color: #fff;
  background-color: #333;
  padding: 20px 0;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const LeftContainer = styled.div``;

const CenterContainer = styled.div``;

const RightContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcon = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  &:hover {
    color: #007bff;
  }
`;

export default Footer;
