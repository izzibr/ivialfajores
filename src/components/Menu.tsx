// src/components/Menu.tsx
import React from 'react';
import { menuData } from '../data/ menuData';
import { MenuItem as MenuItemType } from '../types/index';
import Category from './Category';
import styled from 'styled-components';

const MenuContainer = styled.div`
  padding: 5px;
  margin-top: 50px;
`;

const Menu: React.FC = () => {
  // Obter todas as categorias únicas
  const categories = Array.from(new Set(menuData.map(item => item.category)));

  return (
    <MenuContainer>
      {categories.map(category => {
        const items = menuData.filter(item => item.category === category);
        return <Category key={category} category={category} items={items} />;
      })}
    </MenuContainer>
  );
};

export default Menu;
