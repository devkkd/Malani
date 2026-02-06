import Image from "next/image";
import Container from "@/components/Container";
import techniques from "@/data/techniquesData.json";
import { notFound } from "next/navigation";

export default function TechniquePage({ params }) {
  const { slug } = params;

  console.log(slug , "slug");

  const technique = techniques.find(t => t.id === slug);

  if (!technique) {
    notFound();
  }

  return (
    <section className="w-full bg-[#FFFEF5] py-16 px-4 md:px-8">
      <Container>
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#666141]">
              {technique.title}
            </h1>
            <p className="text-black text-lg md:text-xl font-medium pt-2">
              {technique.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="gap-36 flex flex-col lg:flex-row mb-24">
            <h2 className="text-[#666141] text-2xl md:text-4xl font-normal">
              Craftsmanship Honored Across Centuries
            </h2>

            <div className="space-y-6">
              <p className="text-black text-sm md:text-base leading-relaxed">
                {technique.description1}
              </p>

              {technique.description2 && (
                <p className="text-black text-sm md:text-base leading-relaxed">
                  {technique.description2}
                </p>
              )}
            </div>
          </div>

          {/* Process + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8 border-b border-[#666141]/20">

            {/* Checklist */}
            <div className="space-y-6">
              <h3 className="text-black text-xl font-medium">
                {technique.processTitle}
              </h3>

              <ul className="space-y-1">
                {technique.checklist.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-black">
                    <span className="font-semibold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats (TEXT ONLY) */}
            <div className="flex flex-wrap gap-12">
              {technique.stats.map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-black text-lg font-medium">
                    {stat.label}
                  </h4>
                  <p className="text-sm text-black opacity-80 mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {technique.images.map((imgSrc, idx) => (
              <div key={idx} className="relative aspect-[5.5/3.5] overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={`${technique.title} image ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
