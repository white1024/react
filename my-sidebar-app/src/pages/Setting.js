// Setting.js
import React from 'react';
import styled from 'styled-components';
import { useUserContext } from '../contexts/UserContext';

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

const DeleteButton = styled(Button)`
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;

  &:hover {
    background: linear-gradient(to right, #764ba2, #667eea);
  }
`;

const Setting = () => {
  const { deleteUser } = useUserContext();

  const handleDeleteUser = async () => {
    if (window.confirm('確定要刪除您的帳戶嗎？此操作不可逆。')) {
      try {
        await deleteUser();
        alert('帳戶已成功刪除');
      } catch (error) {
        alert(error.message || '刪除帳戶失敗');
      }
    }
  };

  return (
    <div>
      <DeleteButton type="button" onClick={handleDeleteUser}>
        刪除帳號
      </DeleteButton>
    </div>
  );
}

export default Setting;