"use client";
import { navLinks, rightNavLinks } from "@/constants";
import Image from "next/image";


export default function Navbar({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) {
  const activeIndex = 0;

  return (
    <nav className={`w-full h-[56px] flex items-center justify-between px-2 md:px-6 ${theme === 'dark' ? 'bg-[#18181b] border-gray-800' : 'bg-white border-gray-100'} border-b`}>
      <div className="flex items-center gap-3 min-w-[220px]">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg border ${theme === 'dark' ? 'bg-[#23232a] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
          <Image src="/icons/logo.svg" alt="Krea AI Logo" width={24} height={24} className={theme === 'dark' ? 'invert brightness-200' : ''} />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <Image src="/icons/profile.svg" alt="Profile" width={28} height={28} className="rounded-full object-cover border border-gray-200 dark:border-gray-700" />
          <span className={`font-medium text-sm ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>benevolentintim8ekbot</span>
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 20 20" 
            fill="none" 
            className={`ml-1 ${theme === 'dark' ? 'invert brightness-200' : ''}`}
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

      <div className="flex-1 flex justify-center">
        <div 
          className={`flex items-center rounded-2xl shadow border ${theme === 'dark' ? 'bg-[#23232a] border-gray-700' : 'bg-white border-gray-100'}`} 
          style={{ minWidth: 320, maxWidth: 420 }}
        >
          <div className="flex items-center justify-between w-full px-1 py-1">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150 ${
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
                  width={20} 
                  height={20} 
                  className={theme === 'dark' ? 'invert brightness-200' : ''} 
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-[220px] justify-end">
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
            <span className="hidden md:inline">{link.label}</span>
          </a>
        ))}
        <button 
          className={`w-9 h-9 flex items-center justify-center rounded-full transition ${
            theme === 'dark' ? 'hover:bg-[#23232a]' : 'hover:bg-gray-100'
          }`} 
          aria-label="Notifications"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            className={theme === 'dark' ? 'invert brightness-200' : ''}
          >
            <path 
              d="M10 17a2 2 0 0 0 2-2H8a2 2 0 0 0 2 2Zm6-3V9a6 6 0 1 0-12 0v5l-1 1v1h14v-1l-1-1Z" 
              stroke={theme === 'dark' ? 'white' : 'black'} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={`w-9 h-9 flex items-center justify-center rounded-full transition ${
            theme === 'dark' ? 'hover:bg-[#23232a]' : 'hover:bg-gray-100'
          }`}
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <Image src="/icons/moon.svg" alt="Dark mode" width={18} height={18} />
          ) : (
            <Image src="/icons/sun.svg" alt="Light mode" width={18} height={18} className="invert brightness-200" />
          )}
        </button>
        {/* Profile icon */}
        <button className={`w-9 h-9 flex items-center justify-center rounded-full transition ${
          theme === 'dark' ? 'hover:bg-[#23232a]' : 'hover:bg-gray-100'
        }`}>
          <Image 
            src="/icons/profile.svg" 
            alt="Profile" 
            width={20} 
            height={20} 
          />
        </button>
      </div>
    </nav>
  );
}