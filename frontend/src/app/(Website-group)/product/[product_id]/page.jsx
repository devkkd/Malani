"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/website/Container";
import { ChevronRight, Home, CheckCircle } from "lucide-react";
import productsData from "@/data/productData.json";
import InquiryBtn from "@/components/website/InquiryBtn";
import EthicalFoundation from "@/components/website/EthicalData";

const SingleProductPage = ({ params }) => {
  // Unwrap params using React.use()
  const { product_id } = use(params);

  // Find Product
  const product = productsData.find(
    (p) => p.id.toString() === product_id
  );

  if (!product) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <section className="w-full bg-[#FFFEF5] min-h-screen pb-20">

      <Container className="pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

          {/* ================= LEFT: IMAGE GALLERY ================= */}
          <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-6">

            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] py-2 lg:py-0 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 border rounded-md overflow-hidden transition-all duration-300 ${activeImage === img
                      ? "border-[#666141] ring-1 ring-[#666141] opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`View ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-square bg-gray-100 rounded-xl overflow-hidden border border-[#666141]/5 shadow-sm">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* ================= RIGHT: PRODUCT DETAILS ================= */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="sticky top-24 space-y-8">

              {/* Header Info */}
              <div className="space-y-4 border-b border-[#666141]/20 pb-8">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    {product.brandName || "MALANI IMPEX"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                    <CheckCircle size={12} /> In Stock
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl text-[#666141] font-serif leading-tight">
                  {product.name}
                </h1>

                {/* Optional: Price or Category Tag */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#E9E4B5]/40 text-[#666141] text-xs font-semibold rounded-md uppercase tracking-wide">
                    {product.season || "All Season"}
                  </span>
                  {product.category && (
                    <span className="text-sm text-gray-500">| {product.category}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg text-[#666141] font-medium">About this piece</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description || "Experience the finest craftsmanship with this authentic piece. Made with premium materials and designed to add elegance to your space."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                <InquiryBtn product={product} />
                <p className="text-xs text-gray-400 mt-3 text-center md:text-left">
                  * Bulk pricing and customization available upon request.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ================= BOTTOM: SPECIFICATIONS ================= */}
        <div className="border-t border-[#666141]/10 pt-16">
          <div className="mb-10">
            <h3 className="text-2xl text-[#666141] font-serif">Product Specifications</h3>
            <p className="text-gray-500 mt-2">Detailed breakdown of materials and dimensions.</p>
          </div>

          <div className="bg-[#FFFCEA] rounded-xl border border-[#666141]/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#666141]/10">

              {/* Column 1 */}
              <div className="p-0">
                <DetailRow label="Technique" value={product.technique} />
                <DetailRow label="Material" value={product.material} />
                <DetailRow label="Pattern" value={product.pattern} />
              </div>

              {/* Column 2 */}
              <div className="p-0">
                <DetailRow label="Style" value={product.style} />
                <DetailRow label="Shape" value={product.shape} />
                <DetailRow label="Closure Type" value={product.closureType} />
              </div>

              {/* Column 3 */}
              <div className="p-0">
                <DetailRow label="Size" value={product.size} />
                <DetailRow label="Origin" value={product.placeOfOrigin} />
                <DetailRow label="Customization" value="Available" />
              </div>

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

// Helper Component for Data Rows
const DetailRow = ({ label, value }) => (
  <div className="flex flex-col p-6 border-b md:border-b-0 border-[#666141]/5 last:border-0 hover:bg-[#666141]/5 transition-colors">
    <span className="text-xs font-bold tracking-widest text-[#666141]/60 uppercase mb-2">
      {label}
    </span>
    <span className="text-base font-medium text-[#2c2c2c]">
      {value || "—"}
    </span>
  </div>
);

export default SingleProductPage;