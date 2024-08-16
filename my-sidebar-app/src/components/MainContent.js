import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Home from 'pages/Home';
import About from 'pages/About';
import Contact from 'pages/Contact';
import Setting from 'pages/Setting';

function MainContent() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="setting" element={<Setting />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </div>
  );
}

export default MainContent;