import React from 'react';
import { MenuItem as MenuItemType } from '../types';
import styled from 'styled-components';

interface Props {
  item: MenuItemType;
}

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin: 15px;
  padding: 20px;
  max-width: 600px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Details = styled.div`
  text-align: left;
  width: 100%;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  font-family: 'Arial', sans-serif; // Modern font
  color: #333;
  font-size: 2em;
`;

const Description = styled.p`
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.9rem;
`;

const Price = styled.span`
  font-weight: bold;
  color: #FD6A34;
  font-size: 1.5rem;
`;

const MenuItem: React.FC<Props> = ({ item }) => {
  return (
    <MenuItemContainer>
      <Details>
        <Title>{item.name}</Title>
        <Description>{item.description}</Description>
        <Price>R$ {item.price.toFixed(2)}</Price>
      </Details>
    </MenuItemContainer>
  );
};

export default MenuItem;