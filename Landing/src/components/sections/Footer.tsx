"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import siteData from "../../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { navLinks, socialLinks } = siteData.footer;
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation - only plays once
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Links animation - only plays once
      gsap.fromTo(
        ".footer-link",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Social icons animation - only plays once
      gsap.fromTo(
        ".social-icon",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden mt-10"
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e3186c] to-transparent" />

      <div className="section-shell relative pt-20 pb-12">
        <div ref={logoRef} className="flex justify-center mb-10">
          <Link href="/" className="group relative">
            <img
              src="/logo.svg"
              alt="RiffinityAI Logo"
              width={250}
              height={100}
              className="relative z-10 opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        <div
          ref={linksRef}
          className="flex flex-wrap justify-center items-center gap-7 md:gap-14 mb-10"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="footer-link relative text-slate-400 font-sans font-medium text-sm md:text-base group"
            >
              <span className="relative z-10 group-hover:text-[#fbfffd] transition-colors duration-300">
                {link.label}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e3186c] to-[#38bdf8] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div
          ref={socialsRef}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon group relative"
          >
            <div className="relative w-11 h-11 flex items-center justify-center bg-slate-800/45 backdrop-blur-sm rounded-full border border-white/10 group-hover:border-[#e3186c]/50 transition-all duration-300 group-hover:scale-105">
              <FaGithub className="text-slate-400 group-hover:text-[#fbfffd] transition-colors duration-300 text-xl" />
            </div>
          </a>

          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon group relative"
          >
            <div className="relative w-11 h-11 flex items-center justify-center bg-slate-800/45 backdrop-blur-sm rounded-full border border-white/10 group-hover:border-[#38bdf8]/50 transition-all duration-300 group-hover:scale-105">
              <FaXTwitter className="text-slate-400 group-hover:text-[#38bdf8] transition-colors duration-300 text-xl" />
            </div>
          </a>

          <a
            href={socialLinks.email}
            className="social-icon group relative"
          >
            <div className="relative w-11 h-11 flex items-center justify-center bg-slate-800/45 backdrop-blur-sm rounded-full border border-white/10 group-hover:border-[#e3186c]/50 transition-all duration-300 group-hover:scale-105">
              <MdEmail className="text-slate-400 group-hover:text-[#e3186c] transition-colors duration-300 text-xl" />
            </div>
          </a>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon group relative"
          >
            <div className="relative w-11 h-11 flex items-center justify-center bg-slate-800/45 backdrop-blur-sm rounded-full border border-white/10 group-hover:border-[#38bdf8]/50 transition-all duration-300 group-hover:scale-105">
              <FaLinkedin className="text-slate-400 group-hover:text-[#38bdf8] transition-colors duration-300 text-xl" />
            </div>
          </a>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-slate-400 text-sm font-sans">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-[#e3186c] font-semibold">
              {siteData.name}
            </span>
            . All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
