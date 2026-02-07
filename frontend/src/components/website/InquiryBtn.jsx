"use client";

import { useInquiry } from "@/context/CartContext";
import { ShoppingCart, Check, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function InquiryBtn({ product, showViewCart = true }) {
  const { inquiries, addInquiry, removeInquiry, isInCart, getItemQuantity } = useInquiry();
  const router = useRouter();

  const inCart = isInCart(product.id || product._id);
  const quantity = getItemQuantity(product.id || product._id);

  const handleAddToCart = () => {
    const productData = {
      id: product.id || product._id,
      _id: product._id || product.id,
      name: product.name,
      images: product.images?.map(img => img.url || img) || [],
      category: product.category,
      season: product.season?.name || product.season,
      technique: product.technique?.name || product.technique,
      size: product.sizes?.[0]?.size,
      material: product.specifications?.material
    };

    addInquiry(productData, 1);
    toast.success(
      <div className="flex items-center gap-2">
        <Check size={16} />
        <span>Added to inquiry list!</span>
      </div>,
      {
        duration: 2000,
        position: "bottom-right"
      }
    );
  };

  const handleRemoveFromCart = () => {
    removeInquiry(product.id || product._id);
    toast.error("Removed from inquiry list", {
      duration: 2000,
      position: "bottom-right"
    });
  };

  const handleViewCart = () => {
    router.push("/cart");
  };

  if (inCart) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={20} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">Added to Inquiry List</p>
            <p className="text-xs text-green-600">Quantity: {quantity}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {showViewCart && (
            <button
              onClick={handleViewCart}
              className="flex-1 bg-[#666141] text-[#FFFEF5] px-6 py-3.5 rounded-xl font-medium hover:bg-[#535036] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              View Cart
            </button>
          )}
          <button
            onClick={handleRemoveFromCart}
            className="px-6 py-3.5 rounded-xl font-medium border-2 border-red-200 text-red-600 hover:bg-red-50 transition-all"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-[#666141] text-[#FFFEF5] px-6 py-3.5 rounded-xl font-medium hover:bg-[#535036] transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
    >
      <Plus size={18} />
      Add to Inquiry List
    </button>
  );
}
