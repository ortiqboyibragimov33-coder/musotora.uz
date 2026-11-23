import { useEffect, useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';

interface CafeImageProps {
  src: string;
  alt: string;
  placeholderLabel: string;
  aspectClassName?: string;
  roundedClassName?: string;
  className?: string;
  priority?: boolean;
}

export function CafeImage({
  src,
  alt,
  placeholderLabel,
  aspectClassName = 'aspect-[4/5]',
  roundedClassName = 'rounded-[18px]',
  className = '',
  priority = false,
}: CafeImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setStatus('loading');
  }, [src]);

  return (
    <div
      className={`group relative w-full overflow-hidden ${roundedClassName} bg-[#EAE8E0] border border-[#D9D6CA]/70 ${aspectClassName} ${className}`}
    >
      {/* Sokin me'moriy iliq qumrang zaxira ramka */}
      <div
        aria-hidden={status === 'loaded'}
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          status === 'loaded' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="w-full h-full border border-[#D9D6CA]/60 rounded-[12px] flex flex-col items-center justify-center px-5">
          <svg
            width="36"
            height="44"
            viewBox="0 0 36 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-3 text-[#5A5D52]/45 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            aria-hidden="true"
          >
            <path
              d="M4 42V18C4 10.268 10.268 4 18 4C25.732 4 32 10.268 32 18V42"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <line x1="1" y1="42" x2="35" y2="42" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="18" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          <p className="font-serif text-xl text-[#1C1E18]/75 tracking-normal">
            {placeholderLabel}
          </p>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-[#5A5D52]/70">
            {CAFE_INFO.brandDisplay}
          </p>
        </div>
      </div>

      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`relative z-10 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
