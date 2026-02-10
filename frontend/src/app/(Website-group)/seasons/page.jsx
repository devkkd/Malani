"use client";
import { useState, useEffect } from 'react';
import Container from '@/components/website/Container';
import EthicalData from '@/components/website/EthicalData';
import Image from 'next/image';

const AllSeasonsPage = () => {
  const [seasonsData, setSeasonsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setSeasonsData(result.data);
        }
      } catch (error) {
        console.error('Error fetching seasons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
        <Container>
          <div className="text-center py-20">
            <p className="text-[#666141] text-lg">Loading seasons...</p>
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
      <Container>
        <div className="max-w-[1400px] mx-auto">

          {/* --- SEASONS LOOP --- */}
          <div className="flex flex-col gap-24">
            {seasonsData.map((season) => (
              <div key={season._id} className="w-full">

                {/* 1. Header Row (Title left, Icon right) */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                  <div className="space-y-3 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl text-black leading-tight">
                      {season.title || season.name}
                    </h2>
                    {season.subtitle && (
                      <h3 className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90">
                        {season.subtitle}
                      </h3>
                    )}
                    {season.description && (
                      <p className="text-black text-sm md:text-base leading-relaxed pt-2">
                        {season.description}
                      </p>
                    )}
                  </div>

                  {/* Icon - Using iconImage */}
                  {(season.iconImage?.url || season.icon) && (
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                      <Image
                        src={season.iconImage?.url || season.icon}
                        alt={season.iconImage?.alt || `${season.name} Icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* 2. Features Grid (Beige Background) */}
                {season.features && season.features.length > 0 && (
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
                )}
              </div>
            ))}
          </div>

        </div>
      </Container>
      <Container>
        <EthicalData />
      </Container>
    </section>
  );
};

export default AllSeasonsPage;