"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  theme: 'light' | 'dark';
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ theme, onLoadingComplete }: LoadingScreenProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const loaderContentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadingDuration = 4.2;
    const fadeOutDuration = 0.8;
    
    const loaderElement = loaderRef.current;
    const progressBarElement = progressBarRef.current;
    const progressTextElement = progressTextRef.current;
    const loaderContentElement = loaderContentRef.current;
    const logoElement = logoRef.current;
    
    if (!loaderElement || !progressBarElement || !progressTextElement || !loaderContentElement || !logoElement) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderElement, {
          opacity: 0,
          duration: fadeOutDuration,
          onComplete: () => {
            onLoadingComplete();
            loaderElement.style.display = "none";
          }
        });
      }
    });
    
    const logoTl = gsap.timeline({repeat: -1, yoyo: true});
    logoTl.to(logoElement, {
      scale: 1.15,
      duration: 1.2,
      ease: "power1.inOut"
    });

    let progress = 0;
    
    tl.to(progressBarElement, {
      width: '100%',
      duration: loadingDuration,
      ease: 'power1.inOut',
      onUpdate: function() {
        progress = Math.round(tl.progress() * 100);
        
        if (progressTextElement) {
          progressTextElement.innerHTML = `${progress}%`;
        }
      }
    });

    return () => {
      tl.kill();
      logoTl.kill();
      gsap.killTweensOf(logoElement);
      gsap.killTweensOf(progressBarElement);
      gsap.killTweensOf(loaderElement);
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={loaderRef}
      className={`fixed top-0 left-0 w-full h-full z-[9999] flex flex-col items-center justify-center ${
        theme === 'dark' ? 'bg-[#18181b] text-white' : 'bg-[#f8f8fa] text-black'
      }`}
    >
      <div ref={loaderContentRef} className="w-[80%] max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div ref={logoRef} className="w-20 h-20 mb-6">
            <img src="/icons/logo.svg" alt="Logo" className="w-full h-full" />
          </div>
        </div>
        
        <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-blue-500 rounded-full"
            style={{ width: '0%' }}
          ></div>
        </div>
        
        <div className="mt-3 flex justify-between">
          <span>Loading experience</span>
          <span ref={progressTextRef} className="font-semibold">0%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;