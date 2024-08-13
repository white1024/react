import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: #333;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

function Home() {
  return (
    <div>
      <Title>歡迎來到首頁</Title>
      <Content>
        這是我們應用的首頁。在這裡，你可以找到最新的資訊和功能介紹。
      </Content>
    </div>
  );
}

export default Home;