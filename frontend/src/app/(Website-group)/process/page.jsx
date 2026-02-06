import Container from '@/components/website/Container';
import EthicalFoundation from '@/components/website/EthicalData';
import Image from 'next/image';

const ProcessPage = () => {
  const processSteps = [
    {
      id: 1,
      number: '01',
      label: 'Raw Fabric',
      image: '/images/process/p1.png',
      heading: 'Premium quality materials sourced responsibly',
      description:
        'We begin with the finest fabrics organic cotton, natural fibers, and premium textiles sourced from ethical suppliers. Every material choice reflects our commitment to quality and environmental responsibility.',
    },
    {
      id: 2,
      number: '02',
      label: 'Design',
      image: '/images/process/p2.png',
      heading: 'Traditional patterns adapted with modern sensibilities',
      description:
        'Our design team many of them women artisans themselves create patterns that honor centuries-old motifs while meeting contemporary aesthetic needs. Each design carries cultural significance and artistic integrity.',
    },
    // --- UPDATED STEP 3 ---
    {
      id: 3,
      number: '03',
      label: 'Crafting',
      image: '/images/process/p3.png',
      heading: 'Skilled artisans bring designs to life',
      description:
        'This is where magic happens. Through hand block printing, intricate embroidery, careful dyeing, or meticulous appliqué work, our artisans transform simple fabric into works of art. Each technique requires years of training and patient dedication.',
      subHeading: 'What Happens Here',
      checklist: [
        'Hand block printing (2-3 days per piece)',
        'Chikan embroidery (7-21 days for intricate pieces)',
        'Kantha stitching (10-30 days of meditative work)',
        'Natural dyeing with earth-safe pigments',
        'Careful washing and finishing',
      ],
    },
    // --- UPDATED STEP 4 ---
    {
      id: 4,
      number: '04',
      label: 'Quality Check',
      image: '/images/process/p4.jpg',
      heading: 'Rigorous inspection for perfection',
      description:
        'Every single piece undergoes thorough inspection by experienced quality supervisors—many of them senior women artisans.',
      subHeading: 'We check for',
      checklist: [
        'Stitch integrity and consistency',
        'Color accuracy and fastness',
        'Fabric quality and finish',
        'Overall craftsmanship excellence',
        'Dimensional accuracy',
      ],
      footerNote:
        'Only pieces that meet our exacting standards bear the Malani Impex name.',
    },
    // --- UPDATED STEP 5 ---
    {
      id: 5,
      number: '05',
      label: 'To You',
      image: '/images/process/p5.jpg',
      heading: 'Carefully packaged and shipped worldwide',
      description:
        'Your textile is lovingly packaged in our biodegradable, plant-starch bags (never harmful plastic), wrapped with care, and shipped directly to you.',
      subHeading: 'Each package includes',
      checklist: [
        'Care instructions for longevity',
        'Information about the artisan who created it',
        'Certificate of authenticity',
        'Story of the technique used',
      ],
      footerNote:
        "When you open your package, you're not just receiving a product you're welcoming a piece of Indian heritage, created by skilled hands, into your home.",
    },
  ];

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-16">
      <Container>
        <div className="mx-auto">
          {/* --- Section Header --- */}
          <div className="text-center mb-20 space-y-6">
            <h1 className="text-5xl md:text-6xl text-primary">
              Process Malani Impex
            </h1>
            <div className="space-y-1 text-black text-[18px] md:text-[22px] font-medium">
              <p>Handcrafted with Love in Jaipur, India</p>
              <p>
                Every Piece Tells a Story, Every Purchase Supports a Tradition
              </p>
            </div>
          </div>

          {/* --- Process Steps Loop --- */}
          <div className="flex flex-col gap-20 md:gap-32">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
              >
                {/* Column 1: Number & Label (Left Side) */}
                <div className="md:col-span-3 flex flex-col pt-2">
                  <span className="text-5xl md:text-6xl text-primary opacity-90 mb-2">
                    {step.number}
                  </span>
                  <span className="text-3xl md:text-5xl text-primary leading-tight">
                    {step.label}
                  </span>
                </div>

                {/* Column 2: Image (Middle) */}
                <div className="md:col-span-4 relative aspect-square w-full overflow-hidden max-w-[350px]">
                  {/* Using next/image simply - ensure width/height or fill is configured in your project */}
                  <img
                    src={step.image}
                    alt={step.label}
                    className="object-cover w-full h-full rounded-sm shadow-sm"
                  />
                </div>

                {/* Column 3: Description & Checklist (Right Side) */}
                <div className="md:col-span-5 flex flex-col justify-center pt-2">
                  <h3 className="text-2xl md:text-3xl text-secondary mb-5 leading-tight font-medium">
                    {step.heading}
                  </h3>

                  <p className="text-gray-800 text-sm md:text-[15px] leading-relaxed max-w-lg mb-6">
                    {step.description}
                  </p>

                  {/* Render Checklist if it exists (For steps 3, 4, 5) */}
                  {step.checklist && (
                    <div className="mb-6">
                      {step.subHeading && (
                        <h4 className="text-black font-medium text-sm mb-3">
                          {step.subHeading}
                        </h4>
                      )}
                      <ul className="space-y-2">
                        {step.checklist.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            {/* Checkmark Icon */}
                            <span className="text-black font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Render Footer Note if it exists */}
                  {step.footerNote && (
                    <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed border-t border-gray-200 pt-3 mt-2">
                      {step.footerNote}
                    </p>
                  )}
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

export default ProcessPage;