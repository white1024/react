// components/Sidebar.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Sidebar({ currentPage, setCurrentPage }) {
  const { user } = useAuth();
  const navItems = ['dashboard', 'profile', 'finance', 'health', 'education', 'statistics'];

  if (!user) {
    return null; // 如果用戶未登入，不顯示 Sidebar
  }

  return (
    <aside>
      <div className="user-avatar" style={{ 
        width: '100px', 
        height: '100px', 
        borderRadius: '50%', 
        backgroundColor: '#007bff', 
        margin: '0 auto 20px' 
      }}></div>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {navItems.map(item => (
            <li key={item} 
                onClick={() => setCurrentPage(item)}
                style={{ 
                  padding: '10px', 
                  cursor: 'pointer',
                  backgroundColor: currentPage === item ? '#ced4da' : 'transparent'
                }}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;