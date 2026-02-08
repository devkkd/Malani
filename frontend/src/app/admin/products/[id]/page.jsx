"use client";
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit2, Trash2, Package, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function ProductViewPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Product deleted!');
        router.push('/admin/products');
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#666141] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Product not found</p>
        <Link href="/admin/products" className="text-[#666141] hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-normal text-[#666141]">Product Details</h1>
            <p className="text-gray-600 text-sm mt-1">View product information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/products/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-[#666141] text-white rounded-lg hover:bg-[#535036] transition-colors"
          >
            <Edit2 size={18} />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Images</h2>
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      fill
                      className="object-cover"
                      unoptimized={img.url.includes('r2.dev')}
                    />
                    {img.isPrimary && (
                      <div className="absolute top-2 right-2 bg-[#666141] text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                  <Package size={48} className="text-gray-300" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Product Name</label>
                <p className="text-gray-900 mt-1">{product.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Model Number</label>
                <p className="text-gray-900 mt-1">{product.modelNumber || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Brand Name</label>
                <p className="text-gray-900 mt-1">{product.brandName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Slug</label>
                <p className="text-gray-900 mt-1">{product.slug}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Technique</label>
                <p className="text-gray-900 mt-1">{product.technique?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Season</label>
                <p className="text-gray-900 mt-1">{product.season?.name || 'N/A'}</p>
              </div>
            </div>
            {product.description && (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-900 mt-1">{product.description}</p>
              </div>
            )}
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  value && (
                    <div key={key}>
                      <label className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <p className="text-gray-900 mt-1">{value}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Available Sizes</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {size.size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Customization */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customization & Services</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Customization Available</label>
                <p className="text-gray-900 mt-1 flex items-center gap-2">
                  {product.customization?.available ? (
                    <>
                      <CheckCircle size={16} className="text-green-600" />
                      Yes
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-red-600" />
                      No
                    </>
                  )}
                </p>
              </div>
              {product.customization?.options && product.customization.options.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Customization Options</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.customization.options.map((option, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">OEM Service</label>
                <p className="text-gray-900 mt-1">{product.oemService || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-sm font-medium rounded ${
                  product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {product.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-sm font-medium rounded ${
                  product.featured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {product.featured ? 'Featured' : 'Not Featured'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-sm font-medium rounded ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
