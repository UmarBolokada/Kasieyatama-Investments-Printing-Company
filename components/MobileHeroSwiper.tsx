"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
// If you had a local SubmitQuoteButton, keep this import:
import SubmitQuoteButton from "./SubmitQuoteButton";

type HeroSlide = {
  src: string;
  title: string;
  description?: string;
  ctaPrimary?: { href: string; label: string };
  ctaSecondary?: { href: string; label: string };
  align?: "left" | "right"; // which side to place text
};

type HeroProps = {
  images?: string[];
  mobileImages?: string[];
  intervalMs?: number; // autoplay delay
  transitionMs?: number; // fade duration
  slides?: HeroSlide[]; // optional richer slide content
};

export default function MobileHero({
  images = ["/hero-mobile1.png", "/hero-mobile2.png", "/hero-mobile3.png"],
  intervalMs = 4000,
  transitionMs = 600,
  slides,
}: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Build slides from images if explicit slides not provided
  const computedSlides: HeroSlide[] = (slides && slides.length > 0)
    ? slides
    : images.map((src, i) => ({
        src,
        title: i === 0 ? "Professional Printing Services" : i === 1 ? "Quality. Speed. Reliability." : "Bring Your Ideas To Life",
        description: i === 0
          ? "Quality printing solutions for your business. From business cards to banners, we deliver excellence in every print."
          : i === 1
          ? "From small runs to large formats, we deliver premium results on time."
          : "Custom designs, vibrant colors, and durable finishes for every need.",
        ctaPrimary: { href: "/products", label: "Shop Products" },
        ctaSecondary: { href: "/upload", label: "Upload Print" },
        align: "left"
      }));

const next = useCallback(() => setIndex((i) => (i + 1) % computedSlides.length), [computedSlides.length]);
const prev = () => setIndex((i) => (i - 1 + computedSlides.length) % computedSlides.length);

// Autoplay
useEffect(() => {
  if (paused || computedSlides.length <= 1) return;
  if (timerRef.current) clearInterval(timerRef.current);
  timerRef.current = setInterval(next, intervalMs);
  return () => clearInterval(timerRef.current!);
}, [paused, computedSlides.length, intervalMs, next]);

// Keyboard arrows (← →)
const onKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
};

  return (
    <section
      className="sm:hidden relative min-h-[600px] flex items-center justify-center overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    //   onKeyDown={onKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Hero Carousel"
    >
      {/* Slides */}
      <div className="absolute inset-0 z-0">
        {computedSlides.map((slide, i) => {
          const isActive = i === index;
          const alignRight = slide.align === "right";
          return (
            <div
              key={slide.src + i}
              className={`absolute inset-0 transition-opacity ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDuration: `${transitionMs}ms` }}
            //   aria-hidden={!isActive}
            >
              {/* Background image */}
              <div className={`absolute inset-0 ${isActive ? "kenburns" : ""}`}>
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-right"
                />
              </div>

              {/* Slide content - on one side, moves with the slide */}
              <div className="relative h-full w-full">
                <div className={`h-fit pt-5 mx-auto px-4 sm:px-6 lg:px-8 flex items-center ${alignRight ? "justify-end" : "justify-start"}`}>
                  <div className={`w-full sm:w-[520px] md:w-[560px] lg:w-[600px] ${alignRight ? "text-right" : "text-left"}`}>
                    <h1 className={`text-4xl md:text-6xl font-bold leading-tight ${i === 0 ? "text-white drop-shadow-md" : "text-slate-800"}`}>
                      {slide.title}
                    </h1>
                    {slide.description && (
                      <p className={`mt-4 text-lg md:text-2xl leading-relaxed ${i === 0 ? "text-white/95 drop-shadow" : "text-gray-700"} ${alignRight ? "ml-auto" : ""}`}>
                        {slide.description}
                      </p>
                    )}
                    <div className={`mt-5 flex ${i === 0 ? 'flex-row':'flex-col'} ${alignRight ? "justify-end" : "justify-start"} gap-2`}>
                      {slide.ctaPrimary && (
                        <Link
                          href={slide.ctaPrimary.href}
                          className={`inline-flex items-center px-3 md:px-8 py-3 md:py-4 bg-white font-semibold rounded-lg transition-colors shadow-lg ${i === 0 ? "text-blue-600 hover:bg-gray-100 w-fit" : "text-black hover:bg-gray-100 w-full"}`}
                        >
                          {slide.ctaPrimary.label}
                          <ArrowRightIcon className="ml-2 w-4 h-4" />
                        </Link>
                      )}
                      {/* <SubmitQuoteButton theme={i === 0 ? 'light' : 'dark'} w={i !== 0 ? 'w-full' : undefined} /> */}
                      {slide.ctaSecondary && (
                        <Link
                          href={slide.ctaSecondary.href}
                          className={`inline-flex items-center px-6 md:px-8 py-3 md:py-4 border-2 font-semibold rounded-lg transition-colors ${i === 0 ? "border-white text-white hover:bg-white/10" : "border-black text-black hover:bg-black/10"}`}
                        >
                          {slide.ctaSecondary.label}
                          <ArrowRightIcon className="ml-2 w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content overlays removed as requested (no gradient or dark overlay) */}

      {/* Nav Buttons */}
      {/* {computedSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="group absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/30 bg-white/20 backdrop-blur hover:bg-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="h-6 w-6 text-white group-active:scale-95 transition-transform">
              <path fillRule="evenodd"
                    d="M15.78 4.22a.75.75 0 010 1.06L9.06 12l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z"
                    clipRule="evenodd" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            className="group absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/30 bg-white/20 backdrop-blur hover:bg-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="h-6 w-6 text-white group-active:scale-95 transition-transform">
              <path fillRule="evenodd"
                    d="M8.22 19.78a.75.75 0 010-1.06L14.94 12 8.22 5.28a.75.75 0 111.06-1.06l7.25 7.25a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0z"
                    clipRule="evenodd" />
            </svg>
          </button>
        </>
      )} */}

      {/* Styled-JSX for Ken Burns animation */}
      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
        .kenburns {
          width: 100%;
          height: 100%;
          animation: kenburns ${Math.max(transitionMs, 1200) + 4800}ms ease-in-out forwards;
        }
      `}</style>
    </section>
  );
}
