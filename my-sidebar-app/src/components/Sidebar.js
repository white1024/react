import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { routes } from 'config/routes';

const SidebarContainer = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: ${props => props.open ? '250px' : '50px'};
  transition: width 0.3s ease-in-out;
  overflow: hidden;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const NavItem = styled.li`
  margin-bottom: 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #007bff;
    background-color: #e9ecef;
  }
`;

const Icon = styled.span`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Label = styled.span`
  white-space: nowrap;
  opacity: ${props => props.open ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  text-align: ${props => props.open ? 'right' : 'center'};
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #e9ecef;
  }
`;

function Sidebar({ open, onToggle }) {
  return (
    <SidebarContainer open={open}>
      <NavList>
        {routes.map((route, index) => (
          <NavItem key={index}>
            <NavLink to={"/"+route.path} data-tooltip-id="sidebar-tooltip" data-tooltip-content={route.label}>
              <Icon>{route.icon}</Icon>
              <Label open={open}>{route.label}</Label>
            </NavLink>
          </NavItem>
        ))}
      </NavList>
      <ToggleButton 
        onClick={onToggle} 
        open={open}
        data-tooltip-id="sidebar-tooltip" 
        data-tooltip-content={open ? "收起側邊欄" : "展開側邊欄"}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </ToggleButton>
      {/* {open ? <></> : <Tooltip id="sidebar-tooltip" place="right" delayShow={300}/>} */}
      <Tooltip 
        id="sidebar-tooltip" 
        place="right"
        delayShow={300}
      />
    </SidebarContainer>
  );
}

export default Sidebar;