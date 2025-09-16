import Image from "next/image";

export default function Preview({ banner, index, isMobile = false }: { banner: any; index?: number; isMobile?: boolean }) {
  const showTag = true;

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden flex-shrink-0 shadow-lg ${
        isMobile ? 'h-[300px] w-full' : 'h-[350px] sm:h-[400px] w-[437.5px] sm:w-[562.5px] md:w-[687.5px]'
      }`} 
      style={{ margin: '0 12px' }}
    >
      <div className="absolute inset-0">
        <Image 
          src={banner?.bg}
          alt={banner?.tag || "Banner"} 
          fill 
          className="object-cover z-0" 
          priority
          unoptimized
        />
      </div>
      <div className="absolute inset-0 z-[1]">
        <div className="absolute bottom-0 left-0 right-0" style={{ 
          height: '32.5%',
          background: `
            linear-gradient(to top, 
              rgba(0,0,0,0.85) 0%, 
              rgba(0,0,0,0.65) 40%, 
              rgba(0,0,0,0.4) 70%, 
              rgba(0,0,0,0.15) 85%, 
              rgba(0,0,0,0) 100%
            )
          `
        }}></div>
      </div>

      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
        {showTag && (
          <div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase" style={{ 
              textShadow: '0px 1px 2px rgba(0,0,0,0.5)' 
            }}>
              {banner?.tag || "WAN IMAGE MODEL"}
            </span>
          </div>
        )}

        <div className="flex justify-between items-end">
          <div className="max-w-[70%] sm:max-w-[65%]">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2" style={{ 
              textShadow: '0px 1px 2px rgba(0,0,0,0.6)' 
            }}>
              {banner?.subtitle || "Image generation"}
            </h3>
            <p className={`${isMobile ? 'text-xs line-clamp-2' : 'text-xs sm:text-sm'} text-gray-200`} style={{ 
              textShadow: '0px 1px 1px rgba(0,0,0,0.4)' 
            }}>
              {banner?.text || "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultra-realistic textures."}
            </p>
          </div>
          
          <div>
            <a 
              href={banner?.cta?.href || "#"} 
              className={`inline-flex items-center justify-center bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-200 ${
                isMobile ? 'text-xs px-3 py-1.5' : 'text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2'
              }`}
            >
              {banner?.cta?.label || "Try Now"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}