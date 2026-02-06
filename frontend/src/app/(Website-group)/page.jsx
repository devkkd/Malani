"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/website/Container';
import HomeTechniquesSection from '@/components/website/HomeTechniquesSection';
import HomeSeasonsSection from '@/components/website/HomeSeasonsSection';
import HeroSection from '@/components/website/HeroSection';
import Hero from '@/components/website/Hero';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EthicalFoundation from '@/components/website/EthicalData';

const HomePage = () => {
  // --- STATE: Slider Logic ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dummy Slider Images
  const slides = [
    "/images/home/slider1.jpg",
    "/images/home/slider2.jpg",
    "/images/home/slider3.jpg"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // --- DATA: Legacy Timeline ---
  const legacyTimeline = [
    { year: "1981", title: "Our Foundation of Excellence" },
    { year: "1995", title: "Expanding Horizons & Mastering New Crafts" },
    { year: "2005", title: "Going Global with Integrity" },
    { year: "2015", title: "Empowerment Era: Women Lead the Way" },
    { year: "2025", title: "Legacy Secured Through Innovation" }
  ];

  // --- DATA: Partners ---
  const partnersRow1 = [
    { name: "Urban Outfitters", src: "/images/brands/brand1.png" },
    { name: "Calma House", src: "/images/brands/brand2.png" },
    { name: "At Home", src: "/images/brands/brand3.png" },
    { name: "Tree of Life", src: "/images/brands/brand4.png" },
    { name: "Grandin Road", src: "/images/brands/brand5.png" },
    { name: "Grandin Road", src: "/images/brands/brand6.jpg" },
    { name: "Grandin Road", src: "/images/brands/brand7.png" },
    { name: "Grandin Road", src: "/images/brands/brand8.png" },
  ];

  const partnersRow2 = [
    { name: "Indaba", src: "/images/brands/brand9.png" },
    { name: "TJX", src: "/images/brands/brand10.png" },
    { name: "Item International", src: "/images/brands/brand11.png" },
    { name: "Gabar", src: "/images/brands/brand12.png" },
    { name: "World Market", src: "/images/brands/brand13.png" },
    { name: "World Market", src: "/images/brands/brand14.png" },
    { name: "World Market", src: "/images/brands/brand15.jpg" },
  ];
  // --- DATA: Biodegradable Packaging ---
  const packagingData = [
    {
      icon: "/images/about/aboutIcon10.png",
      title: "Made from Plant Starch",
      text: "Our packaging bags are created from corn starch completely natural and renewable."
    },
    {
      icon: "/images/about/aboutIcon11.png",
      title: "100% Biodegradable",
      text: "Unlike traditional plastic that persists for centuries, our bags break down naturally within 3-6 months."
    },
    {
      icon: "/images/about/aboutIcon12.png",
      title: "Fully Compostable",
      text: "You can add our packaging directly to your home compost bin or municipal composting program."
    },
    {
      icon: "/images/about/aboutIcon13.png",
      title: "Looks Like Plastic, Acts Like Nature",
      text: "The bags have the durability and protection of plastic during shipping, but return to the earth harmlessly afterward."
    }
  ];
  // --- DATA: Ethical Foundation ---
  const ethicalData = [
    {
      title: "What We Always Do",
      icon: "✓", // You can replace with an SVG or Image if preferred
      items: [
        "Entirely Handmade Craftsmanship",
        "Prompt, Fair Artisan Compensation",
        "Safe, Dignified Workspaces",
        "Living Wages That Support Families",
        "Earth-friendly Materials Exclusively",
        "Transparent Supply Chain"
      ]
    },
    {
      title: "What We Never Do",
      icon: "✗",
      items: [
        "No Sweatshops, Ever",
        "No Child Labor- Zero Tolerance",
        "No Trafficked Workers",
        "No Toxic Materials",
        "Never Profit Over People",
        "No Murky Supply Chains"
      ]
    },
    {
      title: "Our Special Focus",
      icon: "♥",
      items: [
        "Women's Empowerment",
        "90% Women Artisans",
        "Women-led Facilities",
        "Female Leadership Opportunities",
        "Economic Independence For Women",
        "Community Transformation"
      ]
    }
  ];

  // Refs for scrolling
  const row1Ref = React.useRef(null);
  const row2Ref = React.useRef(null);

  // Scroll Handler
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300; // Adjust scroll distance
      if (direction === 'left') {
        ref.current.scrollLeft -= scrollAmount;
      } else {
        ref.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <main className="w-full bg-[#FFFEF5]">
      <div className='w-[100vw]' >
        {/* <HeroSection /> */}
        <Hero />
      </div>
      {/* =========================================
          SECTION 2: OUR LEGACY
      ========================================= */}
      <section
       
        className="w-full py-8 px-4 md:px-8 scroll-mt-24"
      >
        <Container>

          <div 
          id="legacy-section"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left Column: Text & CTA */}
            <div className="space-y-10 ">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E9E4B5] flex items-center justify-center">
                  <span className="text-[#666141] text-lg">→</span>
                </div>
                <span className="text-black text-lg font-medium">Our Legacy</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#666141] leading-tight">
                  The Malani Legacy
                </h2>
                <h3 className="text-2xl md:text-3xl text-black font-normal leading-tight">
                  Four Distinguished Decades of Ethical Excellence
                </h3>
              </div>

              <div className="space-y-6 text-black text-sm md:text-base leading-relaxed opacity-90">
                <p>
                  Since our founding in 1981, we have dedicated ourselves to a noble purpose: weaving dreams alongside textiles, nurturing communities, and safeguarding India's magnificent artisan traditions.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-block bg-[#666141] text-[#FFFEF5] px-8 py-4 rounded-full text-base font-medium hover:bg-[#555135] transition-colors shadow-md"
                >
                  See All About Malani Impex →
                </Link>
              </div>
            </div>


            {/* Right Column: Timeline */}
            <div className="relative pt-4 pl-4 md:pl-0">
              {/* Vertical Line */}
              <div className="absolute left-[7px] top-3 bottom-10 w-px bg-[#666141]/30"></div>

              <div className="space-y-12">
                {legacyTimeline.map((item, index) => (
                  <div key={index} className="relative pl-10">
                    {/* Dot */}
                    <div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-[#666141] border-2 border-[#FFFEF5] z-10"></div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h4 className="text-4xl md:text-5xl text-[#666141] font-normal leading-none">
                        {item.year}
                      </h4>
                      <p className="text-black text-base md:text-lg font-medium pt-1">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>
      <section className="w-full py-8 px-4 md:px-8">
        <Container>
          <div className='mt-8' >
            <img src="images/about/about1.jpg" alt="building" />
          </div>
          {/* --- Section: Stats Row --- */}
          <div className="py-8 ">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center md:text-left">

              {/* Stat 1 */}
              <div className="space-y-2 px-4 lg:border-r border-[#666141]/20">
                <h3 className="text-4xl md:text-5xl text-black leading-tight">Since 1981</h3>
                <p className="text-black text-sm md:text-base font-medium">
                  A Legacy Woven in Trust
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2 px-4 lg:border-r border-[#666141]/20">
                <h3 className="text-4xl md:text-5xl text-black leading-tight">90%</h3>
                <p className="text-black text-sm md:text-base font-medium">
                  Women Leading Our Craft Revolution
                </p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-2 px-4 lg:border-r border-[#666141]/20">
                <h3 className="text-4xl md:text-5xl text-black leading-tight">43 Years</h3>
                <p className="text-black text-sm md:text-base font-medium">
                  Of Authentic Heritage & Excellence
                </p>
              </div>

              {/* Stat 4 */}
              <div className="space-y-2 px-4 lg:border-r border-[#666141]/20">
                <h3 className="text-4xl md:text-5xl text-black leading-tight">50+</h3>
                <p className="text-black text-sm md:text-base font-medium">
                  Countries Connected Through Heritage
                </p>
              </div>

              {/* Stat 5 */}
              <div className="space-y-2 px-4">
                <h3 className="text-4xl md:text-5xl text-black leading-tight">10,000+</h3>
                <p className="text-black text-sm md:text-base font-medium">
                  Products Handcrafted Annually
                </p>
              </div>

            </div>
          </div>
        </Container>
      </section>


      {/* =========================================
          SECTION 3: PARTNERS
      ========================================= */}
      <section className="w-full py-8 px-4 md:px-8 border-t border-[#666141]/10">
        <Container>
          <div className="space-y-16">

            {/* Header */}
            <div className="space-y-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E9E4B5] flex items-center justify-center">
                  <span className="text-[#666141] text-lg">→</span>
                </div>
                <span className="text-black text-lg font-medium">Our Partners</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90">
                  Our Distinguished Partners
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
                  Building Ethical Excellence Together
                </h3>
              </div>
            </div>

            {/* Scrolling Rows Container */}
            <div className="space-y-10">

              {/* Row 1 */}
              <div className="relative group">
                {/* Left Button */}
                <button
                  onClick={() => scroll(row1Ref, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-[#666141] hover:bg-[#666141] hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 -ml-4 md:-ml-6"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Scrollable Area */}
                <div
                  ref={row1Ref}
                  className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
                >
                  {partnersRow1.map((partner, index) => (
                    <div
                      key={index}
                      className="min-w-[200px] h-[160px] border border-[#666141]/10 rounded-xl flex items-center justify-center p-8 bg-white hover:border-[#666141]/40 transition-all duration-300 shadow-sm shrink-0"
                    >
                      <div className="relative w-full h-full opacity-100 transition-all duration-300">
                        <Image
                          src={partner.src}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Button */}
                <button
                  onClick={() => scroll(row1Ref, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-[#666141] hover:bg-[#666141] hover:text-white transition-all opacity-0 group-hover:opacity-100 -mr-4 md:-mr-6"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Row 2 */}
              <div className="relative group">
                {/* Left Button */}
                <button
                  onClick={() => scroll(row2Ref, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-[#666141] hover:bg-[#666141] hover:text-white transition-all opacity-0 group-hover:opacity-100 -ml-4 md:-ml-6"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Scrollable Area */}
                <div
                  ref={row2Ref}
                  className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
                >
                  {partnersRow2.map((partner, index) => (
                    <div
                      key={index}
                      className="min-w-[200px] h-[160px] border border-[#666141]/10 rounded-xl flex items-center justify-center p-8 bg-white hover:border-[#666141]/40 transition-all duration-300 shadow-sm shrink-0"
                    >
                      <div className="relative w-full h-full opacity-100 transition-all duration-300">
                        <Image
                          src={partner.src}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Button */}
                <button
                  onClick={() => scroll(row2Ref, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md text-[#666141] hover:bg-[#666141] hover:text-white transition-all opacity-0 group-hover:opacity-100 -mr-4 md:-mr-6"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

            </div>
          </div>
          <HomeTechniquesSection />
          <HomeSeasonsSection />
          {/* --- Documentary / Video Section --- */}
          <div className="mt-20 space-y-5 text-left">
            <div className="space-y-2">
              <h2 className="text-[#666141] text-2xl md:text-3xl font-normal opacity-90">
                Behind the Craft: A Documentary
              </h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-black leading-tight">
                Witness the Skill, Dedication, and Artistry of Our Craftspeople
              </h3>
            </div>

            <div className="max-w-3xl space-y-1">
              <p className="text-black text-sm md:text-base leading-relaxed">
                Step into the world of our remarkable artisans.
              </p>
              <p className="text-black text-sm md:text-base leading-relaxed">
                Through this visual journey, you'll witness the extraordinary skill, unwavering dedication, and breathtaking artistry that goes into every single piece we create.
              </p>
              <p className="text-black text-sm md:text-base leading-relaxed">
                This isn't just manufacturing it's mastery.
              </p>
              <p className="text-black text-sm md:text-base leading-relaxed">
                These aren't just workers they're artists, breadwinners, community leaders, and guardians of ancient traditions.
              </p>
            </div>

            {/* Video Placeholder Box */}
            <div className="w-full aspect-[16/6.5] bg-black/5 mt-8 rounded-sm overflow-hidden relative group cursor-pointer">
              {/* Replace this div with your <video> tag or Youtube Embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
                </div>
              </div>
              {/* Optional: Add an image tag here for the thumbnail */}
              {/* <img src="/path-to-thumbnail.jpg" className="w-full h-full object-cover" /> */}
            </div>

          </div>
          {/*  */}
          {/* --- Section: The Journey of a Thousand Hands --- */}
          <div className="mt-24 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[#666141] text-xl md:text-2xl font-normal opacity-90">
                The Journey of a Thousand Hands
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
                Follow the Complete Journey from Raw Fabric to Finished Product
              </h3>
              <div className="max-w-4xl pt-2">
                <p className="text-black text-sm md:text-base leading-relaxed">
                  Follow the complete journey from raw fabric to finished product, witnessing the skill, dedication, and artistry of our craftspeople. Each stage represents hours of devoted work, generations of inherited knowledge, and the loving care of skilled hands.
                </p>
              </div>
            </div>

            {/* Image Grid (3 Images) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {[
                '/images/empowerment/empowerment1.jpg',
                '/images/empowerment/empowerment2.jpg',
                '/images/empowerment/empowerment3.jpg'
              ].map((src, index) => (
                <div key={index} className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src={src}
                    alt={`Artisan Journey ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* --- Section: Biodegradable Packaging --- */}
          <div className="pt-20 border-t border-[#666141]/20">

            {/* Header */}
            <div className="text-center mb-16 space-y-4">
              <span className="text-[#666141] text-xl md:text-2xl font-normal opacity-90 block">
                Biodegradable Packaging
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
                We Use "Plastic" But Not Like You - Think
              </h2>
              <p className="text-black text-sm md:text-base leading-relaxed pt-2">
                At Malani Impex, environmental responsibility extends to every detail, including packaging.
              </p>
            </div>

            {/* The Truth About Our Bags Header */}
            <div className="text-center mb-12">
              <h3 className="text-[#666141] text-xl md:text-2xl font-normal opacity-90">
                The Truth About Our Bags
              </h3>
            </div>

            {/* 4-Column Icons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {packagingData.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-6 px-4">
                  {/* Icon */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Content */}
                  <div className="space-y-3">
                    <h4 className="text-xl text-black font-normal leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-black text-sm leading-relaxed opacity-90">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Split Section (Why This Matters / How to Dispose) */}
            <div className="border-t border-[#666141]/20 pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                {/* Left: Why This Matters */}
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl text-black leading-tight">
                    Why This Matters
                  </h3>
                  <div className="space-y-4 text-black text-sm md:text-base leading-relaxed opacity-90">
                    <p>
                      We refuse to compromise environmental integrity for convenience. Traditional plastic harms our oceans, wildlife, and ecosystems for generations.
                    </p>
                    <p>
                      Our plant-based alternative protects your beautiful textiles during transit while protecting our precious planet forever.
                    </p>
                  </div>
                </div>

                {/* Right: How to Dispose */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  {/* Dispose Icon */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <img
                      src="/images/about/aboutIcon14.png"
                      alt="Dispose Responsibly Icon"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl text-black leading-tight">
                      How to Dispose Responsibly
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Add to your home compost bin",
                        "Include in municipal composting collection",
                        "If composting isn't available, dispose in regular waste knowing it will biodegrade naturally"
                      ].map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-black opacity-90">
                          <span className="font-bold mt-1.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>


          </div>
        </Container>
      </section>
      {/* --- Section: Banner --- */}
      <div className="w-full bg-[#666141] py-16 px-4 my-20">
        <div className="mx-auto text-center">
          <h2 className="text-[#FFFEF5] text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            Because Protecting Earth Is As Important As Empowering Artisans.
          </h2>
        </div>
      </div>
      <section>
        <Container>
          <EthicalFoundation />
        </Container>
      </section>
    </main>
  );
};

export default HomePage;