import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';
import { useInView } from '../hooks/useInView';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export function Footer({ onOpenLegal }: FooterProps) {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValid) {
      setError('Iltimos, to‘g‘ri elektron pochta manzilini kiriting.');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="scroll-mt-20 border-t border-[#D9D6CA] bg-[#F5F3ED] pt-20 pb-12 md:pt-24 md:pb-14"
    >
      <div
        className={`reveal-on-scroll mx-auto max-w-[1200px] px-6 md:px-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 pb-16 md:pb-20">
          {/* 1-ustun: Brend va xabarnoma */}
          <div className="md:col-span-5">
            <p className="font-serif text-2xl text-[#1C1E18]">
              {CAFE_INFO.brandDisplay}
            </p>
            <p className="mt-3 text-sm text-[#5A5D52]">
              {CAFE_INFO.tagline}
            </p>

            <div className="mt-8 max-w-sm">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} noValidate>
                  <div className="flex items-center border-b border-[#D9D6CA] focus-within:border-[#4F5D34] transition-colors duration-300">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Mavsumiy yangiliklar uchun elektron pochta
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Elektron pochtangizni kiriting"
                      className="w-full bg-transparent py-2.5 text-sm text-[#1C1E18] placeholder:text-[#5A5D52]/70 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 py-2.5 pl-4 text-xs font-medium uppercase tracking-[0.16em] text-[#1C1E18] hover:text-[#4F5D34] transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Obuna bo‘lish</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {error && (
                    <p role="alert" className="mt-2 text-xs text-[#9E4C2E]">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <p
                  role="status"
                  className="py-2.5 text-sm text-[#4F5D34] border-b border-[#4F5D34]/30"
                >
                  Qo‘shilganingiz uchun rahmat.
                </p>
              )}
            </div>
          </div>

          {/* 2-ustun: Manzil */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5A5D52]">
              Manzil
            </p>
            <div className="mt-4 space-y-2 text-sm text-[#1C1E18] leading-relaxed">
              <p>{CAFE_INFO.address}</p>
              <p className="text-[#5A5D52]">{CAFE_INFO.hours}</p>
            </div>
          </div>

          {/* 3-ustun: Bog‘lanish */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5A5D52]">
              Bog‘lanish
            </p>
            <div className="mt-4 flex flex-col items-start gap-2.5 text-sm">
              <a
                href={CAFE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[#1C1E18] hover:text-[#4F5D34] transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href={`mailto:${CAFE_INFO.email}`}
                className="link-underline text-[#1C1E18] hover:text-[#4F5D34] transition-colors duration-300"
              >
                {CAFE_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Pastki qator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#D9D6CA]/80 pt-8 text-xs text-[#5A5D52]">
          <p>{CAFE_INFO.copyright}</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="link-underline hover:text-[#1C1E18] transition-colors duration-200 cursor-pointer"
            >
              Maxfiylik
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="link-underline hover:text-[#1C1E18] transition-colors duration-200 cursor-pointer"
            >
              Shartlar
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
