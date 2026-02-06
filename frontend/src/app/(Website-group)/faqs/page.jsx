"use client";
import { useState } from 'react';
import Container from '@/components/website/Container';
import Image from 'next/image';
import EthicalFoundation from '@/components/website/EthicalData';

const FAQsPage = () => {
    // --- FAQ Data based on your image ---
    const faqs = [
        {
            id: 1,
            question: "Are all your products genuinely handmade?",
            answer: "Yes, absolutely every single one. Each piece is lovingly handcrafted by skilled artisans using time-honored traditional techniques. No machines, no mass production simply skilled hands and generations of treasured wisdom."
        },
        {
            id: 2,
            question: "Will the colors fade or the fabric shrink after washing?",
            answer: "We guarantee they will not. Our natural dyes are carefully fixed, and all fabrics are pre-washed and thoroughly tested for colorfastness. This is our promise to you."
        },
        {
            id: 3,
            question: "Are your dyes safe for sensitive skin?",
            answer: "Absolutely, and we take this very seriously. We exclusively use AZO-free, natural dyes that are safe for even the most sensitive skin. No toxic chemicals, ever."
        },
        {
            id: 4,
            question: "How should I care for my handcrafted textiles?",
            answer: "Each product arrives with detailed care instructions. Generally speaking: gentle machine wash or hand wash in cold water with mild detergent, then air dry."
        },
        {
            id: 5,
            question: "Why do handmade products typically cost more?",
            answer: "Handmade textiles require exceptional skilled labor, considerable time, and deep expertise. Your thoughtful purchase ensures fair wages for artisans, sustainable practices, and the preservation of ancient crafts. You're investing in genuine quality, ethics, and meaningful impact."
        }
    ];
    // --- Section 2: Practices Data ---
    const practicesFaqs = [
        {
            id: 6,
            question: "How do you ensure absolutely no child labor?",
            answer: "We maintain zero-tolerance policies with regular facility audits, strict age verification, and third-party certifications. We also proudly support education programs for artisan children."
        },
        {
            id: 7,
            question: "What does \"women's empowerment\" genuinely mean at Malani Impex?",
            answer: "We operate women-only workshops, provide fair compensation, offer skills training, and create meaningful leadership opportunities. Over 85% of our artisans are women who serve as primary breadwinners for their families."
        },
        {
            id: 8,
            question: "How can I verify your supply chain?",
            answer: "We maintain complete transparency and would be delighted to share information. Request supply chain documentation for any product, and we'll gladly provide details on materials, artisans, and production locations."
        },
        {
            id: 9,
            question: "What are \"fair wages\" exactly?",
            answer: "We provide living wages compensation that genuinely covers basic needs plus discretionary income. Our wages are 40-60% above regional minimums and are paid promptly and with respect."
        }
    ];

    // --- Section 3: Environmental Data ---
    const environmentalFaqs = [
        {
            id: 10,
            question: "What is your biodegradable packaging made from?",
            answer: "Our bags are made from corn starch completely biodegradable and compostable. They'll break down naturally without harming our precious environment."
        },
        {
            id: 11,
            question: "Are your materials organic?",
            answer: "Many of our products feature GOTS-certified organic cotton and natural fibers. Please check individual product descriptions for specific material information."
        },
        {
            id: 12,
            question: "How do you minimize environmental impact?",
            answer: "Through small-batch production, natural dyes, minimal water waste, biodegradable packaging, and traditional low-energy techniques that honor our Earth."
        }
    ];
    // --- Section 4: Ordering & Customization Data ---
    const orderingFaqs = [
        {
            id: 13,
            question: "Do you accept custom orders?",
            answer: "Yes, we would be delighted to bring your vision to life! Minimum order quantities apply."
        },
        {
            id: 14,
            question: "What's the minimum order for wholesale partnerships?",
            answer: "50 pieces minimum for wholesale orders."
        },
        {
            id: 15,
            question: "How long does production typically take?",
            answer: "Standard orders: 2-3 weeks. Custom orders: 4-8 weeks depending on complexity. Each piece is lovingly made to order."
        },
        {
            id: 16,
            question: "Do you ship internationally?",
            answer: "Yes, we ship worldwide with care."
        },
        {
            id: 17,
            question: "Can I review products before ordering in larger quantities?",
            answer: "Absolutely, we offer sample orders. Please contact us for details."
        }
    ];
    // --- Section 5: About Our Company Data ---
    const companyFaqs = [
        {
            id: 18,
            question: "How long has Malani Impex been in business?",
            answer: "Since 1981 over four distinguished decades of ethical craftsmanship and meaningful artisan empowerment."
        },
        {
            id: 19,
            question: "Are you truly family-owned?",
            answer: "Yes, we are a proud third-generation family business, distinguished as women-led."
        },
        {
            id: 20,
            question: "Where are you located?",
            answer: "Our headquarters and primary production facilities are in India, where we work with artisan communities across the country."
        },
        {
            id: 21,
            question: "How many artisans do you work with?",
            answer: "Over 2,000 skilled artisans, primarily women, across multiple states throughout India."
        }
    ];

    // State to track which FAQ is open (defaulting to the first one open, or null for all closed)
    const [openId, setOpenId] = useState(1);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
            <Container>
                <div className="">

                    {/* --- Header Section --- */}
                    <div className="text-center mb-20 space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
                            FAQ's Malani Impex
                        </h1>
                        <p className="text-black text-lg md:text-2xl font-medium">
                            Frequently Asked Questions, Everything You'd Like to Know
                        </p>
                    </div>

                    {/* --- FAQ Section --- */}
                    <div className=" mx-auto">
                        <h2 className="text-[#666141] text-2xl md:text-3xl font-normal mb-8">
                            About Our Distinguished Products
                        </h2>

                        <div className="space-y-0">
                            {faqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="border-b border-[#666141]/20 last:border-none"
                                >
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full py-8 flex justify-between items-center text-left group"
                                    >
                                        <span className="text-lg md:text-xl text-black font-medium pr-8">
                                            {faq.question}
                                        </span>

                                        {/* Arrow Icon */}
                                        <div className={`relative w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-90' : 'rotate-0'}`}>
                                            <Image
                                                src="/images/arrow.png"
                                                alt="Expand"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </button>

                                    {/* Answer Section */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-48 opacity-100 pb-8' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                {/* --- Section 2: About Our Practices --- */}
                <div className=" mx-auto mt-16 md:mt-24">
                    <h2 className="text-[#666141] text-2xl md:text-3xl font-normal mb-8">
                        About Our Practices
                    </h2>

                    <div className="space-y-0">
                        {practicesFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="border-b border-[#666141]/20 last:border-none"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full py-8 flex justify-between items-center text-left group"
                                >
                                    <span className="text-lg md:text-xl text-black font-medium pr-8">
                                        {faq.question}
                                    </span>

                                    {/* Arrow Icon */}
                                    <div className={`relative w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-90' : 'rotate-0'}`}>
                                        <Image
                                            src="/images/arrow.png"
                                            alt="Expand"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-48 opacity-100 pb-8' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* --- Section 3: Environmental Questions --- */}
                <div className=" mx-auto mt-16 md:mt-24">
                    <h2 className="text-[#666141] text-2xl md:text-3xl font-normal mb-8">
                        Environmental Questions
                    </h2>

                    <div className="space-y-0">
                        {environmentalFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="border-b border-[#666141]/20 last:border-none"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full py-8 flex justify-between items-center text-left group"
                                >
                                    <span className="text-lg md:text-xl text-black font-medium pr-8">
                                        {faq.question}
                                    </span>

                                    {/* Arrow Icon */}
                                    <div className={`relative w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-90' : 'rotate-0'}`}>
                                        <Image
                                            src="/images/arrow.png"
                                            alt="Expand"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-48 opacity-100 pb-8' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* --- Section 4: Ordering & Customization --- */}
                <div className=" mx-auto mt-16 md:mt-24 mb-20">
                    <h2 className="text-[#666141] text-2xl md:text-3xl font-normal mb-8">
                        Ordering & Customization
                    </h2>

                    <div className="space-y-0">
                        {orderingFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="border-b border-[#666141]/20 last:border-none"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full py-8 flex justify-between items-center text-left group"
                                >
                                    <span className="text-lg md:text-xl text-black font-medium pr-8">
                                        {faq.question}
                                    </span>

                                    {/* Arrow Icon */}
                                    <div className={`relative w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-90' : 'rotate-0'}`}>
                                        <Image
                                            src="/images/arrow.png"
                                            alt="Expand"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-48 opacity-100 pb-8' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* --- Section 5: About Our Company --- */}
                <div className="mx-auto mt-16 md:mt-24 mb-20">
                    <h2 className="text-[#666141] text-2xl md:text-3xl font-normal mb-8">
                        About Our Company
                    </h2>

                    <div className="space-y-0">
                        {companyFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="border-b border-[#666141]/20 last:border-none"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full py-8 flex justify-between items-center text-left group"
                                >
                                    <span className="text-lg md:text-xl text-black font-medium pr-8">
                                        {faq.question}
                                    </span>

                                    {/* Arrow Icon */}
                                    <div className={`relative w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-90' : 'rotate-0'}`}>
                                        <Image
                                            src="/images/arrow.png"
                                            alt="Expand"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-48 opacity-100 pb-8' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
            <Container>
                <EthicalFoundation />
            </Container>
        </section>
    );
};

export default FAQsPage;