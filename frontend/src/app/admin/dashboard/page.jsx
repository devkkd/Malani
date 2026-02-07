"use client";
import { useEffect, useState } from 'react';
import { Package, Layers, Palette, MessageSquare, TrendingUp, Users } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    seasons: 0,
    techniques: 0,
    inquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const [productsRes, seasonsRes, techniquesRes, inquiriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, { headers })
      ]);

      const [products, seasons, techniques, inquiries] = await Promise.all([
        productsRes.json(),
        seasonsRes.json(),
        techniquesRes.json(),
        inquiriesRes.json()
      ]);

      setStats({
        products: products.data?.length || 0,
        seasons: seasons.data?.length || 0,
        techniques: techniques.data?.length || 0,
        inquiries: inquiries.data?.length || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Seasons',
      value: stats.seasons,
      icon: Layers,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Techniques',
      value: stats.techniques,
      icon: Palette,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Inquiries',
      value: stats.inquiries,
      icon: MessageSquare,
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-[#666141] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgLight} p-3 rounded-lg`}>
                  <Icon className={stat.textColor} size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/products"
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#666141] hover:bg-[#FFFEF5] transition-all"
            >
              <div className="flex items-center space-x-3">
                <Package className="text-[#666141]" size={20} />
                <span className="font-medium text-gray-900">Manage Products</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="/admin/inquiries"
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#666141] hover:bg-[#FFFEF5] transition-all"
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="text-[#666141]" size={20} />
                <span className="font-medium text-gray-900">View Inquiries</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="/admin/seasons"
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#666141] hover:bg-[#FFFEF5] transition-all"
            >
              <div className="flex items-center space-x-3">
                <Layers className="text-[#666141]" size={20} />
                <span className="font-medium text-gray-900">Manage Seasons</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">System Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Database Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">API Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Last Updated</span>
              <span className="text-gray-900 font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-[#666141] to-[#555135] rounded-lg shadow-sm p-8 text-white">
        <h2 className="text-2xl font-medium mb-2">Welcome to Malani Impex Admin</h2>
        <p className="text-white/80 mb-6">
          Manage your textile business efficiently with our comprehensive admin dashboard.
        </p>
        <a
          href="/"
          target="_blank"
          className="inline-block bg-white text-[#666141] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          View Website →
        </a>
      </div>
    </div>
  );
}
