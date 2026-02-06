"use client";
import Container from '@/components/website/Container';
import EthicalFoundation from '@/components/website/EthicalData';
import Image from 'next/image';

const CertificationsPage = () => {
    return (
        <section className="w-full bg-[#FFFEF5] py-9 px-4 md:px-8">
            <Container>
                <div className=" mx-auto">

                    {/* --- Header Section --- */}
                    <div className="text-center mb-20 space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
                            Certifications Malani Impex
                        </h1>

                        <div className="space-y-1 pt-3">
                            <p className="text-black text-2xl font-medium">Our Distinguished Certifications</p>
                            <p className="text-black text-2xl font-medium">Trusted Standards, Verified Excellence</p>
                        </div>

                        <div className="pt-3 space-y-4 max-w-4xl mx-auto">
                            <h2 className="text-[#666141] text-2xl md:text-4xl font-normal">
                                Transparency You Can Trust Completely
                            </h2>
                            <p className="text-sm md:text-base text-black leading-relaxed max-w-3xl mx-auto">
                                At Malani Impex, our commitments extend far beyond words they are thoroughly verified by internationally recognized certification bodies. Every certification represents our unwavering dedication to ethical practices, environmental responsibility, and artisan welfare.
                            </p>
                        </div>
                    </div>

                    {/* --- Fair Trade Section --- */}
                    <div className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">

                            {/* Left Text */}
                            <div className="space-y-4">
                                <span className="text-[#666141] text-3xl font-medium block mb-2">
                                    Fair Trade Certified
                                </span>
                                <h3 className="text-4xl md:text-5xl text-black leading-tight">
                                    Justice and Dignity in Every Transaction
                                </h3>
                                <p className="text-xs md:text-sm text-black leading-relaxed pt-2">
                                    We proudly meet rigorous Fair Trade standards ensuring fair compensation, dignified working conditions, and meaningful community development.
                                </p>
                            </div>

                            {/* Right List */}
                            <div className="space-y-6 pt-2">
                                <h4 className="text-[#666141] text-lg font-medium opacity-80">
                                    What This Distinguished Certification Means
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Living wages for all valued artisans",
                                        "Democratic, respectful decision-making",
                                        "Safe, healthy working environments",
                                        "Comprehensive environmental sustainability",
                                        "Meaningful community development programs"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-black">
                                            <span className="text-black font-bold">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Trophies Images */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
                            <div className="relative w-64 h-48 md:w-80 md:h-64">
                                <Image
                                    src="/images/certificate/trophy1.png"
                                    alt="Export Award Trophy"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="relative w-64 h-48 md:w-80 md:h-64">
                                <Image
                                    src="/images/certificate/trophy2.png"
                                    alt="Top Export Award"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- Bottom Gallery Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            "/images/certificate/certi1.jpg",
                            "/images/certificate/certi2.jpg",
                            "/images/certificate/certi3.jpg",
                        ].map((src, index) => (
                            <div
                                key={index}
                                className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-sm"
                            >
                                <Image
                                    src={src}
                                    alt={`Award Ceremony ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                    {/* --- GOTS Certified Section --- */}
                    <div className=" pt-12 md:pt-20">
                        {/* Text Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">

                            {/* Left Column: Headings & Description */}
                            <div className="space-y-4">
                                <span className="text-[#666141] text-3xl font-medium block mb-2">
                                    GOTS Certified
                                </span>
                                <h3 className="text-4xl md:text-5xl text-black leading-tight">
                                    Global Organic Textile Standard Excellence
                                </h3>
                                <p className="text-xs md:text-sm text-black leading-relaxed pt-2">
                                    Our organic cotton products proudly meet the world's most rigorous textile processing standard for organic fibers.
                                </p>
                            </div>

                            {/* Right Column: Checklist */}
                            <div className="space-y-6 pt-2">
                                <h4 className="text-[#666141] text-lg font-medium opacity-80">
                                    What This Distinguished Certification Means
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "100% certified organic materials",
                                        "Absolutely no toxic chemicals",
                                        "Comprehensive environmental management",
                                        "Strict social criteria compliance"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-black">
                                            <span className="text-black font-bold">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Images Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image 1 */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-sm">
                                <Image
                                    src="/images/certificate/certi4.jpg"
                                    alt="GOTS Certification Event"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Image 2 */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-sm">
                                <Image
                                    src="/images/certificate/certi5.jpg"
                                    alt="Award Presentation"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- Women's Empowerment Section --- */}
                    <div className=" pt-12 md:pt-20">
                        {/* Text Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-12">

                            {/* Left Column: Headings & Description */}
                            <div className="space-y-4">
                                <span className="text-[#666141] text-3xl font-medium block mb-2">
                                    Women's Empowerment Seal
                                </span>
                                <h3 className="text-4xl md:text-5xl text-black leading-tight">
                                    Proudly Women-Led, Verified Meaningful Impact
                                </h3>
                                <p className="text-xs md:text-sm text-black leading-relaxed pt-2">
                                    Honored certification for our leadership in women's economic empowerment and genuine gender equality.
                                </p>
                            </div>

                            {/* Right Column: Checklist */}
                            <div className="space-y-6 pt-2">
                                <h4 className="text-[#666141] text-lg font-medium opacity-80">
                                    What This Distinguished Recognition Celebrates
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        "Women in respected leadership positions",
                                        "Fair compensation for female artisans",
                                        "Safe, supportive work environments",
                                        "Comprehensive skills training and advancement"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-black">
                                            <span className="text-black font-bold">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Images Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-sm">
                                <Image
                                    src="/images/certificate/certi6.jpg"
                                    alt="Women Empowerment Workshop"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-sm">
                                <Image
                                    src="/images/certificate/certi7.jpg"
                                    alt="Artisans working"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- SEDEX Certified Section --- */}
                    <div className="mb-20 pt-12 md:pt-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                            {/* Left Content: Text & Checklist */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-[#666141] text-3xl font-medium block mb-2">
                                        SEDEX Certified
                                    </span>
                                    <h3 className="text-4xl md:text-5xl text-black leading-tight">
                                        Ethical Supply Chain Excellence
                                    </h3>
                                    <p className="text-xs md:text-sm text-black leading-relaxed pt-2">
                                        We are proud members of SEDEX (Supplier Ethical Data Exchange), demonstrating our steadfast commitment to responsible business practices.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[#666141] text-lg font-medium opacity-80">
                                        What This Distinguished Certification Means
                                    </h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Completely transparent supply chain",
                                            "Regular, thorough ethical audits",
                                            "Unwavering labor rights protection",
                                            "Comprehensive health and safety compliance"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-black">
                                                <span className="text-black font-bold">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Image: Certificate */}
                            <div className="relative w-full flex justify-center lg:justify-end">
                                <div className="relative aspect-[3/4] w-[50%] max-w-sm overflow-hidden rounded-sm bg-white p-2">
                                    <Image
                                        src="/images/certificate/certi8.png"
                                        alt="SEDEX Certificate"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* --- No Child Labor Certification Section --- */}
                    <div className="mb-20 pt-12 border-t border-[#666141]/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center pt-12">

                            {/* Left Content: Text & Checklist */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-[#666141] text-3xl font-medium block mb-2">
                                        No Child Labor Certification
                                    </span>
                                    <h3 className="text-4xl md:text-5xl text-black leading-tight">
                                        Zero Tolerance, Always and Forever
                                    </h3>
                                    <div className="text-xs md:text-sm text-black leading-relaxed pt-2 space-y-1">
                                        <p className="font-medium">Independently verified:</p>
                                        <p>Malani Impex maintains absolute zero child labor across all production facilities.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[#666141] text-lg font-medium opacity-80">
                                        Our Rigorous Verification Process
                                    </h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Regular, comprehensive facility audits",
                                            "Strict age verification protocols",
                                            "Educational support for artisan children",
                                            "Meaningful community monitoring"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-black">
                                                <span className="text-black font-bold">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Image: Certificate */}
                            <div className="relative w-full flex justify-center lg:justify-end">
                                <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-sm bg-white p-2 shadow-sm border border-gray-100">
                                    <Image
                                        src="/images/certificate/certi9.png"
                                        alt="No Child Labor Certificate"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- AZO-Free Certification Section --- */}
                    <div className="mb-20 pt-12 border-t border-[#666141]/10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center pt-12">

                            {/* Left Content: Text & Checklist */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-[#666141] text-3xl font-medium block mb-2">
                                        AZO-Free Certification
                                    </span>
                                    <h3 className="text-4xl md:text-5xl text-black leading-tight">
                                        The Safest Dyes for Everyone We Serve
                                    </h3>
                                    <p className="text-xs md:text-sm text-black leading-relaxed pt-2">
                                        All our dyes are thoroughly tested and certified AZO-free, ensuring complete safety for your skin and our cherished artisans.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[#666141] text-lg font-medium opacity-80">
                                        Why This Truly Matters
                                    </h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Absolutely no toxic chemicals",
                                            "Safe for even the most sensitive skin",
                                            "Environmentally responsible practices",
                                            "Complete artisan health protection"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-black">
                                                <span className="text-black font-bold">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Image: Certificate */}
                            <div className="relative w-full flex justify-center lg:justify-end">
                                {/* Removed bg-white, p-2, shadow-sm, border, and rounded-sm to remove the white box effect */}
                                <div className="relative aspect-[3/4] w-[60%] max-w-sm overflow-hidden">
                                    <Image
                                        src="/images/certificate/certi10.png"
                                        alt="AZO Free Certificate"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
            <Container>
                <EthicalFoundation />
            </Container>
        </section>
    );
};

export default CertificationsPage;