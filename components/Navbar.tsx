"use client";
import { navLinks, rightNavLinks } from "@/constants";
import Image from "next/image";


export default function Navbar({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) {
  const activeIndex = 0;

  return (
    <nav className={`w-full h-[56px] flex items-center justify-between px-2 sm:px-4 md:px-6 ${theme === 'dark' ? 'bg-[#18181b] border-gray-800' : 'bg-white border-gray-100'} border-b`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border ${theme === 'dark' ? 'bg-[#23232a] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
          <Image src="/icons/logo.svg" alt="Krea AI Logo" width={22} height={22} className={theme === 'dark' ? 'invert brightness-200' : ''} />
        </div>
        <div className="flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2">
          <Image 
            src="/icons/profile.svg" 
            alt="Profile" 
            width={20} 
            height={20} 
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-gray-200 dark:border-gray-700" 
          />
          <span className={`font-medium text-xs sm:text-sm md:text-base truncate max-w-[100px] sm:max-w-[140px] md:max-w-full ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            benevolentintim8ekbot
          </span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="none" 
            className={`hidden sm:inline-block ml-0 sm:ml-1 ${theme === 'dark' ? 'invert brightness-200' : ''}`}
          >
            <path 
              d="M6 8l4 4 4-4" 
              stroke="#888" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <div 
          className={`flex items-center rounded-2xl shadow border ${theme === 'dark' ? 'bg-[#23232a] border-gray-700' : 'bg-white border-gray-100'}`} 
          style={{ minWidth: 'min(280px, 90%)', maxWidth: 420 }}
        >
          <div className="flex items-center justify-between w-full px-1 py-1 overflow-x-auto hide-scrollbar">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`min-w-[36px] h-9 sm:min-w-[40px] sm:h-10 flex items-center justify-center rounded-xl transition-all duration-150 ${
                  i === activeIndex
                    ? theme === 'dark' 
                      ? 'bg-gray-100 text-gray-900 shadow scale-105' 
                      : 'bg-gray-900 shadow text-white scale-105'
                    : theme === 'dark'
                      ? 'hover:bg-[#23232a] text-gray-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                }`}
                style={{ outline: i === activeIndex ? '2px solid #e5e7eb' : undefined }}
              >
                <Image 
                  src={link.icon} 
                  alt={link.label} 
                  width={18} 
                  height={18}
                  className={`sm:w-5 sm:h-5 ${theme === 'dark' ? 'invert brightness-200' : ''}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Spacer for small screens to ensure proper alignment */}
      <div className="flex-1 md:hidden"></div>

      <div className="flex items-center gap-1 sm:gap-2 justify-end">
        {/* Right nav links - only visible on md screens and above */}
        <div className="hidden md:flex items-center gap-2">
          {rightNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition ${
                theme === 'dark' 
                  ? 'hover:bg-[#23232a] text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Image 
                src={link.icon} 
                alt={link.label} 
                width={16} 
                height={16} 
                className={theme === 'dark' ? 'invert brightness-200' : ''}
              />
              <span className="hidden lg:inline">{link.label}</span>
            </a>
          ))}
        </div>
        
        {/* Theme toggle - visible on all screen sizes */}
        <button
          className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition ${
            theme === 'dark' ? 'hover:bg-[#23232a]' : 'hover:bg-gray-100'
          }`}
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <Image src="/icons/moon.svg" alt="Dark mode" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" />
          ) : (
            <Image src="/icons/sun.svg" alt="Light mode" width={16} height={16} className="sm:w-[18px] sm:h-[18px] invert brightness-200" />
          )}
        </button>
        
        {/* Mobile menu button - only shown on smaller screens */}
        <button 
          className={`md:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition ${
            theme === 'dark' ? 'hover:bg-[#23232a]' : 'hover:bg-gray-100'
          }`}
          aria-label="Mobile menu"
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            className={theme === 'dark' ? 'invert brightness-200' : ''}
          >
            <path 
              d="M4 6h16M4 12h16M4 18h16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

// Adding CSS for hide-scrollbar in both components
<style jsx global>{`
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>