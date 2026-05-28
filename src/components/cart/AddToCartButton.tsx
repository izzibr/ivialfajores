"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

interface Props {
  onClick: () => void;
  price: number;
}

const ButtonContainer = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #3A2722;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #523933;
  }

  &:disabled {
    background-color: #4CAF50;
    cursor: default;
  }
`;

const AddToCartButton: React.FC<Props> = ({ onClick, price }) => {
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) return;
    
    onClick();
    setAdded(true);
    
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <ButtonContainer
      whileHover={{ scale: added ? 1 : 1.05 }}
      whileTap={{ scale: added ? 1 : 0.95 }}
      onClick={handleClick}
      disabled={added}
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaCheck /> Adicionado
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaShoppingCart /> Adicionar - R$ {price.toFixed(2)}
          </motion.div>
        )}
      </AnimatePresence>
    </ButtonContainer>
  );
};

export default AddToCartButton;
