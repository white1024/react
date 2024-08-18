import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import { routes } from 'config/routes';

function MainContent() {
  return (
    <div className="main-content">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </div>
  );
}

export default MainContent;