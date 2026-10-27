"use client";
import { useState, useEffect } from 'react';
import Container from '@/components/website/Container';
import Image from 'next/image';
import ProductCard from '@/components/website/ProductCard';
import { Clock, Users } from 'lucide-react';

const TechniquesPage = () => {
  const [techniques, setTechniques] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all techniques
        const techRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques`);
        const techData = await techRes.json();
        
        if (techData.success) {
          setTechniques(techData.data);

          // Fetch products for each technique
          const productsData = {};
          for (const tech of techData.data) {
            const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?technique=${tech._id}`);
            const prodData = await prodRes.json();
            if (prodData.success) {
              productsData[tech._id] = prodData.data;
            }
          }
          setProductsMap(productsData);
        }
      } catch (error) {
        console.error('Failed to fetch techniques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
        <Container>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#666141] mx-auto"></div>
            <p className="text-[#666141] mt-4">Loading techniques...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
      <Container>
        <div className="max-w-[1400px] mx-auto">
          
          {/* --- Header Section --- */}
          <div className="text-center mb-16 space-y-4">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 mb-24">
            <h2 className="text-[#666141] text-2xl md:text-4xl font-normal">
              Craftsmanship Honored Across Centuries
            </h2>
            <div className="space-y-6">
              <p className="text-black text-sm md:text-base leading-relaxed">
                Each distinguished piece from Malani Impex stands as a beautiful testament to India's magnificent textile heritage. Our skilled artisans master techniques lovingly passed down through countless generations techniques requiring remarkable patience, exceptional skill, and an intimate understanding of natural materials.
              </p>
              <p className="text-black text-sm md:text-base leading-relaxed">
                We warmly invite you to discover the ancient arts that render every product utterly unique.
              </p>
            </div>
          </div>

          {/* --- TECHNIQUES LOOP --- */}
          <div className="flex flex-col gap-24">
            {techniques.map((tech) => (
              <div key={tech._id} className="w-full">
                
                {/* 1. Header & Description */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pb-8 border-b border-[#666141]/20">
                  <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl text-black">
                      {tech.name}
                    </h2>
                    {tech.title && (
                      <p className="text-[#666141] text-xl md:text-2xl font-normal opacity-90">
                        {tech.title}
                      </p>
                    )}
                  </div>

                  {tech.description && (
                    <div className="space-y-4">
                      <p className="text-sm md:text-base text-black leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Process & Stats */}
                {(tech.meticulousProcess?.length > 0 || tech.timeInvestment || tech.masterArtisans) && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 py-8">
                    
                    {/* Left: Meticulous Process */}
                    {tech.meticulousProcess?.length > 0 && (
                      <div className="space-y-6">
                        <h3 className="text-black text-xl font-medium">
                          Meticulous Process
                        </h3>
                        <ul className="space-y-3">
                          {tech.meticulousProcess.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-black">
                              <span className="font-semibold text-[#666141]">✓</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Right: Stats */}
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                      {tech.timeInvestment && (
                        <div className="space-y-4">
                          <div className="w-10 h-10 border border-black/80 rounded-full flex items-center justify-center text-black">
                            <Clock size={20} />
                          </div>
                          <div>
                            <h4 className="text-black text-lg font-medium">Time Investment</h4>
                            <p className="text-sm text-black opacity-80 mt-1">{tech.timeInvestment}</p>
                          </div>
                        </div>
                      )}

                      {tech.masterArtisans && (
                        <div className="space-y-4">
                          <div className="w-10 h-10 border border-black/80 rounded-full flex items-center justify-center text-black">
                            <Users size={20} />
                          </div>
                          <div>
                            <h4 className="text-black text-lg font-medium">Master Artisans</h4>
                            <p className="text-sm text-black opacity-80 mt-1">{tech.masterArtisans}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Images */}
                {tech.images?.length > 0 && tech.images.some(img => img.url) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {tech.images.filter(img => img.url).map((image, idx) => (
                      <div key={idx} className="relative aspect-[5.5/3.5] overflow-hidden rounded-lg">
                        <Image 
                          src={image.url} 
                          alt={image.alt || `${tech.name} image ${idx + 1}`} 
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Products for this Technique */}
                {productsMap[tech._id]?.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl md:text-3xl text-[#666141] mb-6">
                      Products with {tech.name}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                      {productsMap[tech._id].map((product, index) => (
                        <ProductCard key={product._id} product={product} priority={index < 4} />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {techniques.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No techniques available yet.
              </p>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
};

export default TechniquesPage;
