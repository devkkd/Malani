"use client";
import { createContext, useContext, useState, useEffect } from "react";

const InquiryContext = createContext();

// Constants
const CART_STORAGE_KEY = "malani_cart_items";
const CART_EXPIRY_DAYS = 7;

export function InquiryProvider({ children }) {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load and validate cart from localStorage on mount
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage(inquiries);
    }
  }, [inquiries, isLoading]);

  // Load cart from localStorage with expiry check
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        
        // Validate cart structure
        if (parsedCart.items && Array.isArray(parsedCart.items)) {
          const now = new Date().getTime();
          
          // Filter out expired items (older than 7 days)
          const validItems = parsedCart.items.filter(item => {
            if (!item.addedAt) return false;
            const itemAge = now - item.addedAt;
            const maxAge = CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // 7 days in milliseconds
            return itemAge < maxAge;
          });
          
          setInquiries(validItems);
        }
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      // Clear corrupted data
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  // Save cart to localStorage with metadata
  const saveCartToStorage = (items) => {
    try {
      const cartData = {
        items: items,
        lastUpdated: new Date().getTime(),
        version: "1.0"
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  };

  // Add inquiry with timestamp and quantity
  const addInquiry = (product, quantity = 1) => {
    setInquiries((prev) => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingIndex !== -1) {
        // Update existing item quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + quantity,
          lastUpdated: new Date().getTime()
        };
        return updated;
      } else {
        // Add new item with metadata
        const newItem = {
          ...product,
          quantity: quantity,
          addedAt: new Date().getTime(),
          lastUpdated: new Date().getTime()
        };
        return [...prev, newItem];
      }
    });
  };

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeInquiry(id);
      return;
    }
    
    setInquiries((prev) => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity, lastUpdated: new Date().getTime() }
          : item
      )
    );
  };

  // Remove inquiry
  const removeInquiry = (id) => {
    setInquiries((prev) => prev.filter(item => item.id !== id));
  };

  // Clear all inquiries
  const clearInquiries = () => {
    setInquiries([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Get total items count
  const getTotalItems = () => {
    return inquiries.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Check if item exists in cart
  const isInCart = (productId) => {
    return inquiries.some(item => item.id === productId);
  };

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = inquiries.find(item => item.id === productId);
    return item ? (item.quantity || 1) : 0;
  };

  return (
    <InquiryContext.Provider
      value={{ 
        inquiries, 
        addInquiry, 
        removeInquiry, 
        clearInquiries,
        updateQuantity,
        getTotalItems,
        isInCart,
        getItemQuantity,
        isLoading
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export const useInquiry = () => useContext(InquiryContext);
