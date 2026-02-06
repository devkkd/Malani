"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import Container from "./Container";
import { useInquiry } from "@/context/CartContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const { inquiries } = useInquiry();

  // Scroll Detection for Blur Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const techniquesSubmenu = [
    { name: "Block Print", href: "/techniquess/block-print" },
    { name: "Dabu Print", href: "/techniquess/dabu-print" },
    { name: "Screen Print", href: "/techniquess/screen-print" },
    { name: "Digital Print", href: "/techniquess/digital-print" },
    { name: "Chikan Embroidery", href: "/techniquess/chikan-embroidery" },
    { name: "Chikan Embroidery (Computerized)", href: "/techniquess/chikan-comp" },
    { name: "Machine Embroidery", href: "/techniquess/machine-embroidery" },
    { name: "Machine Embroidery (Computerized)", href: "/techniquess/machine-embroidery-comp" },
    { name: "Hand work (Gaderi / Kantha)", href: "/techniquess/hand-work" },
    { name: "Applique work", href: "/techniquess/applique-work" },
  ];

  const seasonsSubmenu = [
    { name: "Summer Collection", href: "/seasons/summer" },
    { name: "Festival Collection", href: "/seasons/festival" },
    { name: "Winter Collection", href: "/seasons/winter" },
    { name: "Year-Round Classics", href: "/seasons/classics" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Techniques", submenu: techniquesSubmenu },
    { name: "Seasons", submenu: seasonsSubmenu },
    { name: "Empowerment", href: "/empowerment" },
    { name: "Certifications", href: "/certificate" },
    { name: "FAQ's", href: "/faqs" },
    { name: "Our Process", href: "/process" },
  ];

  return (
    <header 
      className={`w-full sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-[#FFFEF5]/80 backdrop-blur-md border-[#666141]/10 shadow-sm py-2" 
          : "bg-[#FFFEF5] border-gray-100 py-4"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between px-3 lg:px-0">
          {/* Logo */}
          <Link href="/" className="flex items-end gap-2 z-50">
            <img
              src="/images/logo/logo.png"
              alt="Malani Impex Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="flex items-baseline">
              <span className="text-3xl md:text-[42px] text-[#666141] leading-none">
                malani
              </span>
              <span className="ml-1 text-[#666141] text-sm md:text-xl font-light">
                impex inc.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <ul className="flex gap-6 items-center">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() =>
                    link.submenu && setActiveDropdown(link.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="text-[12px] font-medium hover:text-[#666141] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <span className="text-[12px] font-medium flex items-center gap-1 cursor-default hover:text-[#666141] transition-colors">
                      {link.name}
                      <ChevronDown className="w-3 h-3" />
                    </span>
                  )}

                  {link.submenu && activeDropdown === link.name && (
                    <div className="absolute top-full -left-4 pt-2 w-[300px]">
                      <div className="bg-[#FFFEF5] border border-[#666141]/10 rounded-xl shadow-xl py-2 overflow-hidden">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-6 py-3 text-sm text-gray-600 hover:bg-[#666141] hover:text-white transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-[#666141] group-hover:scale-110 transition-transform" />
              {inquiries.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#666141] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FFFEF5]">
                  {inquiries.length}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 bg-[#666141] text-white px-5 py-3 rounded-full text-[12px] font-medium hover:bg-[#5a563d] transition-colors shadow-sm active:scale-95"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Right Section (Cart + Toggle) */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Mobile Cart */}
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-[#666141]" />
              {inquiries.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#666141] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FFFEF5]">
                  {inquiries.length}
                </span>
              )}
            </Link>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-[#666141]"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>

        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FFFEF5] border-t h-[calc(100vh-80px)] overflow-y-auto shadow-inner">
          <div className="px-6 py-6 pb-24 space-y-6">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.href ? (
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium block text-[#666141]"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <>
                    <div className="text-lg font-medium text-[#666141]">{link.name}</div>
                    <div className="pl-4 mt-2 space-y-2 border-l border-[#666141]/20">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="block text-sm text-gray-600 hover:text-[#666141]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {/* Mobile Menu Bottom Cart Link (Optional: Kept as duplicate access point or remove if redundant) */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border border-[#666141]/20 px-4 py-3 rounded-lg bg-white"
            >
              <span className="text-[#666141]">Inquiry List</span>
              <span className="text-sm font-medium bg-[#666141] text-white w-6 h-6 flex items-center justify-center rounded-full">
                {inquiries.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;