// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Calendar from './Calendar';
import './App.css'; // 导入CSS文件

const AppContainer = ({ isSidebarOpen, children }) => (
  <div className={`app-container ${isSidebarOpen ? 'shifted' : ''}`}>
    {children}
  </div>
);

const Content = () => (
  <div className="content">
    <h1>Welcome to my website</h1>
    <p>Content goes here...</p>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AppContainer isSidebarOpen={isSidebarOpen}>
      <Sidebar onToggle={setIsSidebarOpen} />
      {/* <Content /> */}
      <div>
        <Calendar />
      </div>
    </AppContainer>
  );
}

export default App;
