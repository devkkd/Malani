"use client";
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState(null);
  const [techniques, setTechniques] = useState([]);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch product
      const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const productData = await productRes.json();
      
      // Fetch techniques
      const techRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const techData = await techRes.json();
      
      // Fetch seasons
      const seasonRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const seasonData = await seasonRes.json();

      if (productData.success) {
        setProduct(productData.data);
      }
      if (techData.success) {
        setTechniques(techData.data);
      }
      if (seasonData.success) {
        setSeasons(seasonData.data);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Product updated successfully!');
        router.push(`/admin/products/${id}`);
      } else {
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      toast.error('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      }
    }));
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
            href={`/admin/products/${id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-normal text-[#666141]">Edit Product</h1>
            <p className="text-gray-600 text-sm mt-1">Update product information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Number
                </label>
                <input
                  type="text"
                  value={product.modelNumber || ''}
                  onChange={(e) => handleChange('modelNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={product.brandName || ''}
                  onChange={(e) => handleChange('brandName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technique *
                </label>
                <select
                  value={product.technique?._id || product.technique}
                  onChange={(e) => handleChange('technique', e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                >
                  <option value="">Select Technique</option>
                  {techniques.map(tech => (
                    <option key={tech._id} value={tech._id}>{tech.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season
                </label>
                <select
                  value={product.season?._id || product.season || ''}
                  onChange={(e) => handleChange('season', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                >
                  <option value="">No Season</option>
                  {seasons.map(season => (
                    <option key={season._id} value={season._id}>{season.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={product.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <input
                  type="text"
                  value={product.specifications?.material || ''}
                  onChange={(e) => handleSpecChange('material', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fabric</label>
                <input
                  type="text"
                  value={product.specifications?.fabric || ''}
                  onChange={(e) => handleSpecChange('fabric', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
                <input
                  type="text"
                  value={product.specifications?.pattern || ''}
                  onChange={(e) => handleSpecChange('pattern', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <input
                  type="text"
                  value={product.specifications?.style || ''}
                  onChange={(e) => handleSpecChange('style', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Place of Origin</label>
                <input
                  type="text"
                  value={product.specifications?.placeOfOrigin || ''}
                  onChange={(e) => handleSpecChange('placeOfOrigin', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={product.active}
                  onChange={(e) => handleChange('active', e.target.checked)}
                  className="w-5 h-5 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={product.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="w-5 h-5 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={product.inStock}
                  onChange={(e) => handleChange('inStock', e.target.checked)}
                  className="w-5 h-5 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                />
                <span className="text-sm font-medium text-gray-700">In Stock</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#666141] text-white rounded-lg hover:bg-[#535036] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
            <Link
              href={`/admin/products/${id}`}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
