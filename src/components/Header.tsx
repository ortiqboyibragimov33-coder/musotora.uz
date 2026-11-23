import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'Menyu', href: 'menu' },
  { label: 'Falsafa', href: 'story' },
  { label: 'Manzil', href: 'location' },
  { label: 'Stol band qilish', href: 'reserve' },
  { label: 'Aloqa', href: 'contact' },
] as const;

export function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const handleLinkClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 h-20 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'bg-white/55 backdrop-blur-xl border-b border-white/65 shadow-[0_4px_24px_rgba(28,30,24,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-6 md:px-10">
          {/* Chap: Serif brend nomi */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileOpen(false);
            }}
            className="font-serif text-xl sm:text-2xl tracking-[-0.01em] text-[#1C1E18] whitespace-nowrap shrink-0 transition-opacity duration-300 hover:opacity-75"
          >
            {CAFE_INFO.brandDisplay}
          </a>

          {/* Markaz: Minimalist havolalar */}
          <nav
            aria-label="Asosiy navigatsiya"
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="link-underline text-[13px] font-normal tracking-[0.02em] text-[#1C1E18]/80 hover:text-[#1C1E18] transition-colors duration-300 whitespace-nowrap shrink-0 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* O‘ng: Zaytun rangli yumaloq tugma + Mobil menyu */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleLinkClick('reserve')}
              className="hidden md:inline-flex items-center justify-center rounded-full bg-[#4F5D34] hover:bg-[#3F4B28] px-6 py-2.5 text-xs font-medium tracking-[0.06em] text-[#F5F3ED] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              2026 · Xiva
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Navigatsiya menyusini ochish"
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-[#1C1E18] hover:bg-[#EAE8E0] transition-colors duration-200 cursor-pointer"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil yon panel menyusi */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-[#1C1E18]/30 backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Mobil navigatsiya"
          className={`absolute right-0 top-0 bottom-0 w-full max-w-[340px] bg-[#F5F3ED] border-l border-[#D9D6CA] px-8 py-7 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-8 border-b border-[#D9D6CA]">
              <span className="font-serif text-2xl text-[#1C1E18]">
                {CAFE_INFO.brandDisplay}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Navigatsiya menyusini yopish"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#1C1E18] hover:bg-[#EAE8E0] transition-colors duration-200 cursor-pointer"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Mobil havolalar" className="mt-10 flex flex-col gap-5">
              {NAV_ITEMS.map((item, idx) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  style={{
                    transitionDelay: mobileOpen ? `${120 + idx * 70}ms` : '0ms',
                  }}
                  className={`font-serif text-3xl text-[#1C1E18] hover:text-[#4F5D34] py-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div
            style={{
              transitionDelay: mobileOpen ? '400ms' : '0ms',
            }}
            className={`pt-8 border-t border-[#D9D6CA] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <button
              type="button"
              onClick={() => handleLinkClick('reserve')}
              className="w-full rounded-full bg-[#4F5D34] hover:bg-[#3F4B28] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[#F5F3ED] transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              Stol band qilish
            </button>
            <p className="mt-5 text-xs text-[#5A5D52] leading-relaxed">
              {CAFE_INFO.address}
              <br />
              {CAFE_INFO.hours}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
