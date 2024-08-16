import React from 'react';
import 'components/testing/WaveBackground';

const WaveBackground = () => {
  return (
    <div className="wave-container">
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="content">
        <h1>Welcome to WaveWorld</h1>
      </div>
    </div>
  );
};

export default WaveBackground;