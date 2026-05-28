"use client";
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types';
import AddToCartButton from '../cart/AddToCartButton';
import { useCartStore } from '../../store/useCartStore';
import Image from 'next/image';

interface Props {
  item: MenuItem;
}

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.02);
  margin: 15px;
  max-width: 320px;
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #FFF9F0 0%, #F5EDDF 100%);
  overflow: hidden;
`;

const ContentContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: #3A2722;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  margin: 0 0 20px 0;
  color: #665C58;
  font-size: 0.95rem;
  line-height: 1.5;
  flex-grow: 1;
`;

const ProductCard: React.FC<Props> = ({ item }) => {
  const addItem = useCartStore((state) => state.addItem);

  // Temporary image URL as a placeholder until the user uploads their own images.
  // We use standard placeholder to prevent broken next/image
  const imageSrc = item.image ? item.image : 'https://placehold.co/320x200/png?text=Alfajor';

  return (
    <CardContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
    >
      <ImageContainer>
        {/* Usando a tag padrão html img para URLs externas genéricas, 
            Next.js precisa de configuração no next.config.js para domínios externos no next/image */}
        <img 
          src={imageSrc} 
          alt={item.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </ImageContainer>
      <ContentContainer>
        <Title>{item.name}</Title>
        <Description>{item.description}</Description>
        <AddToCartButton onClick={() => addItem(item)} price={item.price} />
      </ContentContainer>
    </CardContainer>
  );
};

export default ProductCard;
