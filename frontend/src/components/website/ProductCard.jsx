import Image from "next/image";
import Link from "next/link";
import InquiryBtn from "./InquiryBtn";

export default function ProductCard({ product }) {
  return (
    <div className="w-full max-w-[320px] flex flex-col gap-4 bg-transparent group">
      
      {/* --- Image Section --- */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-gray-100">
        {/* Wrap in Link if needed */}
        <Link href={`/product/${product.id}`}>
            <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
        </Link>
      </div>

      {/* --- Details Section --- */}
      <div className="flex flex-col gap-3">
        
        {/* Title - Matches the long descriptive text style in image */}
        <Link href={`/product/${product.id}`}>
            <h3 className="text-black text-[13px] md:text-sm font-normal leading-relaxed hover:text-[#666141] transition-colors line-clamp-3">
             {/* Using name + description to mimic the long text in the image if name is short */}
             {product.name}
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