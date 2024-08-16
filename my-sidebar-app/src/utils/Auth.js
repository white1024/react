// contexts/UserContext.js
import React, { useState, useEffect } from 'react';
import { AuthContext } from "context";
import webapi from 'utils/WebAPI';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

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
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser({ username });
      await fetchUserData(token);
    } catch (error) {
        throw error.response?.data.message;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserData(null);
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await webapi.get('/verify-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // 如果 token 有效，更新狀態
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      console.error('Token verification failed:', error);
      // 如果 token 無效，清除它
      localStorage.removeItem('token');
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
    <AuthContext.Provider value={{ user, userData, register, login, logout, setUserData, deleteUser  }}>
      {children}
    </AuthContext.Provider>
  );
};