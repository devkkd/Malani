import Image from "next/image";
import Container from "@/components/website/Container";
import { notFound } from "next/navigation";
import ProductCard from "@/components/website/ProductCard";
import productsData from "@/data/productData.json";
import seasonData from "@/data/seasonData.json";
import EthicalFoundation from "@/components/website/EthicalData";

export default async function SeasonPage({ params }) {
    const { season_id } = await params;

    //   console.log(season_id, "sssssss")

    const season = seasonData.find(
        s => String(s.id) === season_id
    );
    if (!season) notFound();

    const products = productsData.filter(
        p => p.season === season_id
    );

    return (
        <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
            <Container>
                <div className="mx-auto">



                    {/* --- SEASONS LOOP --- */}
                    <div className="flex flex-col gap-24">
                        <div key={season.id} className="w-full">

                            {/* 1. Header Row (Title left, Icon right) */}
                            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                                <div className="space-y-3 max-w-4xl">
                                    <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                        {season.title}
                                    </h2>
                                    <h3 className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90">
                                        {season.subtitle}
                                    </h3>
                                    <p className="text-black text-sm md:text-base leading-relaxed pt-2">
                                        {season.description}
                                    </p>
                                </div>
                                {/* Icon */}
                                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                    <img
                                        src={season.icon}
                                        alt={`${season.title} Icon`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            {/* 2. Features Grid (Beige Background) */}
                            <div className="bg-[#FFFCEA] p-8 md:p-12 rounded-[4px] mb-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                                    {season.features.map((feature, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <h4 className="text-[#666141] text-lg font-medium">
                                                {feature.heading}
                                            </h4>
                                            <ul className="space-y-2">
                                                {feature.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-black">
                                                        <span className="font-bold text-black mt-0.5">✓</span>
                                                        <span className="opacity-90">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {/* --- Header Section --- */}
                    <div className="text-center mt-5 pt-12 mb-16 border-t border-[#666141]/10 space-y-6">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#666141] font-normal tracking-tight">
                            All Seasons Malani Impex
                        </h1>

                        <p className="text-black text-lg md:text-2xl font-normal opacity-90 max-w-5xl mx-auto pt-2">
                            Exquisite Designs for Every Season, Nature-Inspired Textiles for Year-Round Luxurious Comfort
                        </p>
                    </div>

                    {/* --- Split Intro Content Section --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start mt-16 mb-5 pb-16 border-b border-[#666141]/10">

                        {/* Left Column: Heading */}
                        <div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl text-black leading-tight font-normal">
                                Thoughtfully Crafted for Climate, <br className="hidden xl:block" />
                                Lovingly Made for Comfort
                            </h2>
                        </div>

                        {/* Right Column: Paragraph */}
                        <div className="space-y-6 pt-2">
                            <p className="text-black text-sm md:text-base leading-relaxed opacity-90">
                                India's textile wisdom spans countless millennia techniques perfected to harmonize with the natural rhythm of seasons. Discover distinguished collections designed with premium natural materials that breathe gracefully with you, whether you seek refreshing summer coolness or cozy winter warmth.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <EthicalFoundation />
            </Container>
        </section>
    );
}
