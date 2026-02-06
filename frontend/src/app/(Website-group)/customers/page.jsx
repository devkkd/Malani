"use client";
import React from 'react';
import Container from '@/components/website/Container';
import EthicalFoundation from '@/components/website/EthicalData';

const CustomersPage = () => {

    // --- DATA: Stats ---
    const statsData = [
        {
            value: "4.9/5.0",
            label: "5 Star Rating",
            subLabel: "From 2,000+ reviews"
        },
        {
            value: "85%",
            label: "Repeat Customers",
            subLabel: "Customer retention rate"
        },
        {
            value: "98%",
            label: "On-Time Delivery",
            subLabel: "Worldwide shipping"
        },
        {
            value: "96%",
            label: "Satisfaction Rate",
            subLabel: "Happy customers"
        }
    ];
    // --- DATA: Customer Testimonials ---
    const testimonialsData = [
        {
            id: 1,
            text: "The quality is exceptional, and knowing that my purchase supports women artisans makes it even more special. Each piece is a work of art that I treasure.",
            name: "Sarah Johnson",
            role: "Interior Designer, New York",
            image: "/images/customers/customer1.jpg"
        },
        {
            id: 2,
            text: "Malani Impex has transformed our boutique's offering. The block print cushions flew off the shelves within days. The craftsmanship is truly unlike anything else.",
            name: "Elena Rodriguez",
            role: "Boutique Owner, Madrid",
            image: "/images/customers/customer2.jpg"
        },
        {
            id: 3,
            text: "We needed a reliable partner for our eco-friendly hotel chain. Their sustainable materials and transparent supply chain aligned perfectly with our values.",
            name: "David Chen",
            role: "Hotelier, Singapore",
            image: "/images/customers/customer3.jpg"
        },
        {
            id: 4,
            text: "The consistency in quality across bulk orders is impressive. Usually, handmade items vary too much, but Malani Impex strikes the perfect balance of unique character and standard quality.",
            name: "Emma Watson",
            role: "Sourcing Manager, London",
            image: "/images/customers/customer4.jpg"
        },
        {
            id: 5,
            text: "I visited their facility in Jaipur and was moved by the happy working environment. These products truly carry good energy.",
            name: "Michael Ross",
            role: "Retail Buyer, Sydney",
            image: "/images/customers/customer5.jpg"
        },
        {
            id: 6,
            text: "From the initial quote to delivery, the communication was seamless. The custom designs we requested came out even better than the digital mockups.",
            name: "Priya Patel",
            role: "Event Planner, Mumbai",
            image: "/images/customers/customer6.jpg"
        },
        {
            id: 7,
            text: "The textures of the winter collection are divine. My clients love the warmth and the story behind the Kantha stitching. Highly recommended.",
            name: "Isabella Moretti",
            role: "Architect, Milan",
            image: "/images/customers/customer7.jpg"
        },
        {
            id: 8,
            text: "Finally, a supplier that understands 'AZO-free' and 'Sustainable' genuinely. The certifications provided gave us total peace of mind.",
            name: "Thomas Mueller",
            role: "Importer, Berlin",
            image: "/images/customers/customer8.jpg"
        },
        {
            id: 9,
            text: "The colors are vibrant and stay that way after washing. My customers keep coming back for the summer collection throws.",
            name: "Sophie Dubois",
            role: "Shop Owner, Paris",
            image: "/images/customers/customer9.jpg"
        },
        {
            id: 10,
            text: "Working with Malani Impex has allowed us to scale our ethical home decor line rapidly. Their production capacity is impressive.",
            name: "James Carter",
            role: "E-commerce Founder, Austin",
            image: "/images/customers/customer10.jpg"
        },
        {
            id: 11,
            text: "The attention to detail in the embroidery is breathtaking. It's rare to find such authentic handwork at these wholesale prices.",
            name: "Aiko Tanaka",
            role: "Distributor, Tokyo",
            image: "/images/customers/customer11.jpg"
        },
        {
            id: 12,
            text: "Fast shipping and biodegradable packaging—they really walk the talk when it comes to sustainability. A fantastic partner.",
            name: "Olivia Brown",
            role: "Sustainability Consultant, Toronto",
            image: "/images/customers/customer12.jpg"
        },
        {
            id: 13,
            text: "Every shipment feels like unwrapping a gift. The care in packing and the quality of the fabric is consistently top-notch.",
            name: "Liam O'Connor",
            role: "Retail Chain Manager, Dublin",
            image: "/images/customers/customer13.jpg"
        },
        {
            id: 14,
            text: "We used their fabrics for a large wedding project. The guests couldn't stop talking about the beautiful table runners.",
            name: "Fatima Al-Sayed",
            role: "Wedding Stylist, Dubai",
            image: "/images/customers/customer14.jpg"
        },
        {
            id: 15,
            text: "A true gem in the textile industry. Professional, ethical, and artistic. We are proud to stock their products.",
            name: "Lucas Silva",
            role: "Concept Store Owner, Rio",
            image: "/images/customers/customer15.jpg"
        }
    ];

    return (
        <section className="w-full bg-[#FFFEF5] py-20 px-4 md:px-8">
            <Container>
                <div className="max-w-[1400px] mx-auto">

                    {/* --- Header Section --- */}
                    <div className="text-center mb-24 space-y-6">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#666141] font-normal tracking-tight">
                            Happy Customers Malani Impex
                        </h1>

                        <h2 className="text-black text-2xl md:text-3xl font-normal pt-2">
                            Trusted by Customers Worldwide
                        </h2>

                        <p className="text-black text-sm md:text-base leading-relaxed opacity-90 max-w-3xl mx-auto">
                            Our commitment to quality and authenticity has earned us recognition and loyal customers across the globe.
                        </p>
                    </div>

                    {/* --- Stats Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 items-start">
                        {statsData.map((stat, index) => (
                            <div
                                key={index}
                                className={`
                  flex flex-col items-center md:items-start space-y-3 px-4 md:px-8
                  ${/* Right border logic: Add border to all except the last item on large screens */ ""}
                  ${index !== statsData.length - 1 ? 'lg:border-r lg:border-[#666141]/20' : ''}
                  ${/* Mobile/Tablet logic: Add bottom border to odd items or adjust as needed for flow. Keeping it clean with just spacing for mobile. */ ""}
                `}
                            >
                                <span className="text-4xl md:text-5xl text-black font-normal leading-tight">
                                    {stat.value}
                                </span>

                                <div className="space-y-1 text-center md:text-left">
                                    <h3 className="text-lg text-black font-normal">
                                        {stat.label}
                                    </h3>
                                    <p className="text-sm text-black opacity-80">
                                        {stat.subLabel}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* --- Testimonials Grid --- */}
                    <div className="mt-32">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonialsData.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#FFFCEA] rounded-[20px] p-8 flex flex-col justify-between min-h-[320px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm"
                                >
                                    {/* Top Content */}
                                    <div className="space-y-6">
                                        {/* Quote Icon */}
                                        <div className="text-[#666141] text-6xl font-serif leading-none opacity-80 h-8">
                                            “
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-black text-sm md:text-base leading-relaxed opacity-90">
                                            {item.text}
                                        </p>
                                    </div>

                                    {/* Bottom Profile */}
                                    <div className="flex items-center justify-between pt-8 mt-4 border-t border-[#666141]/5">
                                        {/* Name & Role */}
                                        <div className="flex flex-col">
                                            <span className="text-black font-medium text-base">
                                                - {item.name}
                                            </span>
                                            <span className="text-black/60 text-xs mt-0.5">
                                                {item.role}
                                            </span>
                                        </div>

                                        {/* Avatar Image */}
                                        <div className="relative w-12 h-12 flex-shrink-0">
                                            {/* Using standard img tag for dummy placeholder compatibility, switch to Next Image in production */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-full bg-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default CustomersPage;