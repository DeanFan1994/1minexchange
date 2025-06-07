import React from 'react';

interface LogoWallProps {
  logos: { id: number; logo: string }[];
}

export default function LogoWall({ logos }: LogoWallProps) {
  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-lg flex items-center justify-center p-2 sm:p-3 md:p-4 transition-transform hover:scale-105"
          >
            <img
              src={logo.logo}
              alt={`Partner logo ${logo.id}`}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/src/assets/images/partners/default.png';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}