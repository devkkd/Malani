"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/website/Container";
import { notFound } from "next/navigation";
import ProductCard from "@/components/website/ProductCard";
import { Search } from "lucide-react";
import EthicalFoundation from "@/components/website/EthicalData";
import { use } from "react";

export default function TechniquePage({ params }) {
    const { technique_id } = use(params);
    const [technique, setTechnique] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch technique by slug
                const techRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques`);
                const techData = await techRes.json();
                
                if (techData.success) {
                    const foundTechnique = techData.data.find(t => t.slug === technique_id);
                    
                    if (!foundTechnique) {
                        notFound();
                        return;
                    }
                    
                    setTechnique(foundTechnique);

                    // Fetch products for this technique
                    const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?technique=${foundTechnique._id}`);
                    const productsData = await productsRes.json();
                    
                    if (productsData.success) {
                        setProducts(productsData.data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch technique data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [technique_id]);

    if (loading) {
        return (
            <section className="w-full bg-[#FFFEF5] py-10 px-4 md:px-8">
                <Container>
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666141] mx-auto"></div>
                        <p className="text-[#666141] mt-4">Loading...</p>
                    </div>
                </Container>
            </section>
        );
    }

    if (!technique) {
        notFound();
    }

    return (
        <section className="w-full bg-[#FFFEF5] py-10 px-4 md:px-8">
            <Container>
                <div className="mx-auto">
                    {/* --- Top Section: Title & Description --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 mb-16 ">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl text-black leading-tight">
                                {technique.name}
                            </h1>
                            {technique.title && (
                                <p className="text-[#666141] text-2xl md:text-3xl font-normal opacity-90">
                                    {technique.title}
                                </p>
                            )}
                        </div>
                        <div className="space-y-6">
                            {technique.description && (
                                <p className="text-black text-sm md:text-base leading-relaxed opacity-90">
                                    {technique.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* --- Middle Section: Process & Stats --- */}
                    {(technique.meticulousProcess?.filter(item => item && item.trim()).length > 0 || technique.timeInvestment || technique.masterArtisans) && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 mb-16">
                            {technique.meticulousProcess?.filter(item => item && item.trim()).length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-black text-2xl font-normal">
                                        Meticulous Process
                                    </h3>
                                    <ul className="space-y-2">
                                        {technique.meticulousProcess.filter(item => item && item.trim()).map((item, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm md:text-base text-black opacity-90">
                                                <span className="font-bold text-black mt-0.5">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="flex gap-16 pt-2">
                                {technique.timeInvestment && technique.timeInvestment.trim() && (
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 text-[#666141] border border-[#666141] rounded-full flex items-center justify-center">
                                            <span className="text-xl">🕒</span>
                                        </div>
                                        <div>
                                            <h4 className="text-black text-xl font-normal mb-1">
                                                Time Investment
                                            </h4>
                                            <p className="text-sm text-black opacity-80">
                                                {technique.timeInvestment}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {technique.masterArtisans && technique.masterArtisans.trim() && (
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 text-[#666141] border border-[#666141] rounded-full flex items-center justify-center">
                                            <span className="text-xl">▦</span>
                                        </div>
                                        <div>
                                            <h4 className="text-black text-xl font-normal mb-1">
                                                Master Artisans
                                            </h4>
                                            <p className="text-sm text-black opacity-80">
                                                {technique.masterArtisans}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- Bottom Section: Images --- */}
                    {technique.images?.length > 0 && technique.images.some(img => img.url) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                            {technique.images.filter(img => img.url).map((image, idx) => (
                                <div key={idx} className="relative aspect-[5/3] w-full bg-gray-100 overflow-hidden">
                                    <Image
                                        src={image.url}
                                        alt={image.alt || `${technique.name} detail ${idx + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* --- PRODUCTS HEADER & SEARCH --- */}
                    <div className="border-t border-[#666141]/10 pt-16 mt-16">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl text-black font-normal">
                                    {technique.name} Products
                                </h2>
                                <p className="text-gray-500 mt-2">Explore our collection handcrafted using this technique.</p>
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full md:w-80">
                                <input 
                                    type="text" 
                                    placeholder="Search Product" 
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#666141]/20 rounded-full text-sm focus:outline-none focus:border-[#666141] transition-colors"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div key={product._id} className="flex justify-center">
                                         <ProductCard product={product} priority={index < 4} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                                    No products found for this technique yet.
                                </div>
                            )}
                        </div>
                    </div>


                    {/* --- Footer Text Section (Moved to bottom) --- */}
                    <div className="mt-32 pt-16 pb-16 border-t border-b border-[#666141]/10">
                        <div className="text-center mb-16 space-y-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#666141] font-normal tracking-tight">
                                Techniques Malani Impex
                            </h1>
                            <p className="text-black text-lg md:text-2xl font-normal opacity-90 max-w-4xl mx-auto pt-2">
                                The Masterful Art Behind Every Thread Ancient Techniques, Enduring Impact
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
                            <div>
                                <h2 className="text-4xl md:text-5xl text-black leading-tight font-normal">
                                    Craftsmanship Honored <br className="hidden lg:block" />
                                    Across Centuries
                                </h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-black text-sm md:text-base leading-relaxed opacity-90">
                                    Each distinguished piece from Malani Impex stands as a beautiful testament to India's magnificent textile heritage.
                                </p>
                                <p className="text-black text-sm md:text-base leading-relaxed opacity-90">
                                    Our skilled artisans master techniques lovingly passed down through countless generations techniques requiring remarkable patience, exceptional skill, and an intimate understanding of natural materials.
                                </p>
                                <p className="text-black text-sm md:text-base leading-relaxed opacity-90">
                                    We warmly invite you to discover the ancient arts that render every product utterly unique.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
            <Container>
                <EthicalFoundation/>
            </Container>
        </section>
    );
}