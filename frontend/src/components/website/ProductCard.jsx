import Image from "next/image";
import Link from "next/link";
import InquiryBtn from "./InquiryBtn";

export default function ProductCard({ product }) {
  // Handle both old JSON format and new API format
  const productId = product._id || product.id;
  const productImage = product.images?.[0]?.url || product.images?.[0] || '/images/placeholder.jpg';
  const productName = product.name || 'Product';

  return (
    <div className="w-full max-w-[320px] flex flex-col gap-4 bg-transparent group">
      
      {/* --- Image Section --- */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-gray-100">
        <Link href={`/product/${productId}`}>
          <Image
            src={productImage}
            alt={productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
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