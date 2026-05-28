"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useShallow } from 'zustand/react/shallow';
import { FaShoppingCart, FaTimes, FaTrash, FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa';

const FloatingCartButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3A2722;
  color: white;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
`;

const Badge = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #F27A23;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const DrawerContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background-color: white;
  z-index: 1002;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #3A2722;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const ItemList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const CartItemContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
  
  h4 {
    margin: 0 0 5px 0;
    color: #3A2722;
  }
  
  p {
    margin: 0;
    color: #F27A23;
    font-weight: bold;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 15px;

  button {
    background-color: #f0f0f0;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #666;
    
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  span {
    font-size: 1.2rem;
    color: #666;
  }
  
  strong {
    font-size: 1.5rem;
    color: #3A2722;
  }
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background-color: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  color: #999;
  margin-top: 50px;
  
  svg {
    font-size: 3rem;
    margin-bottom: 15px;
    opacity: 0.5;
  }
`;

const CartDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, increaseQuantity, decreaseQuantity, getTotalPrice, getTotalItems } = useCartStore(useShallow(state => ({
    items: state.items,
    removeItem: state.removeItem,
    increaseQuantity: state.addItem,
    decreaseQuantity: state.decreaseQuantity,
    getTotalPrice: state.getTotalPrice,
    getTotalItems: state.getTotalItems
  })));

  const totalItems = getTotalItems();

  const handleCheckout = () => {
    let message = "Olá! Gostaria de fazer um pedido:%0A%0A";
    items.forEach(item => {
      message += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    message += `%0A*Total: R$ ${getTotalPrice().toFixed(2)}*`;

    const phoneNumber = "5581984216074";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <FloatingCartButton
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaShoppingCart />
        <AnimatePresence>
          {totalItems > 0 && (
            <Badge
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {totalItems}
            </Badge>
          )}
        </AnimatePresence>
      </FloatingCartButton>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <DrawerContainer
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <Header>
                <h2>Seu Pedido</h2>
                <CloseButton onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </CloseButton>
              </Header>

              <ItemList>
                {items.length === 0 ? (
                  <EmptyCart>
                    <FaShoppingCart />
                    <p>Seu carrinho está vazio.</p>
                  </EmptyCart>
                ) : (
                  <AnimatePresence>
                    {items.map(item => (
                      <CartItemContainer
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <ItemDetails>
                          <h4>{item.name}</h4>
                          <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </ItemDetails>

                        <QuantityControls>
                          <button onClick={() => decreaseQuantity(item.id)}><FaMinus size={10} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item)}><FaPlus size={10} /></button>
                        </QuantityControls>

                        <CloseButton onClick={() => removeItem(item.id)} style={{ fontSize: '1rem', color: '#ff4444' }}>
                          <FaTrash />
                        </CloseButton>
                      </CartItemContainer>
                    ))}
                  </AnimatePresence>
                )}
              </ItemList>

              <Footer>
                <Total>
                  <span>Total</span>
                  <strong>R$ {getTotalPrice().toFixed(2)}</strong>
                </Total>
                <CheckoutButton
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  whileHover={{ scale: items.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: items.length > 0 ? 0.98 : 1 }}
                >
                  <FaWhatsapp size={24} /> Fechar Pedido
                </CheckoutButton>
              </Footer>
            </DrawerContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
