"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  ArrowUp,
  Linkedin
} from 'lucide-react';
import Container from './Container';
import QRCode from './QRCode';

const Footer = () => {
  const footerLinks = [
    {
      title: 'About us',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Process', href: '/process' },
        { name: 'Certifications', href: '/certificate' },
        { name: 'Empowerment', href: '/empowerment' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Techniques',
      links: [
        { name: 'All Techniques', href: '/techniquess' },
        { name: 'Block Printing', href: '/techniquess/block-printing' },
        { name: 'Dabu Print', href: '/techniquess/dabu-print' },
        { name: 'Screen Print', href: '/techniquess/screen-print' },
        { name: 'Hand Embroidery', href: '/techniquess/hand-embroidery' },
        { name: 'Applique Work', href: '/techniquess/applique-work' },
      ],
    },
    {
      title: 'All Seasons',
      links: [
        { name: 'All Seasons', href: '/seasons' },
        { name: 'Summer Collection', href: '/seasons/summer-collection' },
        { name: 'Festival Collection', href: '/seasons/festival-collection' },
        { name: 'Winter Collection', href: '/seasons/winter-collection' },
        { name: 'View Collection', href: '/collection' },
      ],
    },
    {
      title: 'Empowerment',
      links: [
        { name: 'Our Story', href: '/empowerment' },
        { name: 'Women Artisans', href: '/empowerment' },
        { name: 'Certifications', href: '/certificate' },
        { name: 'Our Process', href: '/process' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Collection', href: '/collection' },
        { name: 'Certifications', href: '/certificate' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Our Process', href: '/process' },
        { name: 'Inquiry List', href: '/cart' },
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#FFFCEA] pt-16 px-4 border-t border-[#666141]/10">
      <Container>

        {/* TOP SECTION: Logo, Bio & Link Columns */}
        <div className="mx-auto pb-12 flex flex-col xl:flex-row gap-12 xl:gap-20">
          <div className="xl:w-1/4 space-y-6">
            <Link href="/" className="flex justify-center gap-3 select-none group">
              <div className="relative w-12 h-12 mb-1">
                <Image
                  src="/images/logo/logo.png"
                  alt="Malani Impex Logo"
                  fill
                  sizes="48px"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex justify-center items-end">
                <span className="text-[50px] text-[#666141] leading-none tracking-tight">malani</span>
                <span className="text-[#666141] text-2xl ml-1 font-light tracking-wide opacity-90">impex</span>
                <span className="text-[#666141] text-2xl ml-1 font-light tracking-wide opacity-90">inc.</span>
              </div>
            </Link>
            <div>
              <h3 className="text-sm font-bold tracking-wider text-black uppercase mb-3">MALANI IMPEX INC.</h3>
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

          <div className="xl:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="font-medium text-black mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[13px] text-gray-900 hover:text-[#666141] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: Alibaba | Branch Office | Factory | Socials */}
        <div className="border-t border-[#666141]/20">
          <div className="py-12 flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0">

            {/* Alibaba */}
            <div className="lg:w-[200px] lg:shrink-0 space-y-3 lg:pr-8">
              <img src="/images/logo/AlibabaLogo.png" alt="Alibaba" className="h-5 w-auto object-contain" />
              <a
                href="https://malaniimpexinc.trustpass.alibaba.com/"
                className="inline-flex items-center gap-1 text-[13px] text-gray-600 hover:text-[#666141] transition-colors"
              >
                Visit Our Alibaba Store <ArrowRight size={12} />
              </a>
              <div className="pt-1">
                <QRCode url="https://malaniimpexinc.trustpass.alibaba.com/" size={90} />
              </div>
              <div className="text-[11px] text-gray-500 leading-snug">
                <p>Scan QR to Visit Malani Impex Inc.</p>
                <a href="https://malaniimpexinc.trustpass.alibaba.com/" className="hover:text-[#666141] transition-colors">
                  Alibaba Store →
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-[#666141]/20 self-stretch mx-8" />

            {/* Branch Office */}
            <div className="lg:flex-1 space-y-3">
              <h5 className="text-[13px] font-semibold text-[#666141] uppercase tracking-widest">Branch Office</h5>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                17, Ramkrishan Marg, Kailashpuri,<br />
                New Sanganer Road,<br />
                Opp. Metro Pillar No. 118,<br />
                Sodala Jaipur - 302019<br />
                Rajasthan (INDIA) 
              </p>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                Ph : 91-141-2294292, 2294617,<br />
                00-91-141-2292720, 2294319
              </p>
              <div className="text-[13px] text-gray-700 space-y-0.5">
                <a href="mailto:malani.inc@gmail.com" className="block hover:text-[#666141] transition-colors">
                  malani.inc@gmail.com
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-[#666141]/20 self-stretch mx-8" />

            {/* Factory */}
            <div className="lg:flex-1 space-y-3">
              <h5 className="text-[13px] font-semibold text-[#666141] uppercase tracking-widest">Factory</h5>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                E-192, RICO Industrial Area<br />
                Mansarovar, Jaipur - 302020<br />
                Rajasthan (INDIA)
              </p>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                Ph +91-141-2398641<br />
                +91-141-2401352
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-[#666141]/20 self-stretch mx-8" />

            {/* Socials & TOP */}
            <div className="lg:w-[160px] lg:shrink-0 flex flex-col items-start lg:items-end justify-between gap-8 lg:pl-4">
              <div>
                <p className="text-[13px] font-semibold text-[#666141] uppercase tracking-widest mb-3">Follow Us</p>
                <div className="flex gap-2.5">
                  <a href="https://www.instagram.com/malaniimpexinc/?hl=en" aria-label="Instagram"
                    className="w-9 h-9 flex items-center justify-center bg-[#C13584] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Instagram size={16} />
                  </a>
                  <a href="https://www.facebook.com/MalaniImpexInc/" aria-label="Facebook"
                    className="w-9 h-9 flex items-center justify-center bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Facebook size={16} />
                  </a>
                  <a href="#" aria-label="YouTube"
                    className="w-9 h-9 flex items-center justify-center bg-[#FF0000] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Youtube size={16} />
                  </a>
                  <a href="#" aria-label="LinkedIn"
                    className="w-9 h-9 flex items-center justify-center bg-[#0077B5] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 hover:text-[#666141] transition-colors uppercase tracking-widest"
              >
                <ArrowUp size={15} /> TOP
              </button>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className="border-t border-[#666141]/20">
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>
                © 2026 Malani Impex. All rights reserved. Lovingly handcrafted in
                India <span className="text-red-500">♥</span> since 1981
              </p>
              <span className="hidden md:inline text-gray-400">|</span>
              <p>
                Crafted and Powered by{' '}
                <a
                  href="https://www.kontentkraftdigital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#666141] hover:text-[#535036] transition-colors"
                >
                  Kontent Kraft Digital
                </a>
              </p>
            </div>
            <p className="text-center md:text-right">
              Certifications Fair Trade • GOTS • SEDEX • Zero Child Labor • Women-Owned
            </p>
          </div>
        </div>

        {/* QUOTE SECTION */}
        <div className="w-full pt-12 pb-24 text-center md:text-left border-t border-[#666141]/10">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-2xl lg:text-3xl text-[#666141] leading-relaxed opacity-90">
              "When you empower a woman, you empower a family.
              <br className="hidden md:block" />
              When you empower a family, you empower a community. When you
              empower a community, you change the world."
            </h2>
            <p className="text-xl md:text-2xl text-gray-500">– Malani Family, Founders</p>
          </div>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;
