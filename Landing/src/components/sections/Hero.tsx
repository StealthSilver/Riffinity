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
      className="relative min-h-screen overflow-hidden"
    >
      <div
        ref={floatingRef1}
        className="absolute -top-20 left-8 w-72 h-72 bg-[#e3186c] rounded-full blur-3xl opacity-20"
      />
      <div
        ref={floatingRef2}
        className="absolute top-24 right-10 w-96 h-96 bg-[#38bdf8] rounded-full blur-3xl opacity-20"
      />
      <div
        ref={floatingRef3}
        className="absolute bottom-6 left-[40%] w-80 h-80 bg-[#c084fc] rounded-full blur-3xl opacity-10"
      />

      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-32 flex flex-col items-center justify-center">
        <div ref={badgeRef} className="mb-8 sm:mb-10">
          <div className="glass-card rounded-full px-4 sm:px-6 py-2.5 border border-white/20 text-[#fbfffd] flex items-center gap-2 text-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e3186c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e3186c]"></span>
              </span>
            <span className="text-sm md:text-base">Smart workspace for AI productivity</span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-[#fbfffd] tracking-tight text-center mb-6 sm:mb-7 leading-[1.08] sm:leading-[1.05]"
        >
              {siteData.heroTitle}
            </h1>

        <p
          ref={descRef}
          className="text-base sm:text-lg md:text-2xl font-sans text-slate-300 text-center max-w-3xl mb-10 sm:mb-14 leading-relaxed"
        >
            {siteData.heroDescription}
          </p>

        <div
          ref={buttonsRef}
          className="w-full max-w-md sm:max-w-none flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20 z-10 relative"
        >
            <Link
              href="https://riffinity-fe.vercel.app/"
              target="_blank"
            className="btn-primary inline-flex items-center justify-center font-sans font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 w-full sm:w-auto min-h-12"
            >
            <span className="relative z-10">Get started</span>
            </Link>
            <Link
              href="#contact"
            className="btn-secondary inline-flex items-center justify-center font-sans font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 w-full sm:w-auto min-h-12"
            >
            <span className="relative z-10">Contact us</span>
            </Link>
        </div>

        <div ref={imageRef} className="relative w-full max-w-6xl px-1 sm:px-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e3186c]/20 to-[#38bdf8]/20 rounded-3xl blur-2xl" />
          <div className="glass-card relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
        <img
          src="/Hero.png"
              alt="Dashboard preview"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>
  );
};

export default Hero;
