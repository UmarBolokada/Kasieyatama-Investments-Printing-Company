"use client";

import React, { createContext, useContext, useReducer, useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';

// Types
export interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  mainImage: string;
  slug: string;
  stockQuantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { _id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { ...state, items: updatedItems, total, itemCount };
      } else {
        const newItems = [...state.items, action.payload];
        const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { ...state, items: newItems, total, itemCount };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item._id !== action.payload);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: updatedItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { ...state, items: updatedItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    case 'LOAD_CART': {
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: action.payload, total, itemCount };
    }
    
    default:
      return state;
  }
}

// Context
interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (_id: string) => boolean;
  getItemQuantity: (_id: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isSignedIn } = useUser();
  const [loadedLocal, setLoadedLocal] = useState(false);
  const hasSyncedRef = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setLoadedLocal(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Initial sync and merge with backend when user signs in
  useEffect(() => {
    const syncFromBackend = async () => {
      if (!isSignedIn || !user?.id || !loadedLocal) return;

      try {
        const res = await fetch(`/api/cart?clerkId=${encodeURIComponent(user.id)}`, { cache: 'no-store' });
        const data = await res.json();
        const backendItems: CartItem[] = Array.isArray(data?.items) ? data.items : [];

        // Read local items directly to avoid depending on state
        let localItems: CartItem[] = [];
        try {
          const saved = localStorage.getItem('cart');
          localItems = saved ? JSON.parse(saved) : [];
        } catch {}

        // Merge local and backend by product _id (sum quantities)
        const map = new Map<string, CartItem>();
        for (const it of backendItems) {
          map.set(it._id, { ...it });
        }
        for (const it of localItems) {
          if (map.has(it._id)) {
            const prev = map.get(it._id)!;
            map.set(it._id, {
              ...prev,
              quantity: prev.quantity + it.quantity,
            });
          } else {
            map.set(it._id, { ...it });
          }
        }
        const merged = Array.from(map.values());

        // Update local state with merged
        dispatch({ type: 'LOAD_CART', payload: merged });
        localStorage.setItem('cart', JSON.stringify(merged));

        // Push merged to backend
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clerkId: user.id,
            items: merged.map((it) => ({ _id: it._id, quantity: it.quantity, price: it.price })),
          }),
        });

        hasSyncedRef.current = true;
      } catch (err) {
        console.error('Error syncing cart from backend:', err);
      }
    };

    syncFromBackend();
  }, [isSignedIn, user?.id, loadedLocal]);

  // Push updates to backend whenever cart items change (after initial sync)
  useEffect(() => {
    const pushUpdates = async () => {
      if (!isSignedIn || !user?.id) return;
      if (!hasSyncedRef.current) return;

      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clerkId: user.id,
            items: state.items.map((it) => ({ _id: it._id, quantity: it.quantity, price: it.price })),
          }),
        });
      } catch (err) {
        console.error('Error saving cart to backend:', err);
      }
    };

    pushUpdates();
  }, [state.items, isSignedIn, user?.id]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantity = item.quantity || 1;
    const cartItem: CartItem = { ...item, quantity };
    
    // Check if adding this quantity would exceed stock
    const existingItem = state.items.find(cartItem => cartItem._id === item._id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    if (currentQuantity + quantity > item.stockQuantity) {
      throw new Error(`Cannot add ${quantity} items. Only ${item.stockQuantity - currentQuantity} available.`);
    }
    
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

  const removeItem = (_id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: _id });
  };

  const updateQuantity = (_id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: _id });
    } else {
      const item = state.items.find(item => item._id === _id);
      if (item && quantity > item.stockQuantity) {
        throw new Error(`Cannot set quantity to ${quantity}. Only ${item.stockQuantity} available.`);
      }
      dispatch({ type: 'UPDATE_QUANTITY', payload: { _id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (_id: string) => {
    return state.items.some(item => item._id === _id);
  };

  const getItemQuantity = (_id: string) => {
    const item = state.items.find(item => item._id === _id);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 