"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/website/Container';
// 1. Import from JSON file
import techniquesData from "@/data/techniquesData.json";
import { ChevronDown, ChevronUp } from 'lucide-react'; 

const HomeTechniquesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Use imported data directly
  const activeData = techniquesData[activeIndex];

  // Handler for mobile accordion toggle (using local state if needed for multi-open, or reuse activeIndex logic)
  // For mobile accordion, we might want independent toggle logic or reuse activeIndex. 
  // Reusing activeIndex makes it behave like an accordion where only one is open at a time.
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8 border-t border-[#666141]/10">
      <Container>
        <div className="mx-auto space-y-16">
          
          {/* --- Header --- */}
          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E9E4B5] flex items-center justify-center">
                   <span className="text-[#666141] text-lg">→</span>
                </div>
                <span className="text-black text-lg font-medium">Our Techniques</span>
             </div>

             <div className="space-y-6">
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl text-[#666141] font-normal opacity-90">
                        The Art Behind Every Thread
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
                        Techniques Honored Across Centuries
                    </h3>
                </div>
                
                {/* Quote Block */}
                <div className="max-w-4xl">
                    <p className="text-black text-sm md:text-base italic leading-relaxed opacity-80 border-l-2 border-[#666141] pl-4">
                        "Working with Malani Impex has transformed my life in ways I never imagined possible. I can now proudly support my family and provide education for my daughters." 
                        <span className="block not-italic font-medium mt-2 text-[#666141]">– Kamla, Master Block Print Artisan</span>
                    </p>
                </div>
             </div>
          </div>

          {/* ==================================================
              MOBILE LAYOUT: ACCORDION (Hidden on Large Screens)
          ================================================== */}
          <div className="flex flex-col lg:hidden border-t border-[#666141]/20">
            {techniquesData.map((tech, index) => {
              const isActive = index === activeIndex;
              
              return (
                <div key={tech.id} className="border-b border-[#666141]/20">
                  
                  {/* Accordion Header */}
                  <button 
                    onClick={() => toggleAccordion(index)}
                    className={`w-full text-left py-5 px-2 flex justify-between items-center transition-colors duration-300 ${isActive ? 'bg-[#666141]/5' : ''}`}
                  >
                    <span className={`text-lg font-medium ${isActive ? 'text-[#666141]' : 'text-black'}`}>
                      {tech.title}
                    </span>
                    {isActive ? (
                        <span className="text-[#666141] font-bold text-xl">−</span> 
                    ) : (
                        <span className="text-black/50 font-bold text-xl">+</span>
                    )}
                  </button>

                  {/* Accordion Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-4 pb-8 space-y-6">
                      
                      <div className="space-y-2">
                        <h4 className="text-lg text-[#666141] font-normal opacity-90">{tech.subtitle}</h4>
                        <p className="text-sm text-black opacity-80 leading-relaxed">{tech.description || tech.description1}</p>
                      </div>

                      {/* Small Images Grid (2 Columns) */}
                      <div className="grid grid-cols-2 gap-3">
                        {tech.images.map((imgSrc, i) => (
                           <div key={i} className="relative aspect-[4/3] w-full bg-gray-100 rounded-sm overflow-hidden">
                              <Image 
                                 src={imgSrc} 
                                 alt={`${tech.title} Detail ${i+1}`}
                                 fill
                                 className="object-cover"
                              />
                           </div>
                        ))}
                      </div>

                      {/* Checklist */}
                      <ul className="space-y-2">
                         {tech.checklist.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-black opacity-90">
                               <span className="font-bold text-[#666141] mt-0.5">✓</span>
                               <span>{item}</span>
                            </li>
                         ))}
                      </ul>

                      {/* CTA */}
                      <Link 
                         href={`/techniquess/${tech.id}`} 
                         className="inline-block text-sm font-medium text-[#666141] hover:underline"
                      >
                         View Details →
                      </Link>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==================================================
              DESKTOP LAYOUT: SIDEBAR (Visible on Large Screens)
          ================================================== */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start">
             
             {/* LEFT: Navigation List */}
             <div className="col-span-4 flex flex-col border-t border-[#666141]/20">
                {techniquesData.map((tech, index) => (
                   <div 
                      key={tech.id}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`
                        cursor-pointer py-4 px-5 text-lg font-medium transition-all duration-300 border-b border-[#666141]/20
                        ${index === activeIndex 
                           ? 'bg-[#666141] text-[#FFFEF5] pl-6' 
                           : 'text-black hover:bg-[#666141]/5 hover:pl-6'
                        }
                      `}
                   >
                      {tech.title}
                   </div>
                ))}
             </div>

             {/* RIGHT: Content Display */}
             {activeData && (
                 <div className="col-span-8 space-y-10 min-h-[600px] animate-fadeIn">
                
                    {/* Text Content */}
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <h2 className="text-5xl text-black leading-tight">
                             {activeData.title}
                          </h2>
                          <h3 className="text-2xl text-[#666141] font-normal opacity-90">
                             {activeData.subtitle}
                          </h3>
                       </div>
                       
                       <p className="text-base text-black leading-relaxed max-w-3xl opacity-90">
                          {activeData.description || activeData.description1}
                       </p>

                       {/* Process List */}
                       <div className="space-y-3 pt-2">
                          <h4 className="text-lg text-black font-medium">Our Meticulous Process</h4>
                          <ul className="space-y-2">
                             {activeData.checklist.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-black opacity-90">
                                   <span className="font-bold text-[#666141]">✓</span>
                                   <span>{item}</span>
                                </li>
                             ))}
                          </ul>
                       </div>
                    </div>

                    {/* Images Row */}
                    <div className="grid grid-cols-2 gap-6">
                       {activeData.images.map((imgSrc, i) => (
                          <div key={i} className="relative aspect-[4/3] w-full bg-gray-100 rounded-sm overflow-hidden">
                             <Image 
                                src={imgSrc} 
                                alt={`${activeData.title} Detail ${i+1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                             />
                          </div>
                       ))}
                    </div>

                    {/* CTA Button */}
                    <div>
                       <Link 
                          href={`/techniquess/${activeData.id}`} 
                          className="inline-block bg-[#666141] text-[#FFFEF5] px-8 py-4 rounded-full text-base font-medium hover:bg-[#555135] transition-colors shadow-md"
                       >
                          See All {activeData.title} →
                       </Link>
                    </div>

                 </div>
             )}

          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeTechniquesSection;