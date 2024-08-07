// src/Sidebar.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Sidebar.css'; // 导入CSS文件

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen); // 通知父组件侧边栏状态变化
  };

  return (
    <>
      <button className="button toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>

        <div className="sidebar-content">
          <a className="sidebar-link" href="#home">Home</a>
          <a className="sidebar-link" href="#about">About</a>
          <a className="sidebar-link" href="#services">Services</a>
          <a className="sidebar-link" href="#contact">Contact</a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
