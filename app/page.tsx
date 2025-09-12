"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import Generate from "@/components/Generate";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      // Check user's system preference first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme as 'light' | 'dark';
      }
      // If no saved preference, use browser/system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#18181b]' : 'bg-[#f8f8fa]'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex flex-col flex-1">
        <Carousel />
        <Generate />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
