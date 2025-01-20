import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addItemToCart: (item: Omit<CartItem, "quantity">) => void;
  removeItemFromCart: (id: number, decrement?: boolean) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItemFromCart = (id: number, decrement = false) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === id);
      if (existingItem) {
        if (decrement && existingItem.quantity > 1) {
          return prevItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          );
        }
        // Remove item if quantity is 1 or not decrementing
        return prevItems.filter((i) => i.id !== id);
      }
      return prevItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
