"use client";
import { createContext, useContext, useState, useEffect } from "react";

const InquiryContext = createContext();

export function InquiryProvider({ children }) {
  const [inquiries, setInquiries] = useState([]);
  

  // Load inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("inquiries");
    if (saved) setInquiries(JSON.parse(saved));
  }, []);

  // Save inquiries to localStorage
  useEffect(() => {
    localStorage.setItem("inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Add inquiry (no duplicates)
  const addInquiry = (product) => {
    setInquiries((prev) => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  // Remove inquiry
  const removeInquiry = (id) => {
    setInquiries((prev) => prev.filter(item => item.id !== id));
  };

  // Clear all inquiries
  const clearInquiries = () => setInquiries([]);

  return (
    <InquiryContext.Provider
      value={{ inquiries, addInquiry, removeInquiry, clearInquiries }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export const useInquiry = () => useContext(InquiryContext);
