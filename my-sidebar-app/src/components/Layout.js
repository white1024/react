import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: ${props => props.sidebarOpen ? '250px' : '50px'} 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  transition: all 0.3s ease-in-out;
`;

const Header = styled.header`
  grid-area: header;
  background: #333;
  color: white;
  padding: 1rem;
`;

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
  background: #f0f0f0;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  width: ${props => props.open ? '250px' : '50px'};
`;

const Main = styled.main`
  grid-area: main;
  padding: ${props => props.sidebarOpen ? '1rem 1rem 1rem 2rem' : '1rem'};
  transition: padding 0.3s ease-in-out;
`;

const Footer = styled.footer`
  grid-area: footer;
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutWrapper sidebarOpen={sidebarOpen}>
      <Header>
        <h1>我的應用</h1>
      </Header>
      <SidebarWrapper open={sidebarOpen}>
        <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      </SidebarWrapper>
      <Main sidebarOpen={sidebarOpen}>{children}</Main>
      <Footer>© 2024 我的應用</Footer>
    </LayoutWrapper>
  );
}

export default Layout;