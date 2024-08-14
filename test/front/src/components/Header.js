// components/Header.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="logo">個人紀錄系統</div>
      {user && (
        <div className="user-actions">
          <span>歡迎, {user.username}!</span>
          <button onClick={logout} style={{ marginLeft: '10px' }}>登出</button>
        </div>
      )}
    </header>
  );
}

export default Header;