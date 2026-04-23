"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const NAV_ITEMS = [
  { name: "Services", link: "#services" },
  { name: "Features", link: "#features" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact us", link: "#contact" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(navRef.current, { y: -100, opacity: 0 });
      gsap.set(".nav-item", { opacity: 0, y: -20 });

      // Animate in (stays visible)
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate nav items
      gsap.to(".nav-item", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/65 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 gap-3">
        <Link href="/" className="flex items-center cursor-pointer group">
          <div className="relative rounded-xl px-2 py-1 transition-colors duration-300 group-hover:bg-white/5">
          <img
            src="/icons/logo.svg"
              alt="RiffinityAI Logo"
            width={140}
            height={60}
              className="w-28 sm:w-[140px] h-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-[1.02]"
          />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-9 font-sans">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="nav-item relative text-[#fbfffd]/80 font-medium group"
            >
              <span className="relative z-10 transition-colors duration-200 group-hover:text-[#fbfffd]">
              {item.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e3186c] to-[#38bdf8] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <Link
          href="https://riffinity-fe.vercel.app/"
          target="_blank"
          className="nav-item btn-primary inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 z-20 whitespace-nowrap"
        >
          <span className="relative z-10">Get started</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
