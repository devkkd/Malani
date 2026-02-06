"use client";
import Container from '@/components/Container';
import Image from 'next/image';
import { Clock, Grid3X3 } from 'lucide-react'; // Make sure to install lucide-react

const TechniquesPage = () => {
  
  const renderIcon = (iconType) => {
    if (iconType === 'time') return <Clock size={20} />;
    if (iconType === 'artisans') return <Grid3X3 size={20} />;
    return <div className="w-5 h-5 bg-black rounded-full" />; // Fallback
  };

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
      <Container>
        <div className="max-w-[1400px] mx-auto">
          
          {/* --- Header Section --- */}
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
              Techniques Malani Impex
            </h1>
            
            <div className="space-y-2 pt-2">
              <p className="text-black text-lg md:text-xl font-medium">
                The Masterful Art Behind Every Thread
              </p>
              <p className="text-black text-lg md:text-xl font-medium">
                Ancient Techniques, Enduring Impact
              </p>
            </div>
          </div>

          {/* --- Craftsmanship Intro --- */}
          <div className="gap-36 flex space-y-8 mb-24">
            <h2 className="text-[#666141] text-2xl text-left md:text-4xl font-normal">
              Craftsmanship Honored Across Centuries
            </h2>
            <div className="space-y-6 text-left">
                <p className="text-black text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
                    Each distinguished piece from Malani Impex stands as a beautiful testament to India's magnificent textile heritage. Our skilled artisans master techniques lovingly passed down through countless generations techniques requiring remarkable patience, exceptional skill, and an intimate understanding of natural materials.
                </p>
                <p className="text-black text-sm md:text-base leading-relaxed">
                    We warmly invite you to discover the ancient arts that render every product utterly unique.
                </p>
            </div>
          </div>

          {/* --- TECHNIQUES LOOP --- */}
          <div className="flex flex-col gap-24">
            {techniquesData.map((tech) => (
              <div key={tech.id} className="w-full">
                
                {/* 1. Header & Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pb-6 border-b border-[#666141]/20">
                  <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl text-black">
                      {tech.title}
                    </h2>
                    <p className="text-[#666141] text-xl md:text-2xl font-normal opacity-90">
                      {tech.subtitle}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-sm md:text-base text-black leading-relaxed">
                        {tech.description1}
                    </p>
                    <p className="text-sm md:text-base text-black leading-relaxed">
                        {tech.description2}
                    </p>
                  </div>
                </div>

                {/* 2. Process & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 py-8">
                  
                  {/* Left: Checklist */}
                  <div className="space-y-6">
                      <h3 className="text-black text-xl font-medium">
                        {tech.processTitle}
                      </h3>
                      <ul className="space-y-1">
                        {tech.checklist.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-black">
                            <span className="font-semibold text-black">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                  </div>

                  {/* Right: Stats Icons */}
                  <div className="flex flex sm:flex-row gap-12 sm:gap-20">
                      {tech.stats.map((stat, idx) => (
                        <div key={idx} className="space-y-4 ">
                          <div className="w-10 h-10 border border-black/80 rounded-full flex items-center justify-center text-black">
                              {renderIcon(stat.icon)}
                          </div>
                          <div>
                              <h4 className="text-black text-lg font-medium">{stat.label}</h4>
                              <p className="text-sm text-black opacity-80 mt-1">{stat.value}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 3. Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tech.images.map((imgSrc, idx) => (
                    <div key={idx} className="relative aspect-[5.5/3.5] overflow-hidden">
                        <Image 
                          src={imgSrc} 
                          alt={`${tech.title} image ${idx + 1}`} 
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default TechniquesPage;