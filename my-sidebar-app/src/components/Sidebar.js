import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
        <NavItem>
          <NavLink to="/" data-tooltip-id="sidebar-tooltip" data-tooltip-content="首頁">
            <Icon><HomeIcon /></Icon>
            <Label open={open}>首頁</Label>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" data-tooltip-id="sidebar-tooltip" data-tooltip-content="關於我們">
            <Icon><InfoIcon /></Icon>
            <Label open={open}>關於我們</Label>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" data-tooltip-id="sidebar-tooltip" data-tooltip-content="聯絡我們">
            <Icon><ContactsIcon /></Icon>
            <Label open={open}>聯絡我們</Label>
          </NavLink>
        </NavItem>
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