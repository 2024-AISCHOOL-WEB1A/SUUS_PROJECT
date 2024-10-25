import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/header'

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

// Styled components for layout and styling
const Container = styled.div`
  width: 900px;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  position: relative;
  overflow: hidden;
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 50px;
  background-color: #ffffff;
  transition: transform 0.6s ease-in-out;
  transform: ${({ active }) => (active ? 'translateX(100%)' : 'translateX(0)')};
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 50px;
  background-color: #ffffff;
  transition: transform 0.6s ease-in-out;
  transform: ${({ active }) => (active ? 'translateX(0)' : 'translateX(100%)')};
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  transition: transform 0.6s ease-in-out;
  transform: ${({ toggle }) => (toggle ? 'translateX(-100%)' : 'translateX(0)')};
`;

const OverlayTitle = styled.h2`
  margin-bottom: 20px;
`;

const SwitchButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  margin-top: 30px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 30px;
  width: 80%;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const Login = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  return (
   
    <> 
    
      <GlobalStyle />
      <Container>
        {/* Conditional rendering based on toggle state */}
        {toggle ? (
          <SignUpContainer active={!toggle}>
            <h2>회원가입</h2>
            <Input type="text" placeholder="회사이름" />
            <Input type="text" placeholder="담당자" />
            <Input type="text" placeholder="Username" />
            
            <Input type="password" placeholder="Password" />
            <SubmitButton>Sign Up</SubmitButton>
          </SignUpContainer>
        ) : (
          <SignInContainer active={toggle}>
            <h2>로그인</h2>
        
            <Input type="text" placeholder="ID" />
            <Input type="password" placeholder="Password" />
            <SubmitButton>Sign In</SubmitButton>
          </SignInContainer>
        )}

        {/* Overlay with Switch Button */}
        <OverlayContainer toggle={toggle}>
          {/* Image above the OverlayTitle */}
          <img src= "./imgs/Group 73.png" alt="Group" style={{ width: '100px', marginBottom: '20px' }} />
          <OverlayTitle>{toggle ? 'Hello Friend!' : 'Welcome Back!'}</OverlayTitle>
          <p>{toggle ? '수어스 페이지에 가입해주세요.' : '수어스 홈페이지에 환영합니다'}</p>
          <SwitchButton onClick={handleToggle}>
            {toggle ? 'Sign In' : 'Sign Up'}
          </SwitchButton>
        </OverlayContainer>
      </Container>
    </>
  );
};

export default Login;
