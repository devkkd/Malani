"use client";
import { useState } from "react";
import {
  Home,
  Users,
  ShoppingBag,
  Settings,
  Menu,
  Palette,
  List,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-[#666141] min-h-screen text-[#FFFEF5] transition-all duration-300 flex flex-col shadow-xl z-50`}
    >
      {/* Header / Brand */}
      <div
        className={`flex ${
          open ? "justify-between" : "justify-center"
        } items-center px-4 py-5 border-b border-[#FFFEF5]/10`}
      >
        <h1 className={`text-xl font-normal tracking-wide whitespace-nowrap overflow-hidden ${!open && "hidden"}`}>
          Malani Impex
        </h1>
        <button 
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-md hover:bg-[#FFFEF5]/10 transition-colors"
        >
          <Menu
            size={22}
            className={`${open ? "rotate-0" : "rotate-180"} transition-transform duration-300`}
          />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 mt-6 px-3">
        <NavItem href="/admin" icon={<Home size={20} />} label="Dashboard" open={open} />
        <NavItem href="/admin/product_view" icon={<ShoppingBag size={20} />} label="Products" open={open} />
        <NavItem href="/admin/categories" icon={<List size={20} />} label="Categories" open={open} />
        
        {/* Spacer */}
        <div className="my-2 border-t border-[#FFFEF5]/10 mx-2"></div>
        
        <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" open={open} />
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 py-4 text-xs text-center border-t border-[#FFFEF5]/10 text-[#FFFEF5]/60">
        {open ? "© 2026 Malani Impex" : "©"}
      </div>
    </div>
  );
}

// Helper Component for cleaner code
const NavItem = ({ href, icon, label, open }) => (
  <Link
    href={href}
    className={`flex items-center ${
      open ? "gap-3 px-3 justify-start" : "justify-center px-0"
    } py-3 rounded-md hover:bg-[#FFFEF5]/10 hover:text-white transition-all duration-200 group relative`}
  >
    <span className="text-[#E9E4B5] group-hover:text-white transition-colors">{icon}</span>
    
    {open && <span className="font-medium text-sm whitespace-nowrap overflow-hidden">{label}</span>}
    
    {/* Tooltip for closed state */}
    {!open && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-[#4a462f] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
        {label}
      </div>
    )}
  </Link>
);