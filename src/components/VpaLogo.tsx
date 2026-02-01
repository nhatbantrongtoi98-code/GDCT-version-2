
import React from 'react';

interface VpaLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

const VpaLogo: React.FC<VpaLogoProps> = ({ size = 100, className = "", animate = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${className} ${animate ? 'hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer' : ''}`}>
      {/* Outer Circle (Gold) */}
      <div 
        style={{ width: size, height: size }}
        className="rounded-full bg-[#DA251D] border-4 border-[#FFFF00] flex items-center justify-center shadow-lg relative"
      >
        {/* Star */}
        <svg 
          viewBox="0 0 51 48" 
          fill="#FFFF00" 
          width={size * 0.7} 
          height={size * 0.7}
        >
          <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
        </svg>
        
        {/* Simple Gear shape simulation if needed, but the classic logo is star in circle */}
      </div>
      {animate && (
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400 opacity-20 animate-ping"></div>
      )}
    </div>
  );
};

export default VpaLogo;
