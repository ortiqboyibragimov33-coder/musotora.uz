import { ArrowRight } from 'lucide-react';
import { USER_PATIO_PHOTO, type MenuCategoryKey } from '../data/cafeData';
import type { PlacePhotoEntry } from '../hooks/useHotelPlace';
import { useInView } from '../hooks/useInView';
import { CafeImage } from './CafeImage';

interface MenuHighlightsProps {
  onOpenFullMenu: (initialCategory?: MenuCategoryKey) => void;
  onOpenStory: () => void;
  photos?: PlacePhotoEntry[];
}

type BentoTextCell = {
  kind: 'text';
  id: string;
  eyebrow: string;
  description: string;
  metric: string;
  caption: string;
  tone: 'sage' | 'sand';
};

type BentoPhotoCell = {
  kind: 'photo';
  id: string;
  title: string;
  photoIndex: number;
  alt: string;
  placeholderLabel: string;
  actionType: 'menu' | 'story';
  category?: MenuCategoryKey;
};

type BentoCell = BentoTextCell | BentoPhotoCell;

const BENTO_GRID_CELLS: BentoCell[] = [
  {
    kind: 'text',
    id: 'card-anana',
    eyebrow: 'Anʼana va Taʼm',
    description: 'Har kuni ertalab keltiriladigan sarxil mahalliy masalliqlar va halol taomlar.',
    metric: '100%',
    caption: 'Tabiiy mahsulotlar',
    tone: 'sage',
  },
  {
    kind: 'photo',
    id: 'photo-osh',
    title: 'Ichki Hovli',
    photoIndex: 1,
    alt: "Hotel Muso To'ra ichki hovlisi va mehmonlar dam olish ayvoni",
    placeholderLabel: 'Ichki Hovli',
    actionType: 'menu',
    category: 'Mavsumiy Taomlar',
  },
  {
    kind: 'text',
    id: 'card-qovurish',
    eyebrow: 'Qovurish Sanʼati',
    description: 'Yakka navli qahva donalari nozik iforni saqlash uchun asta damlanadi.',
    metric: '12 soat',
    caption: 'Asta damlash vaqti',
    tone: 'sand',
  },
  {
    kind: 'photo',
    id: 'photo-somsa',
    title: 'Ayvon va Zal',
    photoIndex: 2,
    alt: "Hotel Muso To'ra zal ko‘rinishi va milliy bezaklar",
    placeholderLabel: 'Ayvon va Zal',
    actionType: 'menu',
    category: 'Mualliflik Pishiriqlari',
  },
  {
    kind: 'photo',
    id: 'photo-manti',
    title: 'Milliy Meʼmorchilik',
    photoIndex: 3,
    alt: "Hotel Muso To'ra meʼmoriy detallari va Xiva muhiti",
    placeholderLabel: 'Milliy Meʼmorchilik',
    actionType: 'menu',
    category: 'Mavsumiy Taomlar',
  },
  {
    kind: 'text',
    id: 'card-tandir',
    eyebrow: 'Tandir va Xamir',
    description: 'Qo‘lda ochilgan qatlamali xamir issiq tandir cho‘g‘ida qizarib pishadi.',
    metric: '240°C',
    caption: 'Tandir harorati',
    tone: 'sand',
  },
  {
    kind: 'photo',
    id: 'photo-zal',
    title: 'Mehmonlar Zali',
    photoIndex: 4,
    alt: "Hotel Muso To'ra mehmonlar zali va tarixiy hovli manzarasi",
    placeholderLabel: 'Mehmonlar Zali',
    actionType: 'story',
  },
  {
    kind: 'text',
    id: 'card-mehmondostlik',
    eyebrow: 'Mehmondo‘stlik',
    description: 'Tonggi qahva va choy suhbatidan kechki samimiy dasturxongacha osoyishta muhit.',
    metric: '08–22',
    caption: 'Har kunlik xizmat',
    tone: 'sage',
  },
];

