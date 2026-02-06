"use client";

import Link from 'next/link';
import Image from 'next/image'; // Required for the logo code using 'fill'
import {
  Instagram,
  Facebook,
  Youtube,
  Pin, // Using Pin for Pinterest
  ArrowRight,
  ArrowUp
} from 'lucide-react';
import Container from './Container';

const Footer = () => {
  // --- Data for Footer Columns ---
  const footerLinks = [
    {
      title: 'About us',
      links: [
        { name: 'Company Overview', href: '/company-overview' },
        { name: 'The Malani Legacy', href: '/legacy' },
        { name: 'What Guides Our Every Step', href: '/guides' },
        { name: 'Our Promise', href: '/promise' },
        { name: 'Biodegradable Packaging', href: '/packaging' },
        { name: 'Our Ethical Foundation', href: '/ethical' },
      ],
    },
    {
      title: 'Techniques',
      links: [
        { name: 'Block Print', href: '/techniques/block-print' },
        { name: 'Dabu Print', href: '/techniques/dabu-print' },
        { name: 'Screen Print', href: '/techniques/screen-print' },
        { name: 'Digital Print', href: '/techniques/digital-print' },
        { name: 'Chikan Embroidery', href: '/techniques/chikan' },
        { name: 'Chikan Embroidery (Comp)', href: '/techniques/chikan-comp' },
        { name: 'Machine Embroidery', href: '/techniques/machine' },
        { name: 'Hand work (Gaderi / Kantha)', href: '/techniques/handwork' },
        { name: 'Applique work', href: '/techniques/applique' },
      ],
    },
    {
      title: 'All Seasons',
      links: [
        { name: 'Summer Collection', href: '/collection/summer' },
        { name: 'Festival Collection', href: '/collection/festival' },
        { name: 'Winter Collection', href: '/collection/winter' },
        { name: 'Year-Round Classics', href: '/collection/classics' },
        { name: 'Collection', href: '/collection/all' },
      ],
    },
    {
      title: 'Empowerment',
      links: [
        { name: 'Skills Training', href: '/empowerment/training' },
        { name: 'Fair Wages', href: '/empowerment/wages' },
        { name: 'Community Impact', href: '/empowerment/impact' },
        { name: 'Meet the Women', href: '/empowerment/women' },
        { name: 'Proudly Working', href: '/empowerment/working' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Request a Quote', href: '/quote' },
        { name: 'Certifications', href: '/certifications' },
        { name: "FAQ's", href: '/faqs' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Our Process', href: '/process' },
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#FFFCEA] pt-16 px-4 border-t border-[#666141]/10">
      <Container>
        {/* --- TOP SECTION: Logo, Bio, & Link Columns --- */}
        <div className="mx-auto pb-12 flex flex-col xl:flex-row gap-12 xl:gap-20">

          {/* Left Column: Brand Info */}
          <div className="xl:w-1/4 space-y-6">

            {/* --- Logo Section (Your Code) --- */}
            <Link href="/" className="flex justify-center gap-3 select-none group">
              {/* Logo Image */}
              <div className="relative w-12 h-12 mb-1">
                <Image
                  src="/images/logo/logo.png"
                  alt="Malani Impex Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex justify-center items-end">
                <span className="text-[50px] text-[#666141] leading-none tracking-tight">
                  malani
                </span>

                <span className="text-[#666141] text-2xl ml-1 font-light tracking-wide opacity-90">
                  impex
                </span>
                <span className="text-[#666141] text-2xl ml-1 font-light tracking-wide opacity-90">
                  inc.
                </span>
              </div>
            </Link>

            <div>
              <h3 className="text-sm font-bold tracking-wider text-black uppercase mb-3">
                MALANI IMPEX INC.
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed pr-4">
                Exquisitely handcrafted Indian textiles that honor heritage,
                empower artisans, and cherish our planet. Proudly family-owned
                since 1981, distinguished as women-led.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#666141] text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              More About Us <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Columns: Links Grid */}
          <div className="xl:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="font-medium text-black mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-gray-900 hover:text-[#666141] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- MIDDLE SECTION: Alibaba, Contact, Socials --- */}
        <div className="border-t border-[#666141]/20">
          <div className="mx-auto py-12 flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">

            {/* 1. Alibaba Section */}
            <div className="lg:w-1/3 space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo/AlibabaLogo.png"
                  alt="Alibaba"
                  className="h-4 w-auto object-contain"
                />
              </div>
              <a
                href="#"
                className="text-xs text-gray-900 hover:underline flex items-center gap-1"
              >
                Visit Our Alibaba Store <ArrowRight size={12} />
              </a>

              {/* QR Code Placeholder */}
              <div className="w-24 h-24 bg-white border border-gray-200 p-1">
                {/* Replace this div with your QR Image */}
                <div className="w-full h-full bg-black flex items-center justify-center">
                  {/* Simulating QR code pattern */}
                  <div className="text-[8px] text-white text-center p-1">QR CODE</div>
                </div>
              </div>

              <div className="text-[10px] text-gray-900 leading-tight">
                <p>Scan QR to Visit Hebei Spring-Tex I/e Corp., Ltd.</p>
                <a href="#" className="hover:underline">
                  Alibaba Store →
                </a>
              </div>
            </div>

            {/* 2. Contact & Location */}
            <div className="lg:w-1/3 flex flex-col gap-8 text-sm text-gray-900">
              <div>
                <h5 className="text-black font-medium mb-2">Contact Us</h5>
                <p>+91-1234567890 | +91-1234567890</p>
                <p>info@malaniimpex.com</p>
                <p>wholesale@malaniimpex.com</p>
              </div>
              <div>
                <h5 className="text-black font-medium mb-2">Location</h5>
                <p>Jaipur, Rajasthan India - 302001 INDIA</p>
              </div>
            </div>

            {/* 3. Socials & Top Button */}
            <div className="lg:w-1/3 flex flex-col items-start lg:items-end justify-between gap-6">
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-600">Follow Us</span>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-[#E1306C] text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-[#FF0000] text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Youtube size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center bg-[#BD081C] text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Pin size={16} />
                  </a>
                </div>
              </div>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm font-medium hover:text-[#666141] transition-colors uppercase tracking-wider"
              >
                <ArrowUp size={16} /> TOP
              </button>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Copyright & Certifications --- */}
        <div className="border-t border-[#666141]/20">
          <div className="mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-900">
            <p>
              © 2026 Malani Impex. All rights reserved. Lovingly handcrafted in
              India <span className="text-red-500">♥</span> since 1981
            </p>
            <p>
              Certifications Fair Trade • GOTS • SEDEX • Zero Child Labor •
              Women-Owned
            </p>
          </div>
        </div>

        {/* --- QUOTE SECTION --- */}
        <div className="w-full pt-12 pb-24 text-center md:text-left border-t border-[#666141]/10">
          <div className="mx-auto space-y-6">
            <h2 className="text-2xl md:text-2xl lg:text-3xl text-[#666141] leading-relaxed opacity-90">
              "When you empower a woman, you empower a family.
              <br className="hidden md:block" />
              When you empower a family, you empower a community. When you
              empower a community, you change the world."
            </h2>
            <p className="text-xl md:text-2xl text-gray-500">
              – Malani Family, Founders
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;