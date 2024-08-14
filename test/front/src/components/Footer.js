// components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={{ textAlign: 'center' }}>
      <p>&copy; 2024 個人紀錄系統。保留所有權利。</p>
      <a href="/privacy" style={{ color: '#007bff', textDecoration: 'none' }}>隱私政策</a>
    </footer>
  );
}

export default Footer;