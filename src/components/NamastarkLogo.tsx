import React from 'react';

export interface NamastarkLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  height?: number | string;
}

export const NamastarkLogo: React.FC<NamastarkLogoProps> = ({
  className = '',
  theme = 'auto',
  size = 'md',
  height,
}) => {
  const isDark = theme === 'dark';

  // Responsive default heights
  const heightStyle = height 
    ? { height: typeof height === 'number' ? `${height}px` : height } 
    : {
        height: size === 'xs' ? '22px' : size === 'sm' ? '30px' : size === 'lg' ? '46px' : size === 'xl' ? '60px' : '38px',
      };

  return (
    <div 
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={heightStyle}
    >
      <img
        src={isDark ? '/namastark-logo-white.svg' : '/namastark-logo.svg'}
        alt="Namastark Digital Marketing"
        className="h-full w-auto object-contain block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
