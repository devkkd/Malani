"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Eye, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTechnique, setFilterTechnique] = useState('');
  const [filterSeason, setFilterSeason] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
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
        fetchProducts();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTechnique = !filterTechnique || product.technique?._id === filterTechnique;
    const matchesSeason = !filterSeason || 
      (filterSeason === 'none' ? !product.season : product.season?._id === filterSeason);
    return matchesSearch && matchesTechnique && matchesSeason;
  });

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#666141] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-[#666141] mb-2">Products Management</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/create"
          className="flex items-center justify-center gap-2 bg-[#666141] text-white px-6 py-3 rounded-lg hover:bg-[#555135] transition-colors"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
          />
        </div>
        
        <select
          value={filterTechnique}
          onChange={(e) => setFilterTechnique(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
        >
          <option value="">All Techniques</option>
          {/* Will be populated dynamically */}
        </select>

        <select
          value={filterSeason}
          onChange={(e) => setFilterSeason(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
        >
          <option value="">All Seasons</option>
          <option value="none">No Season</option>
          {/* Will be populated dynamically */}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technique
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Season
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden">
                        {product.images?.[0]?.url ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            quality={85}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                            unoptimized={product.images[0].url.includes('r2.dev')}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.modelNumber || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-[#E9E4B5] text-[#666141] rounded">
                      {product.technique?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.season ? (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                        {product.season.name}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">No Season</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded inline-block ${
                        product.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {product.active ? 'Active' : 'Inactive'}
                      </span>
                      {product.featured && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded inline-block">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="p-2 text-[#666141] hover:bg-[#E9E4B5] rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-semibold text-green-600">
            {products.filter(p => p.active).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Featured</p>
          <p className="text-2xl font-semibold text-yellow-600">
            {products.filter(p => p.featured).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">With Season</p>
          <p className="text-2xl font-semibold text-blue-600">
            {products.filter(p => p.season).length}
          </p>
        </div>
      </div>
    </div>
  );
}
