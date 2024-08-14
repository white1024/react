// contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser({ username });
      await fetchUserData(token);
    } catch (error) {
      throw error.response.data.message;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserData(null);
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/user_data', {
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

  const deleteUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('未登入');
    }

    try {
      await axios.delete('http://localhost:5000/delete_user', {
        headers: { Authorization: token }
      });
      logout(); // 刪除用戶後登出
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error.response?.data?.message || '刪除用戶失敗';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userData, setUserData, deleteUser  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);