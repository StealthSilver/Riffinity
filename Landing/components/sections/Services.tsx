"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import siteData from "../../data";
import { Icon } from "../ui/Icon";

const Services = () => {
  return (
    <section
      id="services"
      className="py-20 px-4 mt-40 flex flex-col items-center justify-center mx-4 bg-black rounded-2xl shadow-md gap-20 overflow-x-hidden"
    >
      <div className="border border-white/[0.2] flex flex-col items-start mx-auto p-3 md:p-6 relative mb-12">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 text-[#fbfffd]" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-[#fbfffd]" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 text-[#fbfffd]" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-[#fbfffd]" />
        <h2 className="text-4xl font-heading font-semibold text-[#fbfffd]">
          {siteData.servicesTitle}
        </h2>
      </div>

      <BentoGrid className="mt-2 font-sans">
        {siteData.services.map((service, idx) => (
          <BentoGridItem
            key={idx}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Services;
