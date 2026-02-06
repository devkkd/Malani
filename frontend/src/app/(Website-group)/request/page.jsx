"use client";
import { useState } from 'react';
import Container from '@/components/website/Container';
import { ArrowRight, Upload } from 'lucide-react';
import EthicalFoundation from '@/components/website/EthicalData';

const RequestQuotePage = () => {
    // --- State for Chips (Visual Toggling) ---
    // In a real app, you would manage this state more robustly.
    const [selectedProduct, setSelectedProduct] = useState('Cushion Covers');
    const [selectedTechnique, setSelectedTechnique] = useState('Chikan Embroidery');
    const [selectedQuantity, setSelectedQuantity] = useState('10 - 50 pc');
    const [selectedSeason, setSelectedSeason] = useState('All-Season');

    // --- Data Options ---
    const productTypes = [
        'Blinds', 'Cushion Covers', 'Furniture', 'Pouf',
        'Pillow Covers', 'Round Cushion', 'Rugs', 'Throw',
        'Wall Frame', 'Custom', 'Wholesale Partnership'
    ];

    const techniques = [
        'Block Print', 'Dabu Print', 'Screen Print',
        'Digital Print', 'Chikan Embroidery', 'Applique work',
        'Chikan Embroidery (Computerized)', 'Machine Embroidery',
        'Hand work (Gaderi / Kantha)', 'Weaving, Natural Dyeing',
        'Machine Embroidery (Computerized)', 'Other'
    ];

    const quantities = ['Up to 10 pc', '10 - 50 pc', '50+ pc'];
    const seasons = ['Summer', 'Festival', 'Winter', 'All-Season'];

    // Helper to render a section of selectable chips
    const renderChips = (options, selected, setSelected) => (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => setSelected(option)}
                    className={`px-4 py-2 rounded-full text-[13px] border transition-colors ${selected === option
                        ? 'bg-[#666141] text-white border-[#666141]'
                        : 'bg-white text-black border-gray-300 hover:border-[#666141]'
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );

    return (
        <section className="w-full bg-[#FFFEF5] py-12 md:py-20 px-4 md:px-8">
            <Container>
                <div className="max-w-[1400px] mx-auto">

                    {/* --- Header --- */}
                    <div className="text-center mb-16 max-w-4xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
                            Request a Quote Malani Impex
                        </h1>
                        <p className="text-black text-lg md:text-2xl font-medium opacity-80">
                            Request a Personalized Consultation
                        </p>

                        <div className="pt-4 space-y-4">
                            <h2 className="text-[#666141] text-2xl md:text-3xl">
                                Allow Us to Bring Your Vision to Beautiful Life
                            </h2>
                            <p className="text-black text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                                Whether you're a distinguished interior designer, thoughtful retailer, or conscious consumer seeking custom creations, we would be delighted to collaborate with you.
                                <br />
                                Please share your inspiring vision, and our dedicated team will create a thoughtfully tailored proposal.
                            </p>
                        </div>
                    </div>

                    {/* --- Main Form Card --- */}
                    <div className="bg-[#FFFCEA] border border-[#666141]/30 rounded-[30px] p-6 md:p-10 mb-20 shadow-sm relative">
                        <form>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

                                {/* --- Column 1: Consultation (User Info) --- */}
                                <div className="space-y-6">
                                    <h3 className="text-[#666141] text-lg font-medium mb-4">Consultation</h3>
                                    <p className="text-xs text-black uppercase tracking-wide">Your Information</p>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs text-black ml-1">Full Name</label>
                                            <input type="text" placeholder="John Doe" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#666141]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-black ml-1">Email Address</label>
                                            <input type="email" placeholder="johndoe@gmail.com" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#666141]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-black ml-1">Phone/WhatsApp Number</label>
                                            <input type="tel" placeholder="1234567890" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#666141]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-black ml-1">Company Name (if applicable)</label>
                                            <input type="text" placeholder="ABCD" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#666141]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-black ml-1">Country</label>
                                            <input type="text" placeholder="India" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#666141]" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-black ml-1">City</label>
                                            <input type="text" placeholder="Jaipur" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#666141]" />
                                        </div>
                                    </div>
                                </div>

                                {/* --- Column 2: Project Details --- */}
                                <div className="space-y-8">
                                    <h3 className="text-[#666141] text-lg font-medium mb-4">Project Details</h3>

                                    <div className="space-y-3">
                                        <p className="text-xs text-black">Product Type</p>
                                        {renderChips(productTypes, selectedProduct, setSelectedProduct)}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs text-black">Preferred Techniques</p>
                                        {renderChips(techniques, selectedTechnique, setSelectedTechnique)}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs text-black">Quantity Desired</p>
                                        {renderChips(quantities, selectedQuantity, setSelectedQuantity)}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs text-black">Preferred Season/Collection</p>
                                        {renderChips(seasons, selectedSeason, setSelectedSeason)}
                                    </div>
                                </div>

                                {/* --- Column 3: Design Preferences --- */}
                                <div className="space-y-6">
                                    <h3 className="text-[#666141] text-lg font-medium mb-4">Design Preferences</h3>

                                    {/* Checkboxes */}
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="accent-[#666141] w-4 h-4" />
                                            <span className="text-sm text-black">Preferred Color Palette</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="accent-[#666141] w-4 h-4" />
                                            <span className="text-sm text-black">Pattern Preferences</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="accent-[#666141] w-4 h-4" />
                                            <span className="text-sm text-black">Size Requirements</span>
                                        </label>
                                    </div>

                                    {/* File Upload */}
                                    <div className="space-y-2 pt-2">
                                        <p className="text-xs text-black">Upload Reference images (optional)</p>
                                        <div className="relative">
                                            <input type="text" placeholder="Image.jpg" disabled className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-400" />
                                            <button type="button" className="absolute right-3 top-2.5 text-gray-400">
                                                <Upload size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sustainability Preferences */}
                                    <div className="space-y-3 pt-2">
                                        <p className="text-xs text-black">Sustainability Preferences</p>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="accent-[#666141] w-4 h-4" />
                                            <span className="text-sm text-black">Biodegradable packaging requested</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="accent-[#666141] w-4 h-4" />
                                            <span className="text-sm text-black">Specific material preferences</span>
                                        </label>
                                    </div>

                                    {/* Custom Certification */}
                                    <div className="space-y-2 pt-2">
                                        <p className="text-xs text-black">Custom certification requirements</p>
                                        <textarea
                                            rows={4}
                                            placeholder="Lorem Ipsum"
                                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#666141] resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* --- Submit Button --- */}
                            <div className="flex justify-center mt-12 mb-4">
                                <button type="submit" className="bg-[#666141] text-white px-10 py-3 rounded-full text-base font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-[#666141]/20">
                                    Special Requirements <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* --- Bottom Info Section --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-20">

                        {/* Left Info: What Happens Next? */}
                        <div className="space-y-8 md:pr-16 lg:pr-24 pb-12 md:pb-0 border-b md:border-b-0 md:border-r border-[#666141]/20">
                            <h2 className="text-3xl text-[#666141] font-normal">
                                What Happens Next?
                            </h2>
                            <ul className="space-y-2">
                                {[
                                    "Within 24 Hours: We'll graciously acknowledge your request.",
                                    "Within 3-5 Business Days: Our team sends a detailed, personalized quotation.",
                                    "Consultation: We'll schedule a convenient call to refine all details.",
                                    "Production: Once approved, our skilled artisans lovingly begin crafting.",
                                    "Delivery: Receive your beautiful, ethically created textiles."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                        <span className="font-bold text-[#666141] mt-0.5 text-lg">✓</span>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-base mb-1">{item.split(':')[0]}:</span>
                                            <span className="text-gray-700">{item.split(':')[1]}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Info: Minimum Order Quantities */}
                        <div className="space-y-8 md:pl-16 lg:pl-24 pt-12 md:pt-0">
                            <h2 className="text-3xl text-[#666141] font-normal">
                                Minimum Order Quantities
                            </h2>
                            <ul className="space-y-2">
                                {[
                                    "Custom Orders: 50 pieces (minimum)",
                                    "Wholesale Partnerships: 100 pieces (minimum)",
                                    "Individual/Sample Orders: No minimum required"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-black">
                                        <span className="font-bold text-[#666141] mt-0.5 text-lg">✓</span>
                                        <div className="flex flex-col">
                                            {item.includes(':') ? (
                                                <>
                                                    <span className="font-semibold text-base mb-1">{item.split(':')[0]}:</span>
                                                    <span className="text-gray-700">{item.split(':')[1]}</span>
                                                </>
                                            ) : (
                                                <span className="font-semibold text-base">{item}</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
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

export default RequestQuotePage;