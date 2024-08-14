import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../contexts/UserContext';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginForm = styled.form`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 320px;
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #764ba2;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const LoginButton = styled(Button)`
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;

  &:hover {
    background: linear-gradient(to right, #764ba2, #667eea);
  }
`;

const RegisterButton = styled(Button)`
  background-color: transparent;
  color: #764ba2;
  border: 2px solid #764ba2;
  margin-top: 1rem;

  &:hover {
    background-color: #764ba2;
    color: white;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ModalButton = styled(Button)`
  margin-top: 1rem;
  width: auto;
  padding: 0.5rem 1rem;
`;

const Modal = ({ message, onClose }) => (
  <ModalBackdrop>
    <ModalContent>
      <p>{message}</p>
      <ModalButton onClick={onClose}>確定</ModalButton>
    </ModalContent>
  </ModalBackdrop>
);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const { login, register } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      console.log('登入成功:', username, password);
    } catch (err) {
      setModalMessage('登入失敗：用戶名或密碼錯誤');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setUsername('');
      setPassword('');
      console.log('註冊成功:', username, password);
    } catch (err) {
      setModalMessage('註冊失敗');
    }
  };

  const closeModal = () => {
    setModalMessage('');
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="帳號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <LoginButton type="submit">登入</LoginButton>
        <RegisterButton type="button" onClick={handleRegister}>
          註冊新帳號
        </RegisterButton>
      </LoginForm>
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </LoginContainer>
  );
};

export default Login;