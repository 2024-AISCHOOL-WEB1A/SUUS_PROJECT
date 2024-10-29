import React, { useState } from 'react';
import styled from 'styled-components';

// Wrapper styled component to center the entire container
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

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
  margin-top: 50px; /* Increased margin to add spacing */

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: calc(100% - 80px); /* Adjusted to make space for CheckButton */
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

const CheckButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px; /* 버튼을 조금 더 넓게 조정 */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */

  &:hover {
    background-color: #0056b3;
  }
`;
const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 제목과의 간격을 조정 */
  margin-bottom: 20px;
`;
const RadioButton = styled.label`
  display: flex;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  
  input[type="radio"] {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid #28a745;
    border-radius: 50%;
    margin-right: 8px;
    position: relative;
  }

  input[type="radio"]:checked::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #28a745;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [userType, setUserType] = useState('개인');

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  return (
    <Wrapper>
      <Container>
        {toggle ? (
          <SignUpContainer active={!toggle}>
            <h2>회원가입</h2>
            <RadioContainer>
              <RadioButton>
                <input
                  type="radio"
                  value="기업"
                  checked={userType === '기업'}
                  onChange={() => handleUserTypeSelect('기업')}
                />
                기업 회원
              </RadioButton>
              <RadioButton>
                <input
                  type="radio"
                  value="개인"
                  checked={userType === '개인'}
                  onChange={() => handleUserTypeSelect('개인')}
                />
                개인 회원
              </RadioButton>
            </RadioContainer>

            {userType === '기업' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', width: '80%' }}>
                  <Input type="text" placeholder="아이디" />
                  <CheckButton>중복 확인</CheckButton>
                </div>
                <Input type="password" placeholder="비밀번호" style={{ width: '80%' }} />
                <Input type="text" placeholder="담당자 이름" style={{ width: '80%' }} />
                <Input type="text" placeholder="결제 카드" style={{ width: '80%' }} />
              </>
            ) : (
              <>
                <Input type="text" placeholder="회사 아이디" style={{ width: '80%' }} />
                <div style={{ display: 'flex', alignItems: 'center', width: '80%' }}>
                  <Input type="text" placeholder="회원 아이디" />
                  <CheckButton>중복 확인</CheckButton>
                </div>
                <Input type="password" placeholder="비밀번호" style={{ width: '80%' }} />
              </>
            )}
            <SubmitButton>Sign Up</SubmitButton>
          </SignUpContainer>
        ) : (
          <SignInContainer active={toggle}>
            <h2>로그인</h2>
            <RadioContainer>
              <RadioButton>
                <input
                  type="radio"
                  value="기업"
                  checked={userType === '기업'}
                  onChange={() => handleUserTypeSelect('기업')}
                />
                기업 회원
              </RadioButton>
              <RadioButton>
                <input
                  type="radio"
                  value="개인"
                  checked={userType === '개인'}
                  onChange={() => handleUserTypeSelect('개인')}
                />
                개인 회원
              </RadioButton>
            </RadioContainer>

            {userType === '기업' ? (
              <>
                <Input type="text" placeholder="아이디" style={{ width: '80%' }} />
                <Input type="password" placeholder="비밀번호" style={{ width: '80%' }} />
              </>
            ) : (
              <>
                <Input type="text" placeholder="회사 아이디" style={{ width: '80%' }} />
                <Input type="text" placeholder="아이디" style={{ width: '80%' }} />
                <Input type="password" placeholder="비밀번호" style={{ width: '80%' }} />
              </>
            )}
            <SubmitButton>Sign In</SubmitButton>
          </SignInContainer>
        )}

        <OverlayContainer toggle={toggle}>
          <img src="./imgs/Group 73.png" alt="Group" style={{ width: '100px', marginBottom: '20px' }} />
          <OverlayTitle>{toggle ? 'Hello Friend!' : 'Welcome Back!'}</OverlayTitle>
          <p>{toggle ? '수어스 페이지에 가입해주세요.' : '수어스 홈페이지에 환영합니다'}</p>
          <SwitchButton onClick={handleToggle}>
            {toggle ? 'Sign In' : 'Sign Up'}
          </SwitchButton>
        </OverlayContainer>
      </Container>
    </Wrapper>
  );
};

export default Login;
