"use client";

import React, { useState } from "react";

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
                    <img
                        src={slides[active]}
                        alt="Slide"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                
                    {/* Previous Arrow - Centered Vertically */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full text-[#6b6a45] flex items-center justify-center transition-all"
                        aria-label="Previous slide"
                    >
                        <img src="/images/left.png" alt="Previous" />
                    </button>

                    {/* Next Arrow - Centered Vertically */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full text-[#6b6a45] flex items-center justify-center transition-all"
                        aria-label="Next slide"
                    >
                        <img src="/images/right.png" alt="Next" />
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
                            <h1 className="lg:hidden text-5xl tracking-tight leading-none">
                                <span className="text-[#6b6a45]">malani</span>
                                <span className="ml-4 text-[#6b6a45]">impex</span>
                            </h1>
                            
                            {/* Desktop "impex" only */}
                            <h1 className="hidden lg:block text-8xl xl:text-9xl font-medium tracking-tight text-[#6b6a45] leading-none mb-10 -mt-5">
                                impex
                            </h1>
                            
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

                        {/* Smaller portrait image on the right */}
                        <div className="hidden xl:block w-48 h-64 flex-shrink-0">
                            <img
                                src="/images/home/slider2.jpg"
                                alt="Detail"
                                className="w-full h-full object-cover rounded-sm shadow-lg"
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

                        <div className="h-32 lg:h-44 overflow-hidden  transition duration-500">
                            <img src="/images/home/home3.png" className="w-full h-full object-cover" alt="Artisan" />
                        </div>
                        <div className="h-32 lg:h-44 overflow-hidden transition duration-500">
                            <img src="/images/home/home4.png" className="w-full h-full object-cover" alt="Craft" />
                        </div>
                        <div className="h-32 lg:h-44 overflow-hidden transition duration-500">
                            <img src="/images/home/home5.png" className="w-full h-full object-cover" alt="Detail" />
                        </div>
                        <div className="h-32 lg:h-44 overflow-hidden sm:hidden transition duration-500">
                            <img src="/images/home/slider3.jpg" className="w-full h-full object-cover" alt="Detail" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}