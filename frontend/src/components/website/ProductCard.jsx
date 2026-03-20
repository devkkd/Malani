import Image from "next/image";
import Link from "next/link";
import InquiryBtn from "./InquiryBtn";

export default function ProductCard({ product, priority = false }) {
  const productSlug = product.slug || product._id || product.id;
  
  const primaryImage = product.images?.find(img => img.isPrimary);
  const firstImage = product.images?.[0];
  const productImage = primaryImage?.url || firstImage?.url || firstImage || '/images/placeholder.jpg';
  
  const productName = product.name || 'Product';
  const modelNumber = product.modelNumber || product.model_number;

  return (
    <div className="w-full flex flex-col bg-transparent group h-full">
      
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-gray-100">
        <Link href={`/product/${productSlug}`} className="block relative w-full h-full">
          {productImage && productImage !== '/images/placeholder.jpg' ? (
            <Image
              src={productImage}
              alt={productName}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

      {/* Details - flex-1 + justify-between keeps button at bottom */}
      <div className="flex flex-col flex-1 gap-2 pt-3">
        
        {/* Top content */}
        <div className="flex flex-col gap-1.5 flex-1">
          <Link href={`/product/${productSlug}`}>
            <h3 className="text-black text-[13px] md:text-sm font-normal leading-relaxed hover:text-[#666141] transition-colors line-clamp-2">
              {productName}
            </h3>
          </Link>

          {modelNumber && (
            <span className="text-gray-500 text-xs">
              Model: {modelNumber}
            </span>
          )}

          <span className="text-gray-500 text-xs font-light">
            Customizable
          </span>
        </div>

        {/* Button always at bottom */}
        <div className="pt-2">
          <InquiryBtn product={product} />
        </div>

      </div>
    </div>
  );
}
