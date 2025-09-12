import Image from "next/image";

export default function Preview({ banner, index }: { banner: any; index?: number }) {
  const showTag = true;

  return (
    <div className="h-[400px] relative rounded-2xl overflow-hidden mx-2 flex-shrink-0 w-[550px] shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
        <Image 
          src={banner?.bg}
          alt={banner?.tag || "Banner"} 
          fill 
          className="object-cover z-0" 
          priority
          unoptimized
        />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {showTag && (
          <div>
            <span className="text-sm font-bold text-white tracking-wider uppercase">
              {banner?.tag || "WAN IMAGE MODEL"}
            </span>
          </div>
        )}

        <div className="flex justify-between items-end">
          <div className="max-w-[65%]">
            <h3 className="text-2xl font-bold text-white mb-2">{banner?.subtitle || "Image generation"}</h3>
            <p className="text-sm text-gray-200">
              {banner?.text || "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultra-realistic textures."}
            </p>
          </div>
          
          <div>
            <a 
              href={banner?.cta?.href || "#"} 
              className="inline-flex items-center justify-center bg-white text-black font-medium text-sm px-4 py-2 rounded-full hover:bg-gray-100"
            >
              {banner?.cta?.label || "Try Now"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}