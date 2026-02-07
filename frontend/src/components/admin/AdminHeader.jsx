"use client";
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminHeader({ onMenuClick }) {
  const { admin } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left: Menu Button & Search */}
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{admin?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{admin?.role || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#666141] flex items-center justify-center">
              <span className="text-white font-medium">
                {admin?.name?.charAt(0) || 'A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
