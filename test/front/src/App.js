// App.js
import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <div className="main-container">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <MainContent currentPage={currentPage} />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;