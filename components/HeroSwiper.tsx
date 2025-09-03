"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
// If you had a local SubmitQuoteButton, keep this import:
import SubmitQuoteButton from "./SubmitQuoteButton";

type HeroProps = {
  images?: string[];
  intervalMs?: number; // autoplay delay
  transitionMs?: number; // fade duration
};

export default function Hero({
  images = ["/banner.jpg", "/services.jpg", "/k3.jpg"],
  intervalMs = 6000,
  transitionMs = 800,
}: HeroProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length),[images.length]);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // Autoplay
  useEffect(() => {
    if (paused || images.length <= 1) return;
    if(timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, intervalMs);
    return () => clearInterval(timerRef.current!);
  }, [paused, images.length, intervalMs, next]);

  // Keyboard arrows (← →)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0} // allow keyboard focus/arrow control
      aria-roledescription="carousel"
      aria-label="Hero Background Carousel"
    >
      {/* Slides */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => {
          const isActive = i === index;
          return (
            <div
              key={src + i}
              className={`absolute inset-0 transition-opacity ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDuration: `${transitionMs}ms` }}
              aria-hidden={!isActive}
            >
              {/* Subtle zoom (Ken Burns) only on active frame */}
              <div className={`absolute inset-0 ${isActive ? "kenburns" : ""}`}>
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-900/80"></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-black/40"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Printing Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Quality printing solutions for your business. From business cards to banners,
            we deliver excellence in every print.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Products
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
            <SubmitQuoteButton />
          </div>
        </div>
      </div>

      {/* Nav Buttons */}
      {images.length > 1 && (
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
      )}

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
