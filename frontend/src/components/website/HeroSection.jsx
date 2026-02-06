"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
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

    return (
        <section className="w-full min-h-[80vh] lg:h-screen flex flex-col lg:flex-row overflow-hidden bg-[#FFFEF5]">

            {/* =========================================
          LEFT: SLIDER SECTION (60% Width)
      ========================================= */}
            <div className="relative w-full lg:w-[40%] h-[89vh] bg-[#EBEBEB]">

                {/* Slider Image */}
                <div className="relative w-full h-full transition-opacity duration-500">
                    {/* Replace with your actual image paths */}
                    <img
                        src={slides[currentSlide]}
                        alt="Malani Impex Collection"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/5"></div>
                </div>

                {/* "malani" Text Overlay */}
                {/* Positioned absolute top-right of this container to visually connect with "impex" */}
                <div className="absolute top-8 right-0 lg:top-5 z-20 translate-x-[16%] lg:translate-x-[-1vw]">
                    <h1 className="text-white text-[15vw] lg:text-[10vw] leading-none tracking-tighter select-none">
                        malani
                    </h1>
                </div>

                {/* Left Arrow Button (On Image) */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#E9E4B5] flex items-center justify-center hover:scale-110 transition-transform duration-300 text-[#666141] text-xl shadow-md z-30 cursor-pointer"
                >
                    ←
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'w-8 bg-[#4a462f]' : 'w-1.5 bg-[#4a462f]/40'}`}
                        ></div>
                    ))}
                </div>
                {/* Right Arrow (Floating near the split) */}
                <button
                    onClick={nextSlide}
                    className="absolute -left-12 lg:left-[41vw] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#E9E4B5] flex items-center justify-center hover:scale-110 transition-transform duration-300 text-[#666141] text-xl shadow-md z-30 cursor-pointer hidden lg:flex"
                >
                    →
                </button>
            </div>


            {/* =========================================
          RIGHT: CONTENT SECTION (40% Width)
      ========================================= */}
            <div className="w-full lg:w-[40%] flex flex-col px-6 py-12 lg:px-2 lg:py-5 relative z-10 justify-between">

                {/* Top: "impex" Text & Right Arrow */}
                <div className="relative mb-8 lg:mb-0">
                    {/* "impex" aligns with "malani" */}
                    <div className="pl-4 lg:pl-2 pt-0 lg:pt-0">
                        <h1 className="text-[#666141] text-[15vw] lg:text-[10vw] leading-none tracking-tighter select-none">
                            impex
                        </h1>
                    </div>


                </div>

                {/* Middle: Main Text Content */}
                <div className="flex-1 flex flex-col justify-center space-y-8 pl-2 lg:pl-4">
                    <div className="space-y-3">
                        <h2 className="text-3xl lg:text-4xl text-black font-normal leading-tight">
                            Where Heritage Meets Heart
                        </h2>
                        <h3 className="text-xl lg:text-2xl text-black font-normal opacity-90">
                            Celebrating Indian Artisans Since 1981
                        </h3>
                    </div>

                    <p className="text-black text-sm lg:text-base leading-relaxed opacity-80 max-w-md">
                        Immerse yourself in the world of exquisitely handcrafted textiles that honor centuries-old heritage, champion women's empowerment, and embody sustainable luxury.
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2">
                        <Link
                            href="/artisans"
                            className="inline-block bg-[#666141] text-[#FFFEF5] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#555135] transition-colors shadow-md"
                        >
                            Discover Our Artisans →
                        </Link>
                    </div>
                </div>

                {/* Bottom: Artisan Thumbnails */}
                <div className="mt-12 lg:mt-auto pt-8 flex gap-4 pl-2 lg:pl-4">
                    {[1, 2, 3].map((item, i) => (
                        <div key={i} className="relative w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 bg-gray-200 overflow-hidden rounded-sm">
                            {/* Replace with artisan images */}
                            <Image
                                src={`/images/home/artisan${i + 1}.jpg`}
                                alt="Artisan Craft Detail"
                                fill
                                className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HeroSection;