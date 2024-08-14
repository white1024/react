import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import MainContent from './components/MainContent';
import { UserProvider } from './contexts/UserContext';

import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

function App() {
  return (
    <>
    <GlobalStyle />
      <Router>
        <UserProvider>
        <Layout>
          <MainContent />
        </Layout>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;