"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/website/Container";
import { CheckCircle } from "lucide-react";
import InquiryBtn from "@/components/website/InquiryBtn";
import EthicalFoundation from "@/components/website/EthicalData";

const SingleProductPage = ({ params }) => {
  // Unwrap params using React.use()
  const { product_id } = use(params);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}`);
        const data = await response.json();
        
        console.log('📦 Product data:', data);
        console.log('📏 Sizes:', data.data?.sizes);
        console.log('🌍 Origin:', data.data?.specifications?.placeOfOrigin);
        
        if (data.success && data.data) {
          setProduct(data.data);
          // Set first image as active
          if (data.data.images && data.data.images.length > 0) {
            setActiveImage(data.data.images[0].url);
          }
        } else {
          notFound();
        }
      } catch (error) {
        console.error('❌ Failed to fetch product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  if (loading) {
    return (
      <section className="w-full bg-[#FFFEF5] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666141] mx-auto"></div>
          <p className="text-[#666141] mt-4">Loading product...</p>
        </div>
      </section>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <section className="w-full bg-[#FFFEF5] min-h-screen pb-20">

      <Container className="pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

          {/* ================= LEFT: IMAGE GALLERY ================= */}
          <div className="lg:col-span-6 flex flex-col-reverse lg:flex-row gap-6">

            {/* Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] py-2 lg:py-0 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 border rounded-md overflow-hidden transition-all duration-300 ${activeImage === img.url
                        ? "border-[#666141] ring-1 ring-[#666141] opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                      }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || `View ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      loading={idx < 4 ? "eager" : "lazy"}
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                      unoptimized={img.url.includes('r2.dev')}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative flex-1 aspect-square bg-gray-100 rounded-xl overflow-hidden border border-[#666141]/5 shadow-sm">
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  quality={90}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                  unoptimized={activeImage.includes('r2.dev')}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT: PRODUCT DETAILS ================= */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="sticky top-24 space-y-8">

              {/* Header Info */}
              <div className="space-y-4 border-b border-[#666141]/20 pb-8">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    MALANI IMPEX Inc
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                    <CheckCircle size={12} /> In Stock
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl text-[#666141] font-serif leading-tight">
                  {product.name}
                </h1>

                {/* Model Number */}
                {product.modelNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Model:</span>
                    <span className="text-sm font-semibold text-[#666141]">{product.modelNumber}</span>
                  </div>
                )}

                {/* Optional: Price or Category Tag */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#E9E4B5]/40 text-[#666141] text-xs font-semibold rounded-md uppercase tracking-wide">
                    {product.season?.name || "All Season"}
                  </span>
                  {product.technique?.name && (
                    <span className="text-sm text-gray-500">| {product.technique.name}</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#666141]/10">

              {/* Column 1 */}
              <div className="p-0">
                {product.modelNumber && <DetailRow label="Model Number" value={product.modelNumber} />}
                <DetailRow label="Technique" value={product.technique?.name} />
                <DetailRow label="Material" value={product.specifications?.material} />
                <DetailRow label="Pattern" value={product.specifications?.pattern} />
              </div>

              {/* Column 2 */}
              <div className="p-0">
                <DetailRow label="Style" value={product.specifications?.style} />
                <DetailRow label="Shape" value={product.specifications?.shape} />
                <DetailRow label="Closure Type" value={product.specifications?.closureType} />
              </div>

              {/* Column 3 */}
              <div className="p-0 sm:col-span-2 lg:col-span-1">
                <DetailRow 
                  label="Available Sizes" 
                  value={product.sizes?.length > 0 
                    ? product.sizes.map(s => s.size).join(', ') 
                    : '—'
                  } 
                />
                <DetailRow label="Origin" value={product.specifications?.placeOfOrigin} />
                <DetailRow label="Customization" value={product.customization?.available ? "Available" : "Not Available"} />
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
  <div className="flex flex-col p-4 sm:p-6 border-b sm:border-b-0 border-[#666141]/5 last:border-0 hover:bg-[#666141]/5 transition-colors">
    <span className="text-xs font-bold tracking-widest text-[#666141]/60 uppercase mb-2">
      {label}
    </span>
    <span className="text-sm sm:text-base font-medium text-[#2c2c2c] break-words">
      {value || "—"}
    </span>
  </div>
);

export default SingleProductPage;