"use client";

import { useState, useEffect, useRef } from "react";
import Preview from "./Preview";
import { banners } from "@/constants";
import Image from "next/image";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlides = banners.length;
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNextSlide = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.scrollWidth;
      const itemWidth = containerWidth / maxSlides;
      const newSlide = (currentSlide + 1) % maxSlides;
      setCurrentSlide(newSlide);
      carouselRef.current.scrollTo({
        left: newSlide * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevSlide = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.scrollWidth;
      const itemWidth = containerWidth / maxSlides;
      const newSlide = (currentSlide - 1 + maxSlides) % maxSlides;
      setCurrentSlide(newSlide);
      carouselRef.current.scrollTo({
        left: newSlide * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="w-full py-8 relative border-b dark:border-gray-800">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar flex gap-4 pb-8 pt-2 pl-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {banners.map((banner, index) => (
            <Preview key={index} banner={banner} index={index} />
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  if (carouselRef.current) {
                    const containerWidth = carouselRef.current.scrollWidth;
                    const itemWidth = containerWidth / maxSlides;
                    carouselRef.current.scrollTo({
                      left: index * itemWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full mx-1 transition-all ${
                  index === currentSlide ? 'bg-gray-800 dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevSlide}
              className="w-8 h-8 rounded-full flex items-center justify-center shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNextSlide}
              className="w-8 h-8 rounded-full flex items-center justify-center shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}