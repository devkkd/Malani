"use client";
import { useState, useEffect } from 'react';
import { Search, Eye, Download, Trash2, XCircle, Package, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import axios from 'axios';

export default function ProductInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, []);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (filterStatus) params.append('status', filterStatus);
      if (filterPriority) params.append('priority', filterPriority);
      if (searchTerm) params.append('search', searchTerm);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product-inquiries?${params}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (response.data.success) {
        setInquiries(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch product inquiries');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product-inquiries/stats/overview`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const updateStatus = async (id, status, priority, adminNotes) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/product-inquiries/${id}/status`,
        { status, priority, adminNotes },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Updated successfully!');
        fetchInquiries();
        fetchStats();
        setSelectedInquiry(null);
      }
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const deleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product-inquiries/${id}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        toast.success('Inquiry deleted');
        fetchInquiries();
        fetchStats();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (filterStatus) params.append('status', filterStatus);
      if (filterPriority) params.append('priority', filterPriority);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product-inquiries/export/csv?${params}`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `product-inquiries-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('CSV downloaded successfully');
    } catch (error) {
      toast.error('Failed to download CSV');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-700',
      'reviewed': 'bg-blue-100 text-blue-700',
      'quotation-sent': 'bg-indigo-100 text-indigo-700',
      'quotation-approved': 'bg-green-100 text-green-700',
      'sample-preparation': 'bg-purple-100 text-purple-700',
      'sample-sent': 'bg-pink-100 text-pink-700',
      'sample-approved': 'bg-teal-100 text-teal-700',
      'production': 'bg-orange-100 text-orange-700',
      'quality-check': 'bg-cyan-100 text-cyan-700',
      'ready-to-ship': 'bg-lime-100 text-lime-700',
      'shipped': 'bg-emerald-100 text-emerald-700',
      'delivered': 'bg-green-100 text-green-700',
      'completed': 'bg-green-200 text-green-800',
      'cancelled': 'bg-red-100 text-red-700',
      'on-hold': 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-600',
      'medium': 'bg-blue-100 text-blue-600',
      'high': 'bg-orange-100 text-orange-600',
      'urgent': 'bg-red-100 text-red-600'
    };
    return colors[priority] || 'bg-gray-100 text-gray-600';
  };

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus, filterPriority, searchTerm]);

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
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-[#666141] mb-2">Product Inquiries</h1>
          <p className="text-gray-600">Manage customer product inquiries and track production status</p>
        </div>
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-[#666141] text-white rounded-lg hover:bg-[#535036] transition-colors"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} className="text-gray-500" />
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.total || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-yellow-500" />
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <p className="text-2xl font-semibold text-yellow-600">{stats.pending || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-orange-500" />
            <p className="text-sm text-gray-600">Production</p>
          </div>
          <p className="text-2xl font-semibold text-orange-600">{stats.inProduction || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-green-500" />
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <p className="text-2xl font-semibold text-green-600">{stats.completed || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={18} className="text-red-500" />
            <p className="text-sm text-gray-600">Cancelled</p>
          </div>
          <p className="text-2xl font-semibold text-red-600">{stats.cancelled || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="quotation-sent">Quotation Sent</option>
          <option value="quotation-approved">Quotation Approved</option>
          <option value="sample-preparation">Sample Preparation</option>
          <option value="sample-sent">Sample Sent</option>
          <option value="sample-approved">Sample Approved</option>
          <option value="production">Production</option>
          <option value="quality-check">Quality Check</option>
          <option value="ready-to-ship">Ready to Ship</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="on-hold">On Hold</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                      {inquiry.company && (
                        <div className="text-sm text-gray-500">{inquiry.company}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{inquiry.email}</div>
                    {inquiry.phone && (
                      <div className="text-sm text-gray-500">{inquiry.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {inquiry.totalItems} {inquiry.totalItems === 1 ? 'Product' : 'Products'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(inquiry.priority)}`}>
                      {inquiry.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(inquiry.submittedAt || inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="p-2 text-[#666141] hover:bg-[#E9E4B5] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => deleteInquiry(inquiry._id)}
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

        {inquiries.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No product inquiries found</p>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdate={updateStatus}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
      )}
    </div>
  );
}

// Inquiry Detail Modal Component
function InquiryDetailModal({ inquiry, onClose, onUpdate, getStatusColor, getPriorityColor }) {
  const [status, setStatus] = useState(inquiry.status);
  const [priority, setPriority] = useState(inquiry.priority);
  const [adminNotes, setAdminNotes] = useState(inquiry.adminNotes || '');

  const handleUpdate = () => {
    onUpdate(inquiry._id, status, priority, adminNotes);
  };

  const statusOptions = [
    'pending', 'reviewed', 'quotation-sent', 'quotation-approved',
    'sample-preparation', 'sample-sent', 'sample-approved',
    'production', 'quality-check', 'ready-to-ship',
    'shipped', 'delivered', 'completed', 'cancelled', 'on-hold'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-medium text-[#666141]">Product Inquiry Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Customer Information</h3>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900">{inquiry.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{inquiry.email}</p>
              </div>

              {inquiry.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{inquiry.phone}</p>
                </div>
              )}

              {inquiry.company && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <p className="text-gray-900">{inquiry.company}</p>
                </div>
              )}

              {inquiry.location && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-gray-900">{inquiry.location}</p>
                </div>
              )}

              {inquiry.message && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{inquiry.message}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Submitted Date</label>
                <p className="text-gray-900">
                  {new Date(inquiry.submittedAt || inquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Products & Status Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Products ({inquiry.totalItems})</h3>
              
              <div className="space-y-3 max-h-48 overflow-y-auto no-scrollbar">
                {inquiry.products.map((product, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    {product.images && product.images[0] && (
                      <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          loading={index < 3 ? "eager" : "lazy"}
                          quality={85}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                          unoptimized={product.images[0].includes('r2.dev')}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      {product.modelNumber && (
                        <p className="text-xs text-gray-600 mt-0.5">Model: {product.modelNumber}</p>
                      )}
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Status Management</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>
                          {opt.replace(/-/g, ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Admin Notes</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows="3"
                      placeholder="Add notes about this inquiry..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleUpdate}
            className="w-full bg-[#666141] text-white py-3 rounded-lg hover:bg-[#535036] transition-colors font-medium"
          >
            Update Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
