import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.post('/api/login', { username, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};