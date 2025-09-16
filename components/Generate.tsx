import { generateFeatures } from "@/constants";
import FeatureCard from "./FeatureCard";

interface GenerateProps {
  theme?: 'light' | 'dark';
}

export default function Generate({ theme = 'light' }: GenerateProps) {
  return (
    <section className="w-full py-8 px-2 border-b dark:border-gray-800">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Generate</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
            Show all
            <svg width="12" height="12" viewBox="0 0 24 24" className="ml-1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {generateFeatures.map((feature, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)] xl:w-[calc(25%-9px)]">
              <FeatureCard
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                href={feature.href}
                bgColor={feature.bgColor}
                theme={theme}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}