import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from "context";
import { useNavigate, Link } from 'react-router-dom';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const RegisterForm = styled.form`
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

const LoginLink = styled(Link)`
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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
      <ModalButton onClick={onClose}>Confirm</ModalButton>
    </ModalContent>
  </ModalBackdrop>
);

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
    }
    try {
      await register(username, password);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setModalMessage('Registration successful. Please login.');
      navigate('/login');
      console.log('Registration success:', username, password);
    } catch (err) {
      setModalMessage('Registration failed. Please try again.');
    }
  };

  const closeModal = () => {
    setModalMessage('');
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegister}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <LoginButton type="submit">Register</LoginButton>
      </RegisterForm>
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
      <LoginLink to="/login">Already have an account? Login here</LoginLink>
    </RegisterContainer>
  );
};

export default Register;