// src/components/Category.tsx
import React from 'react';
import { MenuItem as MenuItemType } from '../types';
import ProductCard from './ui/ProductCard';
import styled from 'styled-components';

interface Props {
  category: string;
  items: MenuItemType[];
}

const CategoryContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryTitle = styled.h2`
  color: #3A2722;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: #F7C74C;
    border-radius: 2px;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
`;

const Category: React.FC<Props> = ({ category, items }) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category}</CategoryTitle>
      <ItemsContainer>
        {items.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </ItemsContainer>
    </CategoryContainer>
  );
};

export default Category;
