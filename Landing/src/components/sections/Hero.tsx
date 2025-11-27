"use client";

import React from "react";
import Link from "next/link";
import siteData from "../../data";
import { WavyBackground } from "../ui/Waves";

const Hero = () => {
  return (
    <WavyBackground
      colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
      waveWidth={60}
      backgroundFill="black"
      blur={12}
      speed="fast"
      waveOpacity={0.5}
      containerClassName="h-screen relative"
    >
      <section
        id="home"
        className="relative max-w-7xl mx-auto pt-12 px-4 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center justify-center pt-6">
          <button
            className="bg-slate-900 text-[#fbfffd] font-small font-sans px-6 md:px-10 py-1 text-sm md:text-base hover:bg-black transition-all duration-300 rounded-full border border-white mb-6 md:mb-0"
            style={{ borderWidth: "0.5px" }}
          >
            New! Ultimate AI Companion
          </button>

          <div className="relative inline-block pt-4 md:pt-20 text-center">
            <h1 className="md:text-6xl text-4xl font-heading font-bold text-[#fbfffd] tracking-tighter relative z-10">
              {siteData.heroTitle}
            </h1>
          </div>

          <p className="md:text-3xl text-base font-sans pt-10 text-[#fbfffd] text-center px-6 md:px-32">
            {siteData.heroDescription}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center pt-12 gap-6 md:gap-[120px]">
            <Link
              href="https://riffinity-main.vercel.app/"
              target="_blank"
              className="bg-[#e3186c] hover:bg-[#9c0543] text-[#fbfffd] font-sans font-bold px-10 py-2 md:px-20 rounded-full transition-colors duration-300 cursor-pointer inline-block text-sm md:text-base"
            >
              Login
            </Link>
            <Link
              href="#contact"
              className="bg-black font-sans text-[#fbfffd] font-bold px-10 py-2 md:px-14 hover:bg-white hover:text-black transition-all duration-300 rounded-full border border-white w-[160px] md:w-[200px] text-sm md:text-base text-center flex items-center justify-center"
            >
              Contact us
            </Link>
          </div>
        </div>

        <img
          src="/Hero.png"
          alt="Dashboard dark"
          width={1280}
          height={750}
          className="w-[90%] h-full object-contain sticky top-0 right-0 border-[10px] mt-10 md:mt-[136px] border-gray-600 rounded-2xl z-10"
        />
      </section>
    </WavyBackground>
  );
};

export default Hero;
