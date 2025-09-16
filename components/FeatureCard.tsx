import Image from "next/image";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: string;
  href: string;
  bgColor: string;
  theme?: 'light' | 'dark';
}

// Helper function to convert Tailwind color classes to gradient values
const getGradient = (colorClass: string) => {
  const colorMap: Record<string, string> = {
    'blue-500': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    'amber-500': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    'cyan-500': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    'slate-500': 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    'purple-500': 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
    'green-500': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    'red-500': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    'rose-500': 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    // Fallback
    'default': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
  };
  
  return colorMap[colorClass] || colorMap['default'];
};

export default function FeatureCard({ title, desc, icon, href, bgColor, theme = 'light' }: FeatureCardProps) {
  const isNew = title === "Image" || title === "Enhancer" || title === "Video LipSync" || title === "Motion Transfer";

  // Apply text color based on the theme
  const textTitleColor = theme === 'dark' ? 'text-white' : 'text-black';
  const textDescColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const bgButtonColor = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const textButtonColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const hoverButtonColor = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  return (
    <div className={`rounded-lg flex items-center p-4 relative min-h-[100px] w-full`}>
      {/* Icon with gradient/3D effect background */}
      <div 
        className={`w-10 h-10 rounded-lg flex justify-center items-center flex-shrink-0 relative overflow-hidden`}
        style={{
          background: getGradient(bgColor.replace('bg-', '')),
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 2px 3px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="w-5 h-5 relative z-10">
          <Image 
            src={icon} 
            alt={title}
            fill
            className="object-contain invert brightness-200"
          />
        </div>
        {/* Highlight overlay for 3D effect */}
        <div className="absolute inset-0 bg-white opacity-10 rounded-t-lg" style={{ height: '40%', top: 0 }}></div>
      </div>
      
      {/* Content area */}
      <div className="ml-4 flex-grow pr-20">
        <div className="flex items-center mb-1">
          <h3 className={`font-medium text-base ${textTitleColor}`}>
            {title}
          </h3>
          {isNew && (
            <span className={`ml-1.5 text-[10px] leading-none px-1 py-0.5 ${theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'} rounded`}>
              New
            </span>
          )}
        </div>
        
        <p className={`text-sm ${textDescColor} line-clamp-2`}>
          {desc}
        </p>
      </div>
      
      {/* Open button - aligned with content */}
      <a 
        href={href} 
        className={`absolute top-1/2 -translate-y-1/2 right-4 px-4 py-1.5 rounded text-xs font-medium ${textButtonColor} ${bgButtonColor} ${hoverButtonColor} transition-colors`}
      >
        Open
      </a>
    </div>
  );
}