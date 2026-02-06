import { Edit, Trash2, Plus, Images } from "lucide-react";
import Link from "next/link";

export default function ProductsView() {
  
  // --- DUMMY CONFIG ---
  const imageBaseURL = "/images/products/";

  // --- DUMMY DATA ---
  const products = [
    {
      _id: "PROD-001",
      title: "Hand Block Printed Cushion Cover - Floral",
      brand: "Malani Impex",
      category_id: { name: "Home Decor", active: true },
      color_ids: [
        { _id: "c1", name: "Mustard", code: "#EAB308" },
        { _id: "c2", name: "White", code: "#FFFFFF" }
      ],
      new_arrival: true,
      best_seller: false,
      deal_of_the_day: false,
      price_min: 499,
      price_max: 899,
      discountPercentage: 10,
      stock: 120,
      is_active: true,
      image: "",
      more_image: []
    },
    {
      _id: "PROD-002",
      title: "Vintage Kantha Quilt - Indigo",
      brand: "Malani Impex",
      category_id: { name: "Winter", active: true },
      color_ids: [
        { _id: "c3", name: "Indigo", code: "#1e3a8a" }
      ],
      new_arrival: false,
      best_seller: true,
      deal_of_the_day: true,
      price_min: 2500,
      price_max: 3200,
      discountPercentage: 15,
      stock: 45,
      is_active: true,
      image: "", 
      more_image: []
    },
    {
      _id: "PROD-003",
      title: "Dabu Print Table Runner",
      brand: "Malani Impex",
      category_id: { name: "Table Linen", active: true },
      color_ids: [
        { _id: "c4", name: "Blue", code: "#3b82f6" },
        { _id: "c5", name: "Grey", code: "#9ca3af" }
      ],
      new_arrival: true,
      best_seller: true,
      deal_of_the_day: false,
      price_min: 800,
      price_max: 1200,
      discountPercentage: 5,
      stock: 8,
      is_active: true,
      image: "",
      more_image: []
    },
    {
      _id: "PROD-004",
      title: "Chikan Embroidery Fabric Roll",
      brand: "Malani Impex",
      category_id: { name: "Fabrics", active: false },
      color_ids: [],
      new_arrival: false,
      best_seller: false,
      deal_of_the_day: false,
      price_min: 1500,
      price_max: 1500,
      discountPercentage: 0,
      stock: 0,
      is_active: false,
      image: "",
      more_image: []
    }
  ];
  
  return (
    // Removed 'overflow-x-auto' from here to prevent full page scroll
    <div className="p-6 w-full min-h-screen">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
           <h2 className="text-2xl font-normal text-[#666141]">Products Inventory</h2>
           <p className="text-sm text-gray-500 mt-1">Manage your catalog, stock, and pricing</p>
        </div>
        
        <Link
          href="/admin/product_view/add_product"
          className="flex items-center gap-2 bg-[#666141] text-[#FFFEF5] px-5 py-2.5 rounded-lg hover:bg-[#5a563d] transition-all shadow-sm text-sm font-medium whitespace-nowrap"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* --- Table Wrapper --- */}
      <div className="bg-white border border-[#666141]/10 rounded-xl overflow-hidden shadow-sm">
        {/* Added 'w-full' and ensured overflow is here */}
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
            
            {/* Table Head */}
            <thead className="bg-[#666141] text-[#FFFEF5]">
                <tr>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">#</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Image</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Title</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Brand</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Category</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Colors</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide text-center">New<br/>Arrival</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide text-center">Best<br/>Seller</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide text-center">Day<br/>Deal</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Price Range</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Discount</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Stock</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide">Status</th>
                <th className="py-4 px-4 font-medium text-sm tracking-wide text-center">Actions</th>
                </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#666141]/5">
                {products?.length === 0 ? (
                <tr>
                    <td colSpan={14} className="py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                         <span className="bg-gray-100 p-3 rounded-full"><Images size={24} /></span>
                         <span>No products found in inventory</span>
                      </div>
                    </td>
                </tr>
                ) : (
                products.map((product, index) => (
                    <tr
                    key={product._id}
                    className="hover:bg-[#FFFEF5] transition-colors group"
                    >
                    {/* Index */}
                    <td className="py-4 px-4 text-gray-500 font-medium text-sm">{index + 1}</td>

                    {/* Image */}
                    <td className="py-4 px-4">
                        <div className="w-10 h-10 rounded-md border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                            {product.image ? (
                                <img
                                src={`${imageBaseURL}${product.image}`}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                />
                            ) : (
                                <Images size={16} className="text-gray-400" />
                            )}
                        </div>
                    </td>

                    {/* Product Title */}
                    <td className="py-4 px-4">
                        <div className="max-w-[200px]">
                            <p className="font-medium text-gray-900 truncate" title={product.title}>{product.title}</p>
                            <p className="text-xs text-gray-400 truncate">ID: {product._id?.slice(-6)}</p>
                        </div>
                    </td>

                    {/* Brand */}
                    <td className="py-4 px-4 text-gray-600 text-sm max-w-[120px] truncate">
                        <span title={product.brand}>{product.brand || "—"}</span>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-gray-600 text-sm max-w-[120px]">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs truncate block" title={product.category_id?.name}>
                           {product.category_id?.name || "—"}
                        </span>
                    </td>

                    {/* Colors */}
                    <td className="py-4 px-4">
                        {product.color_ids?.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-w-[100px]">
                            {product.color_ids.map((color) => (
                            <div
                                key={color._id}
                                className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
                                style={{ backgroundColor: color.code }}
                                title={color.name}
                            />
                            ))}
                        </div>
                        ) : (
                        <span className="text-gray-400 text-sm">—</span>
                        )}
                    </td>

                    {/* Toggles */}
                    <td className="py-4 px-4 text-center">
                        <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${product.new_arrival ? 'bg-[#666141]' : 'bg-gray-300'}`}>
                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${product.new_arrival ? 'translate-x-5' : 'translate-x-1'}`} />
                        </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                        <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${product.best_seller ? 'bg-[#666141]' : 'bg-gray-300'}`}>
                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${product.best_seller ? 'translate-x-5' : 'translate-x-1'}`} />
                        </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                        <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${product.deal_of_the_day ? 'bg-[#666141]' : 'bg-gray-300'}`}>
                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${product.deal_of_the_day ? 'translate-x-5' : 'translate-x-1'}`} />
                        </div>
                    </td>

                    {/* Price Range */}
                    <td className="py-4 px-4 text-sm font-medium text-[#666141]">
                        ₹{product.price_min} – ₹{product.price_max}
                    </td>

                    {/* Discount */}
                    <td className="py-4 px-4 text-sm text-green-600 font-medium text-center">
                        {product.discountPercentage ? `${product.discountPercentage}%` : "—"}
                    </td>

                    {/* Stock */}
                    <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                           {product.stock} Units
                        </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                        {!product.category_id?.active ? (
                            <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wide rounded bg-yellow-100 text-yellow-700 border border-yellow-200">
                                Inactive
                            </span>
                        ) : (
                            <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${product.is_active ? 'bg-green-600' : 'bg-gray-300'}`}>
                                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${product.is_active ? 'translate-x-5' : 'translate-x-1'}`} />
                            </div>
                        )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                        <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        
                        <Link
                            href={`/admin/product_view/edit/${product._id}`}
                            className="text-gray-400 hover:text-[#666141] transition-colors p-1.5 rounded hover:bg-[#666141]/10"
                            title="Edit"
                        >
                            <Edit size={16} />
                        </Link>

                        <button className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded hover:bg-blue-50" title="Gallery">
                             <Images size={16} />
                        </button>

                        <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded hover:bg-red-50" title="Delete">
                             <Trash2 size={16} />
                        </button>

                        </div>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}