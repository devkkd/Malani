"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/website/Container';

const HomeSeasonsSection = () => {
    const [seasonsData, setSeasonsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch seasons from API
    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/seasons`;
                const response = await fetch(apiUrl);
                const result = await response.json();
                
                if (result.success && result.data) {
                    setSeasonsData(result.data);
                }
            } catch (error) {
                console.error('Error fetching seasons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeasons();
    }, []);

    if (loading) {
        return (
            <section className="w-full bg-[#FFFEF5] py-8 px-4 md:px-8 border-t border-[#666141]/10">
                <Container>
                    <div className="text-center py-20">
                        <p className="text-[#666141] text-lg">Loading seasons...</p>
                    </div>
                </Container>
            </section>
        );
    }

    if (!seasonsData.length) {
        return null;
    }

    return (
        <section className="w-full bg-[#FFFEF5] py-8 px-4 md:px-8 border-t border-[#666141]/10">
            <Container>
                <div className="
                space-y-16">

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
                            // Use homeImage for home page display, fallback to icon or show without image
                            const coverImage = season.homeImage?.url || season.icon;

                            return (
                                <Link
                                    key={season._id}
                                    href={`/seasons/${season.slug}`}
                                    className="group block space-y-6"
                                >
                                    {/* Image Card */}
                                    {coverImage ? (
                                        <div className="relative aspect-[4/4] w-full overflow-hidden rounded-sm bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                                            <Image
                                                src={coverImage}
                                                alt={season.homeImage?.alt || season.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-contain transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                        </div>
                                    ) : (
                                        <div className="relative aspect-[4/4] w-full overflow-hidden rounded-sm bg-gradient-to-br from-[#E9E4B5] to-[#d9d4a5] shadow-sm transition-shadow duration-300 group-hover:shadow-md flex items-center justify-center">
                                            <div className="text-center p-6">
                                                <div className="text-6xl mb-2">🖼️</div>
                                                <p className="text-[#666141] text-sm font-medium">No Image</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Text Content */}
                                    <div className="space-y-2 text-center md:text-left">
                                        <h4 className="text-2xl text-black font-normal group-hover:text-[#666141] transition-colors duration-300">
                                            {season.title || season.name}
                                        </h4>
                                        <p className="text-sm text-black opacity-70 line-clamp-2 leading-relaxed">
                                            {season.subtitle || season.description}
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