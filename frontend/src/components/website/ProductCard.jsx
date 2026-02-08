import Image from "next/image";
import Link from "next/link";
import InquiryBtn from "./InquiryBtn";

export default function ProductCard({ product, priority = false }) {
  // Handle both old JSON format and new API format
  const productId = product._id || product.id;
  
  // Get primary image or first image
  const primaryImage = product.images?.find(img => img.isPrimary);
  const firstImage = product.images?.[0];
  const productImage = primaryImage?.url || firstImage?.url || firstImage || '/images/placeholder.jpg';
  
  const productName = product.name || 'Product';
  const modelNumber = product.modelNumber || product.model_number;

  return (
    <div className="w-full max-w-[320px] flex flex-col gap-4 bg-transparent group">
      
      {/* --- Image Section --- */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-gray-100">
        <Link href={`/product/${productId}`}>
          {productImage && productImage !== '/images/placeholder.jpg' ? (
            <Image
              src={productImage}
              alt={productName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
              unoptimized={productImage.includes('r2.dev')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </Link>
      </div>

      {/* --- Details Section --- */}
      <div className="flex flex-col gap-3">
        
        {/* Title */}
        <Link href={`/product/${productId}`}>
          <h3 className="text-black text-[13px] md:text-sm font-normal leading-relaxed hover:text-[#666141] transition-colors line-clamp-3">
            {productName}
          </h3>
        </Link>

        {/* Model Number */}
        {modelNumber && (
          <span className="text-gray-500 text-xs font-medium">
            Model: {modelNumber}
          </span>
        )}

        {/* Customizable Tag */}
        <span className="text-gray-600 text-xs font-light">
          Customizable
        </span>

        {/* Action Row */}
        <div className="flex justify-end pt-2">
          <InquiryBtn product={product} />
        </div>

      </div>
    </div>
  );
}