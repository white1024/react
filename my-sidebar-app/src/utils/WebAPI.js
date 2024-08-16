import axios from 'axios';

const webapi = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // 可以添加其他默認headers
  }
});

// 設置 token 的函數
export const setAuthToken = (token) => {
  if (token) {
    webapi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete webapi.defaults.headers.common['Authorization'];
  }
};

// 添加請求攔截器
webapi.interceptors.request.use((config) => {
  // 在發送請求之前做些什麼
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // 對請求錯誤做些什麼
  return Promise.reject(error);
});

// 添加響應攔截器
webapi.interceptors.response.use((response) => {
  // 對響應數據做點什麼
  return response;
}, (error) => {
  // 對響應錯誤做點什麼
  return Promise.reject(error);
});

export default webapi;