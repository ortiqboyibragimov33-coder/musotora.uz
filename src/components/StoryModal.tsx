import { useEffect } from 'react';
import { X } from 'lucide-react';
import { STORY_CHAPTERS } from '../data/cafeData';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoryModal({ isOpen, onClose }: StoryModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
    >
      {/* Fon qoplamasi */}
      <div
        className="animate-backdrop-in absolute inset-0 bg-[#1C1E18]/40 backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Modal oynasi */}
      <div className="animate-panel-in relative z-10 flex max-h-[86vh] w-full max-w-[680px] flex-col rounded-[18px] border border-[#D9D6CA] bg-[#EAE8E0] shadow-xl">
        {/* Sarlavha */}
        <div className="flex items-start justify-between gap-6 border-b border-[#D9D6CA] px-6 py-6 sm:px-10 sm:py-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5A5D52]">
              TARIX VA MANBA
            </p>
            <h2
              id="story-modal-title"
              className="mt-2 font-serif text-3xl sm:text-4xl text-[#1C1E18]"
            >
              Shoshilmasdan <em className="italic font-normal">Yaratilgan</em>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Hikoya oynasini yopish"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#5A5D52] hover:bg-[#F5F3ED] hover:text-[#1C1E18] transition-colors duration-200 cursor-pointer"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Boblar */}
        <div className="overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 space-y-9">
          {STORY_CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.eyebrow}
              className={
                index !== STORY_CHAPTERS.length - 1
                  ? 'pb-9 border-b border-[#D9D6CA]/70'
                  : ''
              }
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#4F5D34]">
                {chapter.eyebrow}
              </p>
              <h3 className="mt-2.5 font-serif text-2xl text-[#1C1E18]">
                {chapter.title}
              </h3>
              <p className="mt-3 text-sm sm:text-[15px] leading-[1.8] text-[#5A5D52]">
                {chapter.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
