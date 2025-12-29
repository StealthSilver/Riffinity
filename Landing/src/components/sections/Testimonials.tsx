"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "RiffinityAI has transformed how I work. The AI is incredibly intuitive and saves me hours every day!",
    name: "Sarah Johnson",
    title: "Content Creator",
    rating: 5,
  },
  {
    quote: "Best AI companion I've ever used. The code assistance is phenomenal and actually understands context.",
    name: "Michael Chen",
    title: "Software Engineer",
    rating: 5,
  },
  {
    quote: "The brainstorming feature helped me launch my startup. It's like having a creative partner 24/7.",
    name: "Emily Rodriguez",
    title: "Entrepreneur",
    rating: 5,
  },
  {
    quote: "Incredible value for money. The productivity boost alone pays for itself within days.",
    name: "David Park",
    title: "Marketing Director",
    rating: 5,
  },
  {
    quote: "Finally, an AI that feels natural to interact with. The responses are always relevant and helpful.",
    name: "Lisa Anderson",
    title: "Research Analyst",
    rating: 5,
  },
  {
    quote: "The writing assistant is a game-changer. My blog posts are better and take half the time to create.",
    name: "James Wilson",
    title: "Blogger",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards animation
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Continuous subtle animation for cards
      gsap.to(".testimonial-card", {
        y: -5,
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
      id="testimonials"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#38bdf8] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#e3186c] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#fbfffd] mb-4">
              Loved by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e3186c] to-[#38bdf8]">
                people everywhere
              </span>
            </h2>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e3186c] to-transparent" />
          </div>
          <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their workflow
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="testimonial-card group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#e3186c]/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#e3186c]/0 to-[#38bdf8]/0 group-hover:from-[#e3186c]/10 group-hover:to-[#38bdf8]/10 transition-all duration-500" />

              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-[#e3186c]/20 group-hover:text-[#e3186c]/40 transition-colors duration-300">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#e3186c] group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-base leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e3186c] to-[#38bdf8] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[#fbfffd] font-heading font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-400 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e3186c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "50K+", label: "Tasks Completed" },
            { number: "4.9/5", label: "User Rating" },
            { number: "24/7", label: "Support" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl border border-white/10 backdrop-blur-sm hover:border-[#e3186c]/50 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e3186c] to-[#38bdf8] mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 text-sm font-sans">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
