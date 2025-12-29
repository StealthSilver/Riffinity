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
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Feature cards stagger animation
      gsap.from(".feature-card", {
        opacity: 0,
        y: 60,
        duration: 0.6,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

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
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black" />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(227,24,108,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.3) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e3186c] to-[#38bdf8] blur-3xl opacity-30" />
            <h2 className="relative text-5xl md:text-6xl font-heading font-bold text-[#fbfffd] mb-4">
              Why <span className="text-[#e3186c]">{siteData.name}</span>?
            </h2>
          </div>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto">
            Experience the difference with our cutting-edge features
          </p>
        </div>

        {/* Features Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="feature-card group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#e3186c]/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#e3186c]/0 via-[#38bdf8]/0 to-[#e3186c]/0 group-hover:from-[#e3186c]/10 group-hover:via-[#38bdf8]/5 group-hover:to-[#e3186c]/10 transition-all duration-500" />
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e3186c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="feature-icon mb-4 inline-flex p-3 bg-gradient-to-br from-[#e3186c]/20 to-[#38bdf8]/20 rounded-xl border border-white/10 group-hover:border-[#e3186c]/50 transition-all duration-300">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={32}
                    height={32}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold text-[#fbfffd] mb-3 group-hover:text-[#38bdf8] transition-all duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {card.description}
                </p>
              </div>

              {/* Bottom right accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#e3186c]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 flex justify-center">
          <div className="h-1 w-64 bg-gradient-to-r from-transparent via-[#e3186c] to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Features;
