import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutWrapper = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <Content>{children}</Content>
    </LayoutWrapper>
  );
};

export default Layout;