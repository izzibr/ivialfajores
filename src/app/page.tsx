"use client";
import React from 'react';
import Menu from '../components/Menu';
import styled from 'styled-components';
import { FaInstagram } from 'react-icons/fa';
import CartDrawer from '../components/cart/CartDrawer';

const AppContainer = styled.div`
  text-align: center;
  background-color: #FFF9F0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 15px 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #3A2722;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  }
`;

const Logo = styled.img`
  height: 80px;
  width: auto;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05) rotate(5deg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const InstagramButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  background: #F27A23;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(242, 122, 35, 0.3);
  
  &:hover {
    background: #D96515;
    box-shadow: 0 6px 16px rgba(242, 122, 35, 0.4);
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

const Footer = styled.footer`
  background-color: #f9f9f9;
  padding: 15px 0;
  text-align: center;
  font-size: 0.9em;
  margin-top: auto;
`;

const Content = styled.div`
  padding-top: 100px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header>
        <Logo src="/logo.png" alt="Logo" />
        <InstagramButton href="https://www.instagram.com/ivialfajores" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
          Siga no Instagram
        </InstagramButton>
      </Header>

      <Content>
        <main>
          <Menu />
        </main>
      </Content>

      <CartDrawer />

      <Footer>
        <p>&copy; 2026 ivialfajores. Todos os direitos reservados.</p>
      </Footer>
    </AppContainer>
  );
};

export default App;
