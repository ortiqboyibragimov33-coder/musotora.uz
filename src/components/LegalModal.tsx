import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!type) return;

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
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="animate-backdrop-in absolute inset-0 bg-[#1C1E18]/40 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div className="animate-panel-in relative z-10 w-full max-w-[540px] rounded-[18px] border border-[#D9D6CA] bg-[#F5F3ED] p-7 sm:p-10 shadow-xl">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#D9D6CA]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5A5D52]">
              {CAFE_INFO.brand}
            </p>
            <h2
              id="legal-modal-title"
              className="mt-1.5 font-serif text-3xl text-[#1C1E18]"
            >
              {isPrivacy ? 'Maxfiylik Siyosati' : 'Mehmondo‘stlik Shartlari'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Oynani yopish"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#5A5D52] hover:bg-[#EAE8E0] hover:text-[#1C1E18] transition-colors duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-[1.8] text-[#5A5D52]">
          {isPrivacy ? (
            <>
              <p>
                Muso To‘ra faqat stol band qilish va mavsumiy xabarnomalar uchun zarur bo‘lgan maʼlumotlarni saqlaydi. Biz mehmonlarning aloqa maʼlumotlarini hech qachon uchinchi shaxslarga sotmaymiz yoki bermaymiz.
              </p>
              <p>
                Band qilish maʼlumotlari yoki obuna sozlamalari yuzasidan savollaringiz bo‘lsa, ushbu manzilga yozing:{' '}
                <a
                  href={`mailto:${CAFE_INFO.email}`}
                  className="text-[#1C1E18] underline underline-offset-4"
                >
                  {CAFE_INFO.email}
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <p>
                Band qilingan stollar belgilangan vaqtdan keyin 15 daqiqa davomida saqlanadi. Rejalaringiz o‘zgarsa, boshqa mehmonlarni kutib olishimiz uchun oldindan xabar berishingizni so‘raymiz.
              </p>
              <p>
                Mavsumiy taomlarimiz va qahva turlari {CAFE_INFO.address} manzilidagi haftalik hosilga qarab yangilanib turadi. Kelganingizda allergiyalar haqida ofitsiantga maʼlum qiling.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
