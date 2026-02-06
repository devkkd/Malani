"use client";

import React from "react";

const ethicalData = [
  {
    title: "What We Always Do",
    icon: "✓",
    items: [
      "Entirely Handmade Craftsmanship",
      "Prompt, Fair Artisan Compensation",
      "Safe, Dignified Workspaces",
      "Living Wages That Support Families",
      "Earth-friendly Materials Exclusively",
      "Transparent Supply Chain",
    ],
  },
  {
    title: "What We Never Do",
    icon: "✗",
    items: [
      "No Sweatshops, Ever",
      "No Child Labor- Zero Tolerance",
      "No Trafficked Workers",
      "No Toxic Materials",
      "Never Profit Over People",
      "No Murky Supply Chains",
    ],
  },
  {
    title: "Our Special Focus",
    icon: "♥",
    items: [
      "Women's Empowerment",
      "90% Women Artisans",
      "Women-led Facilities",
      "Female Leadership Opportunities",
      "Economic Independence For Women",
      "Community Transformation",
    ],
  },
];

const EthicalFoundation = () => {
  return (
    <div className="mt-12 border-t border-[#666141]/10">
      {/* --- Section: Our Ethical Foundation --- */}
      <div className="py-12 px-3">
        {/* Header */}
        <div className="text-center px-4 md:px-0 mb-16 space-y-6">
          <span className="text-[#666141] text-xl md:text-2xl font-normal opacity-90 block">
            Our Ethical Foundation
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
            The Principles That Guide Every Decision We Make
          </h2>
          <div className="max-w-4xl mx-auto pt-2 space-y-2 text-black text-sm md:text-base leading-relaxed opacity-90">
            <p>
              At Malani Impex, ethical excellence isn't negotiable it's the very
              foundation upon which we stand.
            </p>
            <p>
              Since 1981, we've built our entire enterprise on unwavering
              commitments to artisan dignity, environmental stewardship, and
              complete transparency.
            </p>
            <p>Here's exactly what that means:</p>
          </div>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ethicalData.map((col, index) => (
            <div
              key={index}
              className="bg-[#FFFCEA] rounded-[20px] p-8 md:p-10 space-y-8"
            >
              <h3 className="text-2xl text-black font-normal">{col.title}</h3>
              <ul className="space-y-4">
                {col.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm md:text-base text-black"
                  >
                    {/* Bullet Logic */}
                    <span
                      className={`
                        font-bold text-lg leading-none mt-0.5
                        ${index === 1 ? "text-black" : ""} 
                        ${index === 2 ? "text-[#CD5C5C]" : ""} /* Red for Heart */
                      `}
                    >
                      {index === 0 && "✓"}
                      {index === 1 && "✗"}
                      {index === 2 && "♥"}
                    </span>
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EthicalFoundation;