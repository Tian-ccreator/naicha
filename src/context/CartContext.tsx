import React, { createContext, useContext, useState, useEffect } from 'react';
import { TeaItem, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: TeaItem, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: TeaItem, size: string) => {
    const price = item.prices[size];
    const cartItemId = `${item.id}-${size}`;
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.size === size
      );
      
      if (existingItemIndex !== -1) {
        // Item with this size already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, {
          id: item.id,
          cartItemId,
          name: item.name,
          image: item.image,
          size,
          price,
          quantity: 1
        }];
      }
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};