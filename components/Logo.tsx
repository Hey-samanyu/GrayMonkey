import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="256" cy="256" r="256" fill="#6B7280" />
        <path 
          d="M256 96 L230 140 C200 150 170 150 150 170 C130 190 120 210 120 240 C100 240 90 270 100 290 C110 310 130 315 140 310 C140 340 150 370 170 390 C200 420 240 430 256 430 C272 430 312 420 342 390 C362 370 372 340 372 310 C382 315 402 310 412 290 C422 270 412 240 392 240 C392 210 382 190 362 170 C342 150 312 150 282 140 L300 90 L330 120 L350 80 L380 130 C370 140 360 150 360 150 L256 96 Z" 
          fill="#1F2937" 
        />
        <path d="M135 250 C125 260 125 280 135 290" stroke="#374151" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M377 250 C387 260 387 280 377 290" stroke="#374151" strokeWidth="6" fill="none" strokeLinecap="round" />
        <ellipse cx="256" cy="350" rx="95" ry="65" fill="#E5E7EB" />
        <path d="M235 335 Q245 325 256 335 Q267 325 277 335" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <ellipse cx="242" cy="345" rx="5" ry="8" fill="#1F2937" />
        <ellipse cx="270" cy="345" rx="5" ry="8" fill="#1F2937" />
        <path d="M210 380 Q256 410 300 375" fill="none" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
        <path d="M300 375 L295 365" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
        <g transform="translate(0, 0)">
          <line x1="220" y1="210" x2="292" y2="210" stroke="#D1D5DB" strokeWidth="8" />
          <line x1="220" y1="225" x2="292" y2="225" stroke="#D1D5DB" strokeWidth="4" />
          <path d="M130 210 Q130 170 175 170 Q220 170 220 210 V230 Q220 270 175 270 Q130 270 130 230 Z" fill="#111827" stroke="#D1D5DB" strokeWidth="6" />
          <path d="M292 210 Q292 170 337 170 Q382 170 382 210 V230 Q382 270 337 270 Q292 270 292 230 Z" fill="#111827" stroke="#D1D5DB" strokeWidth="6" />
          <g opacity="0.3" fill="white">
            <path d="M145 180 L165 180 L155 260 L135 260 Z" />
            <path d="M175 180 L190 180 L180 220 L165 220 Z" />
            <path d="M307 180 L327 180 L317 260 L297 260 Z" />
            <path d="M337 180 L352 180 L342 220 L327 220 Z" />
          </g>
        </g>
      </svg>
    );
  }

  return (
    <img 
      src="/logo.png" 
      alt="Gray Monkey Logo" 
      className={`${className} object-cover rounded-full`}
      onError={() => setImgError(true)}
    />
  );
};