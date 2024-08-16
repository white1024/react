import React, { useState } from 'react';
import 'components/testing/CoolCard.css';

const CoolCard = ({ title, content, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`cool-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CoolCard;