export function MenuHighlights({
  onOpenFullMenu,
  onOpenStory,
  photos = [{ url: USER_PATIO_PHOTO }],
}: MenuHighlightsProps) {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.12 });

  const resolvePhoto = (index: number): PlacePhotoEntry => {
    if (photos.length === 0) return { url: USER_PATIO_PHOTO };
    return photos[index % photos.length] ?? { url: USER_PATIO_PHOTO };
  };

  return (
    <section
      id="menu"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      {/* Shisha effektini ko'rsatish uchun sokin tabiiy fon qatlami */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-28 h-[380px] w-[380px] rounded-full bg-[#4F5D34]/14 blur-3xl" />
        <div className="absolute right-[-6%] top-12 h-[420px] w-[420px] rounded-full bg-[#B85D3B]/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-8 h-[340px] w-[460px] rounded-full bg-[#9AA581]/22 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* 3 qismli sarlavha qatori */}
        <div
          className={`reveal-on-scroll grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-6 mb-12 md:mb-14 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="md:col-span-5">
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.35rem)] leading-[1.06] tracking-[-0.015em] text-[#1C1E18]">
              Saralangan Taomlar
            </h2>
          </div>

          <div className="md:col-span-4">
            <p className="text-[13px] leading-[1.7] text-[#5A5D52] max-w-[320px]">
              Xiva meʼmoriy ruhi, tandirdan uzilgan issiq taomlar va yakka navli qahva uyg‘unligi.
            </p>
          </div>

          <div className="md:col-span-3 flex md:justify-end">
            <button
              type="button"
              onClick={() => onOpenFullMenu('Tonggi Qahva')}
              className="group inline-flex items-center gap-3 rounded-full bg-white/45 hover:bg-white/70 backdrop-blur-md border border-white/65 shadow-[0_4px_20px_rgba(28,30,24,0.05),inset_0_1px_0_rgba(255,255,255,0.75)] px-6 py-3 text-xs font-medium tracking-[0.04em] text-[#1C1E18] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <span>To‘liq menyu</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* 4x2 Shaxmat tartibidagi shisha (Glass) Bento tarmoq */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENTO_GRID_CELLS.map((cell, index) => {
            const delay = isInView ? `${Math.min(index * 65, 420)}ms` : '0ms';

            if (cell.kind === 'text') {
              return (
                <article
                  key={cell.id}
                  style={{ transitionDelay: delay }}
                  className={`reveal-on-scroll flex flex-col justify-between rounded-[18px] p-6 min-h-[250px] sm:aspect-square backdrop-blur-xl border border-white/65 shadow-[0_8px_32px_rgba(28,30,24,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    cell.tone === 'sage'
                      ? 'bg-[#EAE8E0]/45'
                      : 'bg-white/40'
                  } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                  <div>
                    <h3 className="font-serif text-[22px] leading-snug text-[#1C1E18]">
                      {cell.eyebrow}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] leading-[1.65] text-[#5A5D52]">
                      {cell.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <p className="font-serif text-[40px] leading-none tracking-[-0.02em] text-[#1C1E18] tabular-nums">
                      {cell.metric}
                    </p>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5A5D52]">
                      {cell.caption}
                    </p>
                  </div>
                </article>
              );
            }

            const photo = resolvePhoto(cell.photoIndex);

            return (
              <article
                key={cell.id}
                style={{ transitionDelay: delay }}
                className={`reveal-on-scroll min-h-[250px] sm:aspect-square transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (cell.actionType === 'story') {
                      onOpenStory();
                    } else {
                      onOpenFullMenu(cell.category ?? 'Mavsumiy Taomlar');
                    }
                  }}
                  aria-label={
                    cell.actionType === 'story'
                      ? `${cell.title} — Hikoyamizni o‘qish`
                      : `${cell.title} — To‘liq menyuda ko‘rish`
                  }
                  className="group relative block h-full w-full overflow-hidden rounded-[18px] text-left cursor-pointer focus-visible:outline-none"
                >
                  <CafeImage
                    src={photo.url}
                    alt={cell.alt}
                    placeholderLabel={cell.placeholderLabel}
                    aspectClassName="h-full w-full min-h-[250px]"
                    roundedClassName="rounded-[18px]"
                  />

                  <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2 rounded-[12px] bg-[#1C1E18]/35 backdrop-blur-md border border-white/35 px-4 py-2.5 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100">
                    <div className="min-w-0">
                      <span className="block font-serif text-lg text-[#F5F3ED] truncate">
                        {cell.title}
                      </span>
                      {photo.attribution && (
                        <span className="block text-[10px] text-[#F5F3ED]/80 truncate">
                          Foto: {photo.attribution}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#F5F3ED] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
