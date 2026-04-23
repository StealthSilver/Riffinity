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
      // Title animation - only plays once
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Cards animation - only plays once
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

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
      className="relative overflow-hidden"
    >
      <div className="absolute top-16 right-10 w-80 h-80 bg-[#e3186c] rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-16 left-10 w-80 h-80 bg-[#38bdf8] rounded-full blur-3xl opacity-10" />

      <div className="section-shell relative">
        <div ref={titleRef} className="text-center mb-14 md:mb-20">
          <div className="inline-block">
            <h2 className="section-title text-3xl sm:text-4xl md:text-6xl mb-4">
          {siteData.servicesTitle}
        </h2>
            <div className="mx-auto h-1 w-36 bg-gradient-to-r from-transparent via-[#e3186c] to-transparent" />
          </div>
          <p className="section-copy text-base sm:text-lg mt-5 sm:mt-6 mx-auto">
            Discover powerful AI-driven solutions tailored to your needs
          </p>
      </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {siteData.services.map((service, idx) => (
            <div
            key={idx}
              className="service-card glass-card group relative rounded-2xl p-6 sm:p-8 overflow-hidden hover:border-[#e3186c]/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#e3186c]/10 to-[#38bdf8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-[#e3186c]/15 to-[#38bdf8]/15 rounded-xl border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  {service.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#fbfffd] mb-3 sm:mb-4 group-hover:text-[#38bdf8] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
