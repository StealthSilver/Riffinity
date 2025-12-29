"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - only plays once
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Button animation - only plays once
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // Floating orbs
      gsap.to(orb1Ref.current, {
        x: 30,
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        x: -40,
        y: 40,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(orb3Ref.current, {
        x: 20,
        y: 30,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Pulse animation for button (after it appears)
      setTimeout(() => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, 1000);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(227,24,108,.5) 2px, transparent 2px), linear-gradient(90deg, rgba(56,189,248,.5) 2px, transparent 2px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-20 left-20 w-64 h-64 bg-[#e3186c] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-20 right-20 w-80 h-80 bg-[#38bdf8] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c084fc] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Main CTA Card */}
        <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-12 md:p-20 border border-white/10 overflow-hidden">
          {/* Subtle top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e3186c]/50 to-transparent" />
          
          {/* Subtle corner glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3186c]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#38bdf8]/5 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Title */}
            <div ref={titleRef}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-[#fbfffd] mb-4 leading-tight">
                Ready to{" "}
                <span className="text-[#e3186c]">
                  Transform
                </span>
              </h2>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-[#fbfffd] mb-8 leading-tight">
                Your Workflow?
              </h2>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                Join thousands of users who are already experiencing the future of AI assistance
              </p>
            </div>

            {/* Button */}
        <Link
              ref={buttonRef}
          href="https://riffinity-fe.vercel.app/"
          target="_blank"
              className="group relative inline-flex items-center justify-center gap-2 bg-[#e3186c] text-[#fbfffd] font-sans font-bold px-16 py-5 rounded-full overflow-hidden transition-all duration-300 hover:bg-[#9c0543] hover:shadow-2xl hover:shadow-[#e3186c]/30"
            >
              <span className="relative z-10 text-lg">Get Started Now</span>
              
              {/* Arrow */}
              <svg
                className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </Link>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#e3186c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#e3186c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free trial available</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#e3186c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
