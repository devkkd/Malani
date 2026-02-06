"use client";
import { Bell, Search, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full bg-[#FFFEF5] border-b border-[#666141]/10 flex items-center justify-between px-6 py-4 sticky top-0 z-50">
      
      {/* --- Left Section --- */}
      <div className="flex items-center gap-4">
        {/* Menu button for mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#666141] hover:bg-[#666141]/10 p-2 rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Brand / Greeting */}
        <div>
          <h2 className="text-2xl font-normal text-[#666141]">Welcome back, Admin</h2>
          <p className="text-sm text-black/60 font-light">Overview of recent activity</p>
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="hidden md:flex items-center bg-white border border-[#666141]/20 px-4 py-2.5 rounded-full w-1/3 max-w-sm focus-within:border-[#666141] transition-colors shadow-sm">
        <Search className="text-[#666141]/60" size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm text-[#666141] w-full ml-3 placeholder-[#666141]/40"
        />
      </div>

      {/* --- Right Section --- */}
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <button className="relative text-[#666141] hover:bg-[#666141]/5 p-2 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-1 right-1 bg-[#C94E4E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#FFFEF5]">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#666141]/10">
          {/* Avatar Container */}
          <div className="relative w-10 h-10 rounded-full border border-[#666141]/20 overflow-hidden shadow-sm">
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
               <Image 
                  src="/images/profile.jpg" 
                  alt="Admin" 
                  fill
                  className="object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
               />
             </div>
          </div>
          
          {/* Badge */}
          <span className="hidden md:block px-4 py-1.5 bg-[#E9E4B5] rounded-full text-[#666141] text-sm font-medium">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}