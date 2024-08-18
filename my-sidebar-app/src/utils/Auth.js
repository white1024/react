// contexts/UserContext.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context";
import webapi from 'utils/WebAPI';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      const storedLoginStatus = localStorage.getItem('isLoggedIn');

      if (token && storedLoginStatus === 'true') {
        await verifyToken(token);
      }
      else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const register = async (username, password) => {
    try {
      const response = await webapi.post('/register', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
    } catch (error) {
        throw error.response?.data.message;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await webapi.post('/login', { username, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (error) {
        throw error.response?.data.message;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  const fetchUserData = async (token) => {
    try {
      const response = await webapi.get('/user_data', {
        headers: { Authorization: token }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  

  const verifyToken = async (token) => {
    try {
      const response = await webapi.get('/verify-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      //console.log('verify response', response.data)
      // 如果 token 有效，更新狀態
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // 如果 token 無效，清除它
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    }
  };

  const deleteUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('未登入');
    }

    try {
      await webapi.delete('/delete_user', {
        headers: { Authorization: token }
      });
      logout(); // 刪除用戶後登出
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error.response?.data?.message || '刪除用戶失敗';
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout, setUserData, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};