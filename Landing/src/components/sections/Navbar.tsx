"use client";

import React from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { name: "Services", link: "#services" },
  { name: "Features", link: "#features" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact us", link: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#080906] border-b border-gray-600 border-[0.5px] mb-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center cursor-pointer">
          <img
            src="/logo.svg"
            alt="MeshSpire Logo"
            width={140}
            height={60}
            className="object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 font-sans">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-[#fbfffd] hover:text-slate-400 transition-colors duration-200 font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          href="https://riffinity-fe.vercel.app/"
          target="_blank"
          className="bg-[#e3186c] hover:bg-[#9c0543] text-[#fbfffd] font-bold px-6 py-2 rounded-full transition-colors duration-300 font-sans"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
