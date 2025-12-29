"use client";

import React, { useEffect, useRef } from "react";
import siteData from "../../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards animation
      gsap.from(".service-card", {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover effect setup
      const cards = document.querySelectorAll(".service-card");
      cards.forEach((card) => {
        const element = card as HTMLElement;
        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#e3186c] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#38bdf8] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#fbfffd] mb-4">
              {siteData.servicesTitle}
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e3186c] to-transparent" />
          </div>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto">
            Discover powerful AI-driven solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.services.map((service, idx) => (
            <div
              key={idx}
              className="service-card group relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 overflow-hidden hover:border-[#e3186c]/50 transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#e3186c]/10 to-[#38bdf8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e3186c]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-[#e3186c]/20 to-[#38bdf8]/20 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-heading font-bold text-[#fbfffd] mb-4 group-hover:text-[#38bdf8] transition-all duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-[#e3186c] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
