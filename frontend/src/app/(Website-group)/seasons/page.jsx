"use client";
import Container from '@/components/website/Container';
import Image from 'next/image';

const AllSeasonsPage = () => {

  // --- DATA: All 4 Collections ---
  const seasonsData = [
    // 1. Summer Collection
    {
      id: "summer",
      title: "Summer Collection",
      subtitle: "Light, Breathable, Exceptionally Beautiful",
      description: "When temperatures gently rise and warm breezes flow, embrace textiles lovingly crafted for refreshing comfort. Our Summer Collection celebrates the season with lightweight fabrics, cooling colors, and breathable weaves that honor both tradition and your desire for effortless elegance.",
      icon: "/images/seasons/seasonsIcon1.png",
      features: [
        {
          heading: "Premium Materials",
          items: [
            "Lightweight organic cotton in airy weaves",
            "Breathable natural linen",
            "Fine, natural fibers that move with you",
            "Gauze and voile for ethereal lightness",
            "Pre-washed fabrics for immediate softness"
          ]
        },
        {
          heading: "Featured Techniques",
          items: [
            "Hand block printing with cooling botanical motifs",
            "Delicate, open-weave patterns",
            "Natural, skin-safe dyes in refreshing palettes",
            "Minimal embellishment for lightness",
            "Breezy screen prints in calming hues"
          ]
        },
        {
          heading: "Signature Color Palette",
          items: [
            "Crisp whites and soft ivories",
            "Ocean blues and aqua tones",
            "Fresh mint and sage greens",
            "Sunny yellows and soft corals",
            "Natural beiges and soft greys"
          ]
        },
        {
          heading: "Perfect For",
          items: [
            "Light, breathable cushion covers",
            "Airy decorative throws for cool evenings",
            "Elegant table linens for outdoor entertaining",
            "Lightweight window treatments",
            "Breezy bedding accents",
            "Sophisticated summer décor pieces"
          ]
        }
      ],
      products: [
        {
          img: "/images/seasons/seasonsP1.png",
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP1 - Copy.png",
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP1 - Copy (2).png",
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP1 - Copy (3).png",
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        }
      ]
    },

    // 2. Festival Collection
    {
      id: "festival",
      title: "Festival Collection",
      subtitle: "Celebration Woven with Joy and Splendor",
      description: "India's festivals are magnificent celebrations of color, light, and joy. Our Festival Collection honors these cherished occasions with textiles that capture the vibrant spirit of celebration from Diwali's luminous beauty to Holi's exuberant colors, from Eid's elegant grace to Christmas's warm gatherings. Each piece is designed to transform your space into a celebration of culture, tradition, and togetherness.",
      icon: "/images/seasons/seasonIcon2.png", // Dummy Path
      features: [
        {
          heading: "Premium Materials",
          items: [
            "Rich, lustrous cotton and silk blends",
            "Opulent velvet accents",
            "Shimmering brocade details",
            "Premium cotton with metallic thread work",
            "Luxurious, densely woven fabrics"
          ]
        },
        {
          heading: "Featured Techniques",
          items: [
            "Intricate hand embroidery with metallic threads",
            "Traditional zari and gota work",
            "Mirror work (shisha) for brilliant sparkle",
            "Rich jewel-toned natural dyes",
            "Elaborate appliqué with embellishment",
            "Dense Chikan embroidery in festive patterns",
            "Hand block prints in celebratory motifs"
          ]
        },
        {
          heading: "Signature Color Palette",
          items: [
            "Rich jewel tones ruby, emerald, sapphire",
            "Festive golds and shimmering silvers",
            "Deep burgundy and royal purple",
            "Vibrant oranges and sunset reds",
            "Auspicious marigold yellows",
            "Traditional festive combinations"
          ]
        },
        {
          heading: "Perfect For",
          items: [
            "Statement cushion covers for festive décor",
            "Luxurious table runners and elegant placemats",
            "Ceremonial wall hangings",
            "Special occasion throws and decorative pieces",
            "Gift-worthy textile treasures",
            "Temple and prayer room textiles",
            "Celebration hosting essentials"
          ]
        }
      ],
      products: [
        {
          img: "/images/seasons/seasonsP2.png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP2 - Copy.png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP2 - Copy (2).png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP2 - Copy (3).png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        }
      ]
    },

    // 3. Winter Collection
    {
      id: "winter",
      title: "Winter Collection",
      subtitle: "Warmth Lovingly Woven with Expert Care",
      description: "Embrace the comfort of masterfully hand-crafted textiles thoughtfully designed for cooler months. Our Winter Collection wraps you in layers of warmth, rich textures, and comforting hues that transform your space into a cozy sanctuary. Each piece is created to provide not just physical warmth, but the emotional comfort of being truly, beautifully cocooned.",
      icon: "/images/seasons/seasonIcon3.png", // Dummy Path
      features: [
        {
          heading: "Premium Materials",
          items: [
            "Thick, luxurious cotton weaves",
            "Expertly quilted textiles with natural fill",
            "Carefully layered fabrics for insulation",
            "Dense, warming wool blends",
            "Plush, substantial cotton flannel",
            "Heavy-weight upholstery fabrics"
          ]
        },
        {
          heading: "Featured Techniques",
          items: [
            "Traditional Kantha quilting with dense stitching",
            "Substantial, intricate embroidery",
            "Rich, warm color palettes",
            "Heavy hand block printing",
            "Layered appliqué work",
            "Thick, textured weaves"
          ]
        },
        {
          heading: "Signature Color Palette",
          items: [
            "Deep burgundy and wine reds",
            "Rich chocolate and warm browns",
            "Forest greens and deep teals",
            "Warm ochres and burnt oranges",
            "Charcoal greys and midnight blues",
            "Traditional winter whites and creams"
          ]
        },
        {
          heading: "Perfect For",
          items: [
            "Substantial cushion covers for layered comfort",
            "Luxurious quilts and warming throws",
            "Premium upholstery fabrics for furniture",
            "Warm decorative statement pieces",
            "Heavy table linens for cozy gatherings",
            "Insulating window treatments",
            "Layered bedding essentials"
          ]
        }
      ],
      products: [
        {
          img: "/images/seasons/seasonsP3.png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP3 - Copy.png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP3 - Copy (2).png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP3 - Copy (3).png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        }
      ]
    },

    // 4. Year-Round Classics Collection
    {
      id: "classics",
      title: "Year-Round Classics Collection",
      subtitle: "Timeless Elegance for Every Season",
      description: "Some pieces transcend seasons designs so perfectly balanced, colors so universally appealing, and quality so enduring that they remain beautiful and relevant throughout the year. Our Year-Round Classics Collection features these timeless treasures. These are the pieces you'll reach for again and again, the textiles that form the foundation of your home's aesthetic, the investment pieces that serve you beautifully across all seasons and occasions.",
      icon: "/images/seasons/seasonIcon4.png", // Dummy Path
      features: [
        {
          heading: "Premium Materials",
          items: [
            "Medium-weight premium cotton in perfect balance",
            "Versatile cotton-linen blends",
            "Classic, durable weaves",
            "Natural fibers in transitional weights",
            "Pre-washed fabrics that age beautifully",
            "Colorfast, fade-resistant textiles"
          ]
        },
        {
          heading: "Featured Techniques",
          items: [
            "Classic hand block printing in timeless patterns",
            "Elegant, moderate embroidery",
            "Traditional geometric designs",
            "Versatile screen prints",
            "Refined appliqué work",
            "Subtle, sophisticated embellishment"
          ]
        },
        {
          heading: "Signature Color Palette",
          items: [
            "Sophisticated neutrals: taupe, greige, warm grey",
            "Classic navy and deep indigo",
            "Timeless black and crisp white",
            "Warm natural earth tones",
            "Soft muted jewel tones",
            "Elegant two-color combinations"
          ]
        },
        {
          heading: "Perfect For",
          items: [
            "Foundation cushion covers for any décor style",
            "Versatile throws for year round use",
            "Classic table linens for daily, special occasions",
            "Transitional upholstery fabrics",
            "Timeless bedding essentials",
            "Professional and residential spaces alike",
            "Gift-giving for any occasion"
          ]
        }
      ],
      products: [
        {
          img: "/images/seasons/seasonsP4.png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP4 - Copy.png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP4 - Copy (2).png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        },
        {
          img: "/images/seasons/seasonsP4 - Copy (3).png", // Dummy Path
          name: "Cushion Cover (Product name)",
          serial: "#123445678 (Serial Number)",
          desc: "Cotton Block Print (Fabric with Techniques)"
        }
      ]
    }
  ];

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
      <Container>
        <div className="max-w-[1400px] mx-auto">



          {/* --- SEASONS LOOP --- */}
          <div className="flex flex-col gap-24">
            {seasonsData.map((season) => (
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

export default AllSeasonsPage;