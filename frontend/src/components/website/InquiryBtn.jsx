"use client";

import { useInquiry } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function InquiryBtn({ product }) {
  const { inquiries, addInquiry, removeInquiry } = useInquiry();

  const isAdded = inquiries.some(
    item => item.id === product.id
  );

  const handleClick = () => {
    if (isAdded) {
      removeInquiry(product.id);
      toast.error("Removed from inquiry list");
    } else {
      addInquiry(product);
      toast.success("Added to inquiry list");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2.5 rounded-full text-xs font-medium shadow-sm transition-colors
        ${
          isAdded
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-[#6F6A4C] text-[#FFFEF5] hover:bg-[#5a563d]"
        }`}
    >
      {isAdded ? "Remove from Inquiry" : "Send Inquiry"}
    </button>
  );
}
