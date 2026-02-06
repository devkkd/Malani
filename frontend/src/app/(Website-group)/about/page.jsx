"use client";
import Container from '@/components/website/Container';
import EthicalFoundation from '@/components/website/EthicalData';

const AboutPage = () => {
    const timelineData = [
        {
            year: "1981",
            title: "Our Foundation of Excellence",
            description:
                "The Malani family establishes the enterprise with 10 dedicated artisans and an unwavering commitment to fair compensation, laying the groundwork for ethical craftsmanship.",
        },
        {
            year: "1995",
            title: "Expanding Horizons & Mastering New Crafts",
            description:
                "Thoughtful expansion to multiple artisan communities across Rajasthan, introducing new traditional techniques while steadfastly maintaining ethical practices and artisan welfare.",
        },
        {
            year: "2005",
            title: "Going Global with Integrity",
            description:
                "Indian craftsmanship crosses borders as we establish our first international partnerships, bringing Jaipur's textile heritage to discerning markets worldwide while staying rooted in our values.",
        },
        {
            year: "2015",
            title: "Empowerment Era: Women Lead the Way",
            description:
                "Launch of women-only workshops creates dignified, safe spaces where 200+ female artisans flourish, transforming communities through economic independence and skill mastery.",
        },
        {
            year: "2025",
            title: "Legacy Secured Through Innovation",
            description:
                "Introduction of biodegradable packaging and a completely transparent supply chain ensures 11+ traditional crafts thrive in harmony with modern sustainability, preserving heritage for future generations.",
        },
    ];
    // --- DATA: What Guides Our Every Step ---
    const guidingValues = [
        {
            img: "/images/about/about4.jpg",
            title: "Accessible Excellence",
            text: "Beautiful, masterfully handcrafted textiles thoughtfully accessible to conscious consumers worldwide."
        },
        {
            img: "/images/about/about5.jpg",
            title: "Thoughtfully Curated",
            text: "Every distinguished piece is carefully selected and crafted with meticulous attention to detail."
        },
        {
            img: "/images/about/about6.jpg",
            title: "Sustainably Conscious",
            text: "Earth-friendly materials, time-honored techniques, and zero-waste practices guide our every decision."
        },
        {
            img: "/images/about/about7.jpg",
            title: "Honorably Responsible",
            text: "Fair compensation, dignified conditions, and transparent operations always and without compromise."
        },
        {
            img: "/images/about/about8.jpg",
            title: "Proudly Family-Owned",
            text: "Three generations of the Malani family, lovingly preserving traditions and unwavering integrity."
        },
        {
            img: "/images/about/about9.jpg",
            title: "Distinguished Women-Led",
            text: "Led by women, empowering women, celebrating women's remarkable achievements."
        },
        {
            img: "/images/about/about10.jpg",
            title: "Authentically Designed",
            text: "Deeply rooted in Indian heritage, lovingly crafted by masterful Indian hands."
        },
        {
            img: "/images/about/about11.jpg",
            title: "Exquisitely Handmade",
            text: "Every piece carries the exceptional skill, devoted care, and beautiful soul of our artisan partners."
        }
    ];
    // --- DATA: Our Promise ---
    const promiseData = [
        {
            icon: "/images/about/aboutIcon1.png",
            text: "No Shrink, No Fade - Our Enduring Promise."
        },
        {
            icon: "/images/about/aboutIcon2.png",
            text: "AZO-Free Dyes - The Safest Choice for Your Cherished Skin"
        },
        {
            icon: "/images/about/aboutIcon3.png",
            text: "Lovingly Handcrafted by Master Indian Artisans"
        },
        {
            icon: "/images/about/aboutIcon4.png",
            text: "Small-Scale, Sustainable Excellence"
        },
        {
            icon: "/images/about/aboutIcon5.png",
            text: "Completely Transparent Supply Chain"
        }
    ];
    // --- DATA: Crafted with Conscience ---
    const craftedData = [
        {
            icon: "/images/about/aboutIcon6.png",
            title: "Earth-Conscious Luxury",
            text: "Each distinguished piece embraces sustainable materials and AZO-free dyes lovingly safe for your skin and thoughtfully kind to our precious planet."
        },
        {
            icon: "/images/about/aboutIcon7.png",
            title: "Artisan-Centered Excellence",
            text: "We honor every artisan with fair compensation, prompt payment, and dignified working conditions. This is our sacred promise."
        },
        {
            icon: "/images/about/aboutIcon8.png",
            title: "Thoughtful Small-Batch Creation",
            text: "We believe in quality over quantity. Each piece is meticulously crafted in carefully limited collections, ensuring exceptional attention to detail."
        },
        {
            icon: "/images/about/aboutIcon9.png",
            title: "Women's Empowerment at Heart",
            text: "We are deeply committed to empowering women artisans, supporting their journey toward financial independence and community transformation."
        }
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

    return (
        <>
            <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
                <Container>
                    <div className="mx-auto">

                        {/* --- Header Section --- */}
                        <div className="text-center mb-8 space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
                                About Malani Impex
                            </h1>

                            <div className="pt-2">
                                <p className="text-black text-lg md:text-xl font-medium">
                                    A Distinguished Family Legacy of Empowerment & Ethical Excellence
                                </p>
                            </div>
                        </div>
                        {/* --- Where Our Journey Began Section --- */}
                        <div className="max-w-5xl mx-auto text-center space-y-8">
                            <h2 className="text-[#666141] text-3xl md:text-4xl font-normal">
                                Where Our Journey Began
                            </h2>

                            <div className="space-y-6 max-w-4xl mx-auto">
                                <p className="text-black text-sm md:text-base leading-relaxed">
                                    In 1981, the Malani family founded a modest textile atelier with an inspiring vision: to preserve India's magnificent artisan traditions while creating dignified, sustainable livelihoods.
                                </p>

                                <p className="text-black text-sm md:text-base leading-relaxed">
                                    What began as a cherished family endeavor has flourished into a meaningful movement empowering over 2,000 skilled artisans, particularly women, throughout India.
                                </p>

                                <p className="text-black text-sm md:text-base leading-relaxed">
                                    Today, Malani Impex stands proudly as a distinguished women-led, family-owned enterprise that gracefully bridges ancient craftsmanship with contemporary ethical excellence.
                                </p>
                            </div>
                        </div>
                        <div className='mt-8' >
                            <img src="images/about/about1.jpg" alt="building" />
                        </div>
                        {/* --- Section: Stats Row --- */}
                        <div className="py-8 border-b border-[#666141]/20">
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
                        {/* --- Section: Company Overview --- */}
                        <div className="py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                                {/* Left Column: Text Content */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <span className="text-[#666141] text-xl md:text-2xl font-normal opacity-90 block">
                                            Company Overview
                                        </span>
                                        <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                            Where Ancient Craft Meets Modern Living
                                        </h2>
                                    </div>

                                    <div className="space-y-6 text-black text-sm md:text-base leading-relaxed">
                                        <p>
                                            For over 43 years, MALANI IMPEX INC has been the bridge between Jaipur's master artisans and homes across 50+ countries.
                                        </p>
                                        <p>
                                            What began in 1981 as a single workshop has blossomed into a thriving community of 200+ craftspeople - predominantly women - keeping India's textile heritage alive through every stitch, print, and weave.
                                        </p>
                                        <p>
                                            From intricately embroidered cushion covers to hand-block-printed throws, from traditional poufs to contemporary upholstered furniture, each piece carries the soul of Rajasthan's rich artistic legacy. We don't just export products; we share stories woven in thread, printed in tradition, and crafted with pride.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Column: Categories List */}
                                <div className="relative pl-8 md:pl-12 py-4">
                                    {/* Vertical Line - Positioned behind dots */}
                                    <div className="absolute left-[0.65rem] md:left-[0.65rem] top-4 bottom-4 w-px bg-[#666141]/30 z-0"></div>

                                    <ul className="space-y-8 relative z-10"> {/* z-10 to place dots on top */}
                                        {[
                                            "Cushion Covers",
                                            "Throws & Stoles",
                                            "Chair Pads",
                                            "Quilts & Bedcovers",
                                            "Curtains & Tapestries",
                                            "Handbags",
                                            "Poufs",
                                            "Upholstered Furniture"
                                        ].map((item, idx) => (
                                            <li key={idx} className="relative flex items-center">
                                                {/* Dot - Centered on the line */}
                                                <span className="absolute -left-[2.1rem] md:-left-[3.1rem] w-6 h-6 rounded-full bg-[#666141] border-4 border-[#FFFEF5]"></span>
                                                <span className="text-xl md:text-2xl text-[#666141] font-normal opacity-90 ml-2">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <img
                                src="images/about/about2.jpg"
                                alt="building"
                                className="w-full h-[260px] md:h-[320px] object-cover"
                            />
                            <img
                                src="images/about/about3.jpg"
                                alt="building"
                                className="w-full h-[260px] md:h-[320px] object-cover"
                            />
                        </div>
                        {/* --- Section: The Malani Legacy --- */}
                        <div className="py-10 border-t border-[#666141]/20 mt-12">

                            {/* Header */}
                            <div className="mb-20 space-y-4">
                                <span className="text-[#666141] text-xl md:text-2xl font-normal opacity-90 block">
                                    The Malani Legacy
                                </span>
                                <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                    Four Distinguished Decades of Ethical Excellence
                                </h2>
                            </div>

                            <div className="relative">

                                {/* SINGLE CONTINUOUS LINE */}
                                <div className="absolute left-[9.5rem] md:left-[12.5rem] top-0 bottom-0 w-px bg-[#666141]/30"></div>

                                <div className="space-y-20">
                                    {timelineData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative grid grid-cols-[9rem_1fr] gap-x-12 md:gap-x-28"
                                        >
                                            {/* Year */}
                                            <div className="text-center md:text-right">
                                                <span className="text-5xl md:text-7xl  text-[#666141] leading-none">
                                                    {item.year}
                                                </span>
                                            </div>

                                            {/* Dot */}
                                            <div className="absolute left-[9.5rem] md:left-[12.5rem] -translate-x-1/2 top-2 w-4 h-4 rounded-full bg-[#666141] border-2 border-[#FFFEF5] z-10"></div>

                                            {/* Content */}
                                            <div>
                                                <h3 className="text-2xl mb-4">{item.title}</h3>
                                                <p className="max-w-3xl opacity-90">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* --- Section: What Guides Our Every Step --- */}
                        <div className="py-10 border-t border-[#666141]/20 ">

                            {/* Header */}
                            <div className="mb-6">
                                <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                    What Guides Our Every Step
                                </h2>
                            </div>

                            {/* Values Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                                {guidingValues.map((item, index) => (
                                    <div key={index} className="space-y-6">

                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-100">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-3">
                                            <h3 className="text-xl text-black font-normal">
                                                {item.title}
                                            </h3>
                                            <p className="text-black text-sm leading-relaxed opacity-90">
                                                {item.text}
                                            </p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* --- Section: Our Promise --- */}
                        <div className="py-8 border-t border-[#666141]/20 ">

                            {/* Header */}
                            <div className="text-center mb-16 space-y-4">
                                <span className="text-[#666141] text-xl md:text-2xl font-normal opacity-90 block">
                                    Our Promise
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight max-w-4xl mx-auto">
                                    Exceptional Quality You Can Trust, Standards You Can Treasure
                                </h2>
                            </div>

                            {/* Promise Cards (Flexbox for 3-2 layout) */}
                            <div className="flex flex-wrap justify-center gap-8">
                                {promiseData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full md:w-[45%] lg:w-[30%] bg-[#FFFEF5] hover:bg-[#FFFCEA] border border-[#666141]/20 rounded-[20px] p-10 flex flex-col items-center justify-center text-center gap-6 transition-colors duration-300 group"
                                    >
                                        {/* Icon Container */}
                                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                                            {/* Ensure Image is imported from 'next/image' */}
                                            <img
                                                src={item.icon}
                                                alt="Promise Icon"
                                                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                        </div>

                                        {/* Text */}
                                        <p className="text-black text-sm md:text-base font-medium leading-relaxed max-w-xs">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* --- Section: Crafted with Conscience --- */}
                        <div className="py-8 border-t border-[#666141]/20">

                            {/* Header */}
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl text-black leading-tight">
                                    Crafted with Conscience, Created with Care
                                </h2>
                            </div>

                            {/* Grid Layout (2x2) */}
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {craftedData.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`
                      flex flex-col items-center text-center p-8 md:p-10 gap-6
                      ${/* Border Logic: Mobile gets bottom border on all but last. Desktop gets right border on odd cols, bottom on top row. */ ""}
                      ${index === 0 ? "border-b border-[#666141]/20 md:border-r" : ""}
                      ${index === 1 ? "border-b border-[#666141]/20 md:border-r-0" : ""}
                      ${index === 2 ? "border-b border-[#666141]/20 md:border-b-0 md:border-r" : ""}
                      ${index === 3 ? "" : ""}
                    `}
                                    >
                                        {/* Icon Container */}
                                        <div className="relative w-20 h-20 mb-2">
                                            {/* Ensure Image is imported from 'next/image' */}
                                            <img
                                                src={item.icon}
                                                alt={item.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-4 max-w-md">
                                            <h3 className="text-3xl text-black font-normal">
                                                {item.title}
                                            </h3>
                                            <p className="text-black text-sm md:text-lg leading-relaxed opacity-90">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* --- Section: Biodegradable Packaging --- */}
                        <div className="pt-8 border-t border-[#666141]/20">

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
        </>
    );
};

export default AboutPage;