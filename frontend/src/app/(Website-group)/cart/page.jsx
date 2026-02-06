"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/website/Container";
import { Trash2, ArrowRight, ShoppingBag, ShoppingCart } from "lucide-react";
import { useInquiry } from "@/context/CartContext";
import EthicalFoundation from "@/components/website/EthicalData";

const CartPage = () => {
  const { inquiries, removeInquiry } = useInquiry();

  // --- EMPTY STATE ---
  if (inquiries.length === 0) {
    return (
      <section className="w-full bg-[#FFFEF5] py-20 px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-[#f0eee0] rounded-full flex items-center justify-center mb-6 text-[#666141]">
          <ShoppingCart size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl text-[#666141] font-normal mb-2 text-center">
          Your Inquiry List is Empty
        </h2>
        <p className="text-gray-500 max-w-sm text-center text-sm md:text-base">
          Start adding items from our collections to request a customized quote.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FFFEF5] py-12 md:py-20 px-4">
      <Container>

        {/* Page Header */}
        <div className="mb-12 border-b border-[#666141]/10 pb-6">
          <h1 className="text-3xl md:text-4xl text-[#666141]">
            Request a Quote
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Review your selected items and submit your details for a wholesale price consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ================= LEFT: INQUIRY ITEMS LIST ================= */}
          <div className="lg:col-span-7 space-y-6">

            <div className="space-y-4">
              {inquiries.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col sm:flex-row gap-5 p-4 sm:p-5 bg-white border border-[#666141]/10 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    <Image
                      // FIX: Access the first image from the array
                      src={item.images && item.images.length > 0 ? item.images[0] : "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h3 className="text-[#2c2c2c] font-medium text-lg leading-tight mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          {item.category?.replace("-", " ") || "Collection"}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeInquiry(item.id)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Additional Info / Specs (Optional) */}
                    <div className="mt-auto pt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-t border-dashed border-gray-100">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.material && <span>Mat: {item.material}</span>}
                      {item.season && <span>Season: {item.season}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT: CONSULTATION FORM ================= */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFCEA] p-6 md:p-8 rounded-2xl border border-[#666141]/10 sticky top-24 shadow-sm">

              <div className="mb-6">
                <h2 className="text-2xl text-[#666141]">Consultation</h2>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">Your Information</p>
              </div>

              <form className="space-y-4">

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. john@company.com"
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 transition-all"
                  />
                </div>

                {/* Grid: Company & Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase">Company</label>
                    <input
                      type="text"
                      placeholder="Optional"
                      className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] text-gray-800 placeholder-gray-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase">City / Country</label>
                    <input
                      type="text"
                      placeholder="e.g. Jaipur, India"
                      className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] text-gray-800 placeholder-gray-300"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Additional Notes</label>
                  <textarea
                    rows="3"
                    placeholder="Specific requirements, quantities, or customization requests..."
                    className="w-full px-4 py-3 bg-white border border-[#666141]/10 rounded-lg focus:outline-none focus:border-[#666141] focus:ring-1 focus:ring-[#666141] text-gray-800 placeholder-gray-300 resize-none transition-all"
                  />
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-2 border-t border-[#666141]/5">
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                    <span>Total Inquiry Items:</span>
                    <span className="text-xl font-bold text-[#666141]">{inquiries.length}</span>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-[#666141] text-[#FFFEF5] py-4 rounded-xl font-medium text-lg hover:bg-[#535036] transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Send Inquiry Now
                    <ArrowRight size={20} />
                  </button>

                  <p className="text-[10px] text-center text-gray-400 mt-3">
                    By clicking send, you agree to receive a quote via email/phone.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </Container>
      <Container>
        <EthicalFoundation />
      </Container>
    </section>
  );
};

export default CartPage;