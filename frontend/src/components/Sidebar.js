import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarWrapper = styled.div`
  width: ${props => props.isExpanded ? '200px' : '50px'};
  height: 100vh;
  background-color: #f0f0f0;
  transition: width 0.3s ease;
`;

const ToggleButton = styled.button`
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
`;

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <SidebarWrapper isExpanded={isExpanded}>
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '<<' : '>>'}
      </ToggleButton>
      {isExpanded && (
        <>
          <NavLink to="/travel-planner">旅遊規劃</NavLink>
          {/* 添加更多導航鏈接 */}
        </>
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;