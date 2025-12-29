"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import siteData from "../../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingRef1 = useRef<HTMLDivElement>(null);
  const floatingRef2 = useRef<HTMLDivElement>(null);
  const floatingRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([badgeRef.current, titleRef.current, descRef.current, imageRef.current], { 
        opacity: 0 
      });
      gsap.set(badgeRef.current, { y: -30 });
      gsap.set(titleRef.current, { y: 50 });
      gsap.set(descRef.current, { y: 30 });
      gsap.set(imageRef.current, { y: 100, scale: 0.95 });
      gsap.set(buttonsRef.current?.children || [], { opacity: 0, y: 20 });

      // Animate in (these will stay visible)
      gsap.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.to(buttonsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 1,
      });

      // Floating animations for orbs
      gsap.to(floatingRef1.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(floatingRef2.current, {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(floatingRef3.current, {
        y: -25,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div
        ref={floatingRef1}
        className="absolute top-20 left-10 w-72 h-72 bg-[#e3186c] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
      />
      <div
        ref={floatingRef2}
        className="absolute top-40 right-10 w-96 h-96 bg-[#38bdf8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
      />
      <div
        ref={floatingRef3}
        className="absolute bottom-20 left-1/2 w-80 h-80 bg-[#c084fc] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 bg-grid opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-20 flex flex-col items-center justify-center">
        {/* Badge */}
        <div ref={badgeRef} className="mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e3186c] to-[#38bdf8] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-slate-900/90 backdrop-blur-sm text-[#fbfffd] font-sans px-8 py-3 rounded-full border border-white/20 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e3186c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e3186c]"></span>
              </span>
              <span className="text-sm md:text-base">New! Ultimate AI Companion</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-[#fbfffd] tracking-tight text-center mb-8 leading-tight"
        >
          {siteData.heroTitle}
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg md:text-2xl font-sans text-slate-300 text-center max-w-4xl mb-12 leading-relaxed"
        >
          {siteData.heroDescription}
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20 z-10 relative"
        >
          <Link
            href="https://riffinity-fe.vercel.app/"
            target="_blank"
            className="group relative bg-[#e3186c] text-[#fbfffd] font-sans font-bold px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#e3186c]/50 hover:bg-[#9c0543]"
          >
            <span className="relative z-10">Get Started</span>
          </Link>
          <Link
            href="#contact"
            className="group relative bg-transparent text-[#fbfffd] font-sans font-bold px-12 py-4 rounded-full border-2 border-white/30 hover:border-white/60 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <span className="relative z-10">Contact Us</span>
          </Link>
        </div>

        {/* Hero Image */}
        <div ref={imageRef} className="relative w-full max-w-6xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#e3186c]/20 to-transparent rounded-3xl blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-slate-900/50">
            <img
              src="/Hero.png"
              alt="Dashboard preview"
              className="w-full h-auto object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
