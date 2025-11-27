import React from "react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import siteData from "../../data";

const Footer = () => {
  const { navLinks, socialLinks } = siteData.footer;

  return (
    <footer
      id="contact"
      className="overflow-x-hidden py-4 px-4 mt-20 top-10 flex items-center bg-slate-800 max-w-7xl mx-auto justify-center flex-col gap-4 rounded-3xl"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mt-10">
          <Link href="/">
            <img
              src="/logo.svg"
              alt="Dashboard dark"
              width={250}
              height={100}
            />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center font-sans gap-8 sm:gap-16 mt-12 text-sm sm:text-base">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-slate-400 font-medium tracking-tight hover:text-[#fbfffd] transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-[40px] text-slate-400 mt-10 text-xl">
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
          <FaGithub className="hover:text-[#fbfffd] transition-colors duration-300" />
        </a>
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-[#fbfffd] transition-colors duration-300" />
        </a>
        <a href={socialLinks.email}>
          <MdEmail className="hover:text-[#fbfffd] transition-colors duration-300" />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="hover:text-[#fbfffd] transition-colors duration-300" />
        </a>
      </div>

      <div className="w-[85%] sm:w-[65%] h-[0.5px] bg-slate-600 mt-8" />

      <p className="text-sm text-slate-400">
        &copy; {new Date().getFullYear()} {siteData.name}. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
