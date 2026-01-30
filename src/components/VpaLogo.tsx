import React from 'react';

interface VpaLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

const VpaLogo: React.FC<VpaLogoProps> = ({ size = 80, className = "", animate = false }) => {
  return (
    <div 
      className={`relative flex items-center justify-center ${className} ${animate ? 'animate-vpa-float' : ''}`}
      style={{ width: size, height: size }}
    >
      {/* Sử dụng SVG chuẩn của Quân đội Nhân dân Việt Nam */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/vi/1/1a/Logo_Qu%C3%A2n_%C4%91%E1%BB%99i_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.svg" 
        alt="VPA Logo"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        className="drop-shadow-lg"
      />

      <style>{`
        @keyframes vpa-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-vpa-float {
          animation: vpa-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VpaLogo;
