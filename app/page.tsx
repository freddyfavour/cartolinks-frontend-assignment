"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import Generate from "@/components/Generate";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [themeInitialized, setThemeInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    setThemeInitialized(true);
  }, []);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    navbar: useRef<HTMLDivElement>(null),
    carousel: useRef<HTMLDivElement>(null),
    generate: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  const handleLoadingComplete = () => {
    window.scrollTo(0, 0);
    
    setLoading(false);
    
    if (!mainContentRef.current) {
      return;
    }
    
    mainContentRef.current.style.opacity = "1";
    
    const tl = gsap.timeline();
    
    tl.fromTo(mainContentRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, ease: "power2.inOut", immediateRender: false }
    );
    
    const sectionElements = [
      sectionRefs.navbar.current,
      sectionRefs.carousel.current,
      sectionRefs.generate.current,
      sectionRefs.gallery.current
    ].filter(element => element !== null);
    
    if (sectionElements.length > 0) {
      tl.fromTo(sectionElements, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );
    }
  };

  return (
    <>
      {loading && <LoadingScreen theme={theme} onLoadingComplete={handleLoadingComplete} />}
      
      <div 
        ref={mainContentRef}
        className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-[#f8f8fa]'}`}
        style={{ 
          visibility: loading ? 'hidden' : 'visible', 
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div ref={sectionRefs.navbar}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
        </div>
        <main className="flex flex-col flex-1 pt-[56px] mb-10">
          <div ref={sectionRefs.carousel}>
            <Carousel theme={theme} />
          </div>
          <div ref={sectionRefs.generate}>
            <Generate theme={theme} />
          </div>
          <div ref={sectionRefs.gallery}>
            <Gallery theme={theme} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
