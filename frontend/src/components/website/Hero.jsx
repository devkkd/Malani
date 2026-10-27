"use client";

import React, { useState } from "react";
import Image from "next/image";

const slides = [
    "/images/home/slider1.jpg",
    "/images/slider-1.svg",
    "/images/slider-2.svg",
];

export default function Hero() {
    const [active, setActive] = useState(0);

    const prevSlide = () => {
        setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    // --- SCROLL FUNCTION ---
    const handleScrollDown = () => {
        const nextSection = document.getElementById("legacy-section");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="w-full md:h-[600px] bg-[#FFFEF5] overflow-hidden">
            <div className="max-w-[1550px] mx-auto h-full flex flex-col lg:flex-row overflow-hidden relative">
                
                {/* ================= SLIDER ================= */}
                <div className="relative w-full h-[50vh] lg:w-[37%] lg:h-full overflow-hidden flex-shrink-0">
                    {/* Preload all slide images, show only active one */}
                    {slides.map((src, i) => (
                        <Image
                            key={src}
                            src={src}
                            alt={i === 0 ? "Malani Impex handcrafted textiles" : `Slide ${i + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 37vw"
                            className={`object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
                            priority={i === 0}
                            loading={i === 0 ? "eager" : "lazy"}
                            quality={85}
                        />
                    ))}
                
                    {/* Previous Arrow - Centered Vertically */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full text-[#6b6a45] flex items-center justify-center transition-all"
                        aria-label="Previous slide"
                    >
                        <Image src="/images/left.png" alt="Previous" width={40} height={40} />
                    </button>

                    {/* Next Arrow - Centered Vertically */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full text-[#6b6a45] flex items-center justify-center transition-all"
                        aria-label="Next slide"
                    >
                        <Image src="/images/right.png" alt="Next" width={40} height={40} />
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-1 rounded-full transition-all ${
                                    active === i ? "w-8 bg-[#6b6a45]" : "w-2 bg-[#6b6a45]/30"
                                }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* "malani" text overlay on slider - Desktop only */}
                    <div className="hidden lg:block absolute top-5 right-4 z-20">
                        <h1 className="text-8xl xl:text-9xl font-medium tracking-tight text-white leading-none">
                            malani
                        </h1>
                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="flex-1 h-full px-6 md:px-10 py-12 lg:px-3 lg:py-10 flex flex-col justify-between overflow-hidden">

                    {/* Top Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                        <div className="max-w-md">
                            {/* Mobile heading */}
                            <p className="lg:hidden text-5xl tracking-tight leading-none">
                                <span className="text-[#6b6a45]">malani</span>
                                <span className="ml-4 text-[#6b6a45]">impex</span>
                            </p>
                            
                            {/* Desktop "impex" only */}
                            <p className="hidden lg:block text-8xl xl:text-9xl font-medium tracking-tight text-[#6b6a45] leading-none mb-10 -mt-5">
                                impex
                            </p>
                            
                            <div className="space-y-4">
                                <p className="text-2xl md:text-3xl text-neutral-800 font-medium leading-tight">
                                    Where Heritage Meets Heart <br />
                                    Celebrating Indian Artisans Since 1981
                                </p>
                                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                                    Immerse yourself in the world of exquisitely handcrafted textiles that honor centuries-old heritage, champion women's empowerment, and embody sustainable luxury.
                                </p>
                            </div>
                        </div>

                        {/* Smaller portrait image on the right — desktop xl only */}
                        <div className="hidden xl:block w-48 h-64 flex-shrink-0 relative">
                            <Image
                                src="/images/home/slider2.jpg"
                                alt="Handcrafted textile detail"
                                fill
                                sizes="192px"
                                className="object-cover rounded-sm shadow-lg"
                                loading="lazy"
                                quality={80}
                            />
                        </div>
                    </div>

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        <div className="col-span-2 lg:col-span-1">
                            <p className="text-sm text-neutral-500 leading-relaxed border-l border-neutral-300 pl-4">
                                Each thread weaves together stories of dignity, mastery, and tradition.
                            </p>
                            
                            {/* --- BUTTON WITH SCROLL FUNCTION --- */}
                            <button
                                onClick={handleScrollDown}
                                className="inline-block bg-[#666141] mt-3 text-[#FFFEF5] p-3.5 rounded-full text-sm font-medium hover:bg-[#555135] transition-colors shadow-md cursor-pointer"
                            >
                                Discover Our Artisans →
                            </button>
                        </div>

                        <div className="h-32 lg:h-44 overflow-hidden relative transition duration-500">
                            <Image
                                src="/images/home/home3.png"
                                alt="Artisan at work"
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                                loading="lazy"
                                quality={80}
                            />
                        </div>
                        <div className="h-32 lg:h-44 overflow-hidden relative transition duration-500">
                            <Image
                                src="/images/home/home4.png"
                                alt="Craft detail"
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                                loading="lazy"
                                quality={80}
                            />
                        </div>
                        <div className="h-32 lg:h-44 overflow-hidden relative transition duration-500">
                            <Image
                                src="/images/home/home5.png"
                                alt="Textile detail"
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                                loading="lazy"
                                quality={80}
                            />
                        </div>
                        {/* Mobile-only 4th image — only rendered on small screens via JS to avoid downloading on desktop */}
                        <div className="h-32 overflow-hidden relative transition duration-500 sm:hidden">
                            <Image
                                src="/images/home/slider3.jpg"
                                alt="Textile showcase"
                                fill
                                sizes="50vw"
                                className="object-cover"
                                loading="lazy"
                                quality={80}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
