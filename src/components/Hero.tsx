import { useEffect, useState } from 'react';
import { CAFE_INFO, USER_PATIO_PHOTO } from '../data/cafeData';

interface HeroProps {
  onOpenMenu: () => void;
  onBookTable: () => void;
  heroImage?: string;
}

export function Hero({
  onOpenMenu,
  onBookTable,
  heroImage = USER_PATIO_PHOTO,
}: HeroProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setStatus('loading');
  }, [heroImage]);

  return (
    <section
      id="top"
      className="pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Markazlashtirilgan katta serif sarlavha */}
        <div className="mx-auto max-w-[920px] text-center">
          <h1
            style={{ animationDelay: '0ms' }}
            className="animate-hero-reveal font-serif uppercase text-[clamp(2.5rem,6vw,4.9rem)] leading-[0.98] tracking-[-0.02em] text-[#1C1E18] text-balance"
          >
            Sokin Hashamat va
            <br />
            <em className="italic font-normal">Muso To‘ra</em> Taʼmi
          </h1>

          {/* Sarlavha ostidagi markaziy zaytun-yashil CTA tugma */}
          <div
            style={{ animationDelay: '120ms' }}
            className="animate-hero-reveal relative z-20 mt-7 md:mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={onOpenMenu}
              className="inline-flex items-center justify-center rounded-full bg-[#4F5D34] hover:bg-[#3F4B28] px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#F5F3ED] shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              Menyuni ko‘rish
            </button>

            <button
              type="button"
              onClick={onBookTable}
              className="inline-flex items-center justify-center rounded-full bg-white/45 hover:bg-white/70 backdrop-blur-md border border-white/65 shadow-[0_4px_20px_rgba(28,30,24,0.05),inset_0_1px_0_rgba(255,255,255,0.75)] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#1C1E18] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              Stol band qilish
            </button>
          </div>
        </div>

        {/* Organik to‘lqinsimon qirqimli keng bosh rasm */}
        <div
          style={{ animationDelay: '220ms' }}
          className="animate-hero-reveal relative mx-auto mt-6 md:-mt-3 max-w-[1060px]"
        >
          {/* SVG organik niqob (clipPath) */}
          <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
            <defs>
              <clipPath id="muso-organic-hero-clip" clipPathUnits="objectBoundingBox">
                <path d="M 0.04,0.14 C 0.14,0.02 0.25,0.03 0.36,0.10 C 0.48,0.17 0.56,0.17 0.68,0.09 C 0.80,0.01 0.92,0.02 0.97,0.13 C 1.01,0.23 1.00,0.73 0.96,0.86 C 0.91,0.99 0.79,0.99 0.67,0.92 C 0.54,0.85 0.44,0.86 0.32,0.93 C 0.19,1.00 0.08,0.98 0.03,0.84 C -0.01,0.70 -0.01,0.24 0.04,0.14 Z" />
              </clipPath>
            </defs>
          </svg>

          <div
            style={{ clipPath: 'url(#muso-organic-hero-clip)' }}
            className="group relative w-full aspect-[16/11] md:aspect-[16/9] overflow-hidden bg-[#EAE8E0]"
          >
            {/* Zaxira iliq ramka */}
            <div
              aria-hidden={status === 'loaded'}
              className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500 ${
                status === 'loaded' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <p className="font-serif text-3xl text-[#1C1E18]/75">
                {CAFE_INFO.brandDisplay}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#5A5D52]">
                Hotel Muso To‘ra · Xiva
              </p>
            </div>

            {status !== 'error' && (
              <img
                key={heroImage}
                src={heroImage}
                alt="Hotel Muso To'ra ichki hovlisi, ayvon va mehmonxona muhiti"
                referrerPolicy="no-referrer"
                loading="eager"
                onLoad={() => setStatus('loaded')}
                onError={() => setStatus('error')}
                className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
                  status === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
