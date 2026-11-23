import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import {
  FULL_MENU,
  MENU_CATEGORIES,
  type MenuCategoryKey,
} from '../data/cafeData';

interface FullMenuModalProps {
  isOpen: boolean;
  initialCategory?: MenuCategoryKey;
  onClose: () => void;
  onBookTable: () => void;
}

export function FullMenuModal({
  isOpen,
  initialCategory = 'Tonggi Qahva',
  onClose,
  onBookTable,
}: FullMenuModalProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryKey>(initialCategory);

  useEffect(() => {
    if (isOpen) {
      setActiveCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = FULL_MENU[activeCategory];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-menu-title"
    >
      {/* Fon qoplamasi */}
      <div
        className="animate-backdrop-in absolute inset-0 bg-[#1C1E18]/40 backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Modal oynasi */}
      <div className="animate-panel-in relative z-10 flex max-h-[88vh] w-full max-w-[780px] flex-col rounded-[18px] border border-[#D9D6CA] bg-[#F5F3ED] shadow-xl">
        {/* Sarlavha */}
        <div className="flex items-start justify-between gap-6 border-b border-[#D9D6CA] px-6 py-6 sm:px-10 sm:py-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5A5D52]">
              MAVSUMIY TAKLIFLAR
            </p>
            <h2
              id="full-menu-title"
              className="mt-2 font-serif text-3xl sm:text-4xl text-[#1C1E18]"
            >
              Muso To‘ra Menyusi
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Menyuni yopish"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#5A5D52] hover:bg-[#EAE8E0] hover:text-[#1C1E18] transition-colors duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Bo‘limlar */}
        <div
          role="tablist"
          aria-label="Menyu bo‘limlari"
          className="flex items-center gap-6 sm:gap-8 overflow-x-auto border-b border-[#D9D6CA]/70 bg-[#EAE8E0]/60 px-6 sm:px-10"
        >
          {MENU_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category)}
                className={`relative py-4 text-xs font-medium uppercase tracking-[0.16em] whitespace-nowrap shrink-0 transition-colors duration-300 cursor-pointer ${
                  isSelected
                    ? 'text-[#1C1E18]'
                    : 'text-[#5A5D52] hover:text-[#1C1E18]'
                }`}
              >
                {category}
                {isSelected && (
                  <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#4F5D34]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Taomlar ro‘yxati */}
        <div className="overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
          <div className="space-y-7">
            {items.map((item) => (
              <div key={item.id} className="group">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-serif text-[22px] sm:text-2xl text-[#1C1E18]">
                    {item.name}
                  </h3>

                  {item.dietary && item.dietary.length > 0 && (
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#4F5D34] shrink-0">
                      {item.dietary.join(' · ')}
                    </span>
                  )}

                  <span
                    aria-hidden="true"
                    className="hidden sm:block flex-1 border-b border-dotted border-[#D9D6CA] mx-2"
                  />

                  <span className="ml-auto sm:ml-0 text-sm text-[#1C1E18] tabular-nums shrink-0">
                    {item.price}
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-[#5A5D52] max-w-[560px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#D9D6CA]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#5A5D52]">
              Oʻ — Oʻsimlik taomi &nbsp;·&nbsp; G — Glyutensiz
            </p>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookTable();
              }}
              className="inline-flex items-center justify-center rounded-full bg-[#4F5D34] hover:bg-[#3F4B28] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F5F3ED] transition-all duration-300 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Stol band qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
