"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/website/Container';

const HomeSeasonsSection = () => {

    // --- DATA: Seasons (Same structure as AllSeasonsPage) ---
    const seasonsData = [
        {
            id: "summer",
            title: "Summer Collection",
            subtitle: "Light, Breathable, Exceptionally Beautiful",
            products: [
                { img: "/images/seasons/seasonsP1.png" } // Using 1st product only
            ]
        },
        {
            id: "festival",
            title: "Festival Collection",
            subtitle: "Celebration Woven with Joy and Splendor",
            products: [
                { img: "/images/seasons/seasonsP2.png" }
            ]
        },
        {
            id: "winter",
            title: "Winter Collection",
            subtitle: "Warmth Lovingly Woven with Expert Care",
            products: [
                { img: "/images/seasons/seasonsP3.png" }
            ]
        },
        {
            id: "classics",
            title: "Year-Round Classics",
            subtitle: "Timeless Elegance for Every Season",
            products: [
                { img: "/images/seasons/seasonsP4.png" }
            ]
        }
    ];

    return (
        <section className="w-full bg-[#FFFEF5] py-8 px-4 md:px-8 border-t border-[#666141]/10">
            <Container>
                <div className="max-w-[1400px] mx-auto space-y-16">

                    {/* --- Header --- */}
                    <div className="space-y-8 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#E9E4B5] flex items-center justify-center">
                                <span className="text-[#666141] text-lg">→</span>
                            </div>
                            <span className="text-black text-lg font-medium">Our Collections</span>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-4xl text-[#666141] font-normal opacity-90">
                                Textiles for Every Moment
                            </h2>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
                                Seasons of Malani Impex
                            </h3>
                        </div>
                    </div>

                    {/* --- Collections Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {seasonsData.map((season) => {
                            // Extract the first product image
                            const coverImage = season.products[0].img;

                            return (
                                <Link
                                    key={season.id}
                                    href={`/seasons/${season.id}`}
                                    className="group block space-y-6"
                                >
                                    {/* Image Card */}
                                    <div className="relative aspect-[4/4] w-full overflow-hidden rounded-sm bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                                        <img
                                            src={coverImage}
                                            alt={season.title}
                                            fill
                                            className="object-contain transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Overlay Gradient (Optional for better text visibility if text was on image) */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="space-y-2 text-center md:text-left">
                                        <h4 className="text-2xl text-black font-normal group-hover:text-[#666141] transition-colors duration-300">
                                            {season.title}
                                        </h4>
                                        <p className="text-sm text-black opacity-70 line-clamp-2 leading-relaxed">
                                            {season.subtitle}
                                        </p>
                                        <div className="pt-2">
                                            <span className="inline-block text-sm font-medium text-[#666141] border-b border-[#666141] pb-0.5 group-hover:border-transparent transition-all">
                                                Explore Collection
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* --- Bottom CTA (Optional) --- */}
                    <div className="text-center pt-8">
                        <Link
                            href="/seasons"
                            className="inline-block bg-[#666141] text-[#FFFEF5] px-10 py-4 rounded-full text-base font-medium hover:bg-[#555135] transition-colors shadow-md"
                        >
                            View All Collections →
                        </Link>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default HomeSeasonsSection;