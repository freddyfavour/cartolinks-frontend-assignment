"use client";

import { useState, useEffect, useRef } from "react";
import Preview from "./Preview";
import { banners } from "@/constants";
import Image from "next/image";

export default function Carousel({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlides = banners.length;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(711.5);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateSlideWidth = () => {
      let width = 711.5;
      
      if (window.innerWidth < 640) {
        width = window.innerWidth - 48;
      } else if (window.innerWidth < 1024) {
        width = 562.5 + 24;
      }
      
      setSlideWidth(width);
      
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: currentSlide * width,
          behavior: 'auto'
        });
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [currentSlide]);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current || isDragging) return;
      
      const scrollPosition = carouselRef.current.scrollLeft;
      const newSlide = Math.round(scrollPosition / slideWidth);
      
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < maxSlides) {
        setCurrentSlide(newSlide);
      }
    };

    let scrollTimeout: NodeJS.Timeout | null = null;
    const debouncedHandleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    }
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', debouncedHandleScroll);
      }
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentSlide, slideWidth, isDragging, maxSlides]);

  const scrollToSlide = (slideIndex: number, behavior: ScrollBehavior = 'smooth') => {
    if (carouselRef.current) {
      const validSlideIndex = Math.min(Math.max(0, slideIndex), maxSlides - 1);
      
      requestAnimationFrame(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollTo({
            left: validSlideIndex * slideWidth,
            behavior
          });
        }
      });
    }
  };

  const handleNextSlide = () => {
    const newSlide = (currentSlide + 1) % maxSlides;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const handlePrevSlide = () => {
    const newSlide = (currentSlide - 1 + maxSlides) % maxSlides;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    requestAnimationFrame(() => {
      const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = scrollLeft - walk;
      }
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    requestAnimationFrame(() => {
      const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = scrollLeft - walk;
      }
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    setTimeout(() => {
      if (carouselRef.current) {
        const position = carouselRef.current.scrollLeft;
        const slideIndex = Math.min(Math.max(0, Math.round(position / slideWidth)), maxSlides - 1);
        setCurrentSlide(slideIndex);
        
        requestAnimationFrame(() => {
          scrollToSlide(slideIndex);
        });
      }
      
      setTimeout(startAutoScroll, 100);
    }, 50);
  };

  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    
    autoScrollRef.current = setInterval(() => {
      setCurrentSlide(prevSlide => {
        const newSlide = (prevSlide + 1) % maxSlides;
        
        requestAnimationFrame(() => {
          scrollToSlide(newSlide, 'smooth');
        });
        
        return newSlide;
      });
    }, 7000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startAutoScroll();
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  return (
    <section className={`w-full relative border-b py-6 md:py-8 lg:py-12 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
      <div className="w-full relative">
        <div 
          ref={carouselRef}
          className={`overflow-x-auto hide-scrollbar flex pb-6 md:pb-8 pt-2 md:pt-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            paddingLeft: '24px', 
            paddingRight: '24px',
            scrollSnapType: 'x mandatory',
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            willChange: 'scroll-position',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {banners.map((banner, index) => (
            <div 
              key={index} 
              style={{ 
                minWidth: `${slideWidth}px`, 
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always',
                paddingRight: index < banners.length - 1 ? '24px' : '0',
                transform: 'translateZ(0)'
              }}
            >
              <Preview banner={banner} index={index} isMobile={slideWidth < 500} />
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center mt-4 md:mt-6 relative pb-2 md:pb-4">
          <div className="flex items-center">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  scrollToSlide(index);
                }}
                className={`w-2 h-2 rounded-full mx-1 md:mx-1.5 transition-all duration-300 ${
                  index === currentSlide 
                    ? `w-3 md:w-4 ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}` 
                    : `${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-3 absolute right-4 md:right-6">
            <button
              onClick={handlePrevSlide}
              className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-black'
              }`}
              aria-label="Previous slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNextSlide}
              className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-black'
              }`}
              aria-label="Next slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4">
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
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          scroll-behavior: smooth;
          will-change: scroll-position;
        }
        
        @media (max-width: 640px) {
          .hide-scrollbar {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}