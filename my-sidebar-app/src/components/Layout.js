import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Sidebar from 'components/Sidebar';
import { AuthContext } from "context";

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: ${props => props.sidebaropen ? '250px' : '50px'} 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  transition: all 0.3s ease-in-out;
`;
/*
const Header = styled.header`
  grid-area: header;
  background: #333;
  color: white;
  padding: 1rem;
`;
*/
const HeaderContainer = styled.header`
  grid-area: header;
  background: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FFDEAD;
  }
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
  padding: ${props => props.sidebaropen ? '1rem 1rem 1rem 2rem' : '1rem'};
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
  const [sidebaropen, setsidebaropen] = useState(true);
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setsidebaropen(!sidebaropen);
  };

  return (
    <LayoutWrapper sidebaropen={sidebaropen}>
      <HeaderContainer>
        <h1>我的應用</h1>
        <Button onClick={logout}>Logout</Button>
      </HeaderContainer>
      <SidebarWrapper open={sidebaropen}>
        <Sidebar open={sidebaropen} onToggle={toggleSidebar} />
      </SidebarWrapper>
      <Main sidebaropen={sidebaropen}>{children}</Main>
      <Footer>© 2024 我的應用</Footer>
    </LayoutWrapper>
  );
}

export default Layout;