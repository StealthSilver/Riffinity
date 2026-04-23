"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import siteData from "../../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cardData = [
    {
      icon: "/icons/ease.svg",
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, but not as expensive as buying one.",
    },
    {
      icon: "/icons/cloud.svg",
      title: "100% uptime",
      description: "We can't be taken down by anyone",
    },
    {
      icon: "/icons/fast.svg",
      title: "The fastest",
      description: "We will connect you to your tutors in limited time",
    },
    {
      icon: "/icons/heart.svg",
      title: "24/7 Customer Support",
      description:
        "We are available a 100% of the time. At least our AI Agents are.",
    },
    {
      icon: "/icons/refund.svg",
      title: "Money back",
      description: "If we can't serve you. You need not pay",
    },
    {
      icon: "/icons/money.svg",
      title: "Best pricing",
      description: "Lowest learning prices. We don't overcharge",
    },
    {
      icon: "/icons/tutor.svg",
      title: "Enhanced Documentation",
      description: "Everything is documented for your ease of use",
    },
    {
      icon: "/icons/cluster.svg",
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - only plays once
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Feature cards stagger animation - only plays once
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: {
            amount: 0.8,
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Floating animation for icons
      gsap.to(".feature-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 1,
          from: "random",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative overflow-hidden"
    >
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#e3186c] blur-3xl opacity-10" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(227,24,108,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.3) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
        }}
      />

      <div className="section-shell relative">
        <div ref={titleRef} className="text-center mb-14 md:mb-20">
          <div className="inline-block relative">
            <h2 className="section-title relative text-3xl sm:text-4xl md:text-6xl mb-4">
              Why <span className="text-[#e3186c]">{siteData.name}</span>?
        </h2>
          </div>
          <p className="section-copy text-base sm:text-lg mt-5 sm:mt-6 mx-auto">
            Experience the difference with our cutting-edge features
          </p>
      </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="feature-card glass-card group relative rounded-2xl p-6 hover:border-[#e3186c]/35 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#e3186c]/0 via-[#38bdf8]/0 to-[#e3186c]/0 group-hover:from-[#e3186c]/10 group-hover:via-[#38bdf8]/5 group-hover:to-[#e3186c]/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="feature-icon mb-4 inline-flex p-3 bg-gradient-to-br from-[#e3186c]/20 to-[#38bdf8]/20 rounded-xl border border-white/10 group-hover:border-[#e3186c]/50 transition-all duration-300">
              <Image
                src={card.icon}
                alt={card.title}
                width={32}
                height={32}
                    className="group-hover:scale-110 transition-transform duration-300"
              />
                </div>

                <h3 className="text-xl font-heading font-bold text-[#fbfffd] mb-3 group-hover:text-[#38bdf8] transition-all duration-300">
                {card.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {card.description}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
