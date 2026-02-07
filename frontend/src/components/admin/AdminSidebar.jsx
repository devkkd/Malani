"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Palette, 
  MessageSquare, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Layers, label: 'Seasons', href: '/admin/seasons' },
  { icon: Palette, label: 'Techniques', href: '/admin/techniques' },
  { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { logout, admin } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#666141] text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center justify-center">
              <div className="bg-white rounded-lg p-2">
                <Image
                  src="/images/logo/MalaniLogo.png"
                  alt="Malani Impex"
                  width={140}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Admin Info */}
          <div className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#E9E4B5] flex items-center justify-center">
                <span className="text-[#666141] font-medium text-lg">
                  {admin?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
                <p className="text-xs text-white/70 truncate">{admin?.role || 'Administrator'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full
                text-white/70 hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
