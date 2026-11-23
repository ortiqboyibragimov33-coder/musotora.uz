import { useState, type FormEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { RESERVATION_GUESTS, RESERVATION_TIMES } from '../data/cafeData';
import { useInView } from '../hooks/useInView';

const UZ_WEEKDAYS = [
  'Yakshanba',
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
] as const;

const UZ_MONTHS = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr',
] as const;

function getTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatUzbekDate(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const weekday = UZ_WEEKDAYS[dateObj.getDay()];
  const monthName = UZ_MONTHS[dateObj.getMonth()];
  return `${weekday}, ${day}-${monthName}`;
}

export function ReservationSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const todayISO = getTodayISO();

  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState<string>(RESERVATION_TIMES[1]);
  const [guests, setGuests] = useState<string>(RESERVATION_GUESTS[1]);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setConfirmed(true);
  };

  return (
    <section
      id="space"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/4 top-10 h-[340px] w-[340px] rounded-full bg-[#4F5D34]/12 blur-3xl" />
        <div className="absolute right-1/4 bottom-6 h-[320px] w-[360px] rounded-full bg-[#B85D3B]/10 blur-3xl" />
      </div>

      <div id="reserve" className="scroll-mt-28 mx-auto max-w-[1200px] px-6 md:px-10">
        <div
          className={`reveal-on-scroll rounded-[18px] bg-white/45 backdrop-blur-xl border border-white/65 shadow-[0_12px_36px_rgba(28,30,24,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] px-7 py-12 sm:p-12 md:p-16 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="mx-auto max-w-[820px]">
            <div className="text-center">
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#5A5D52]">
                MEHMONLAR ZALI VA QAHVA BARI
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.12] tracking-[-0.01em] text-[#1C1E18]">
                Stol Band Qilish
              </h2>
              <p className="mt-3 text-[15px] text-[#5A5D52]">
                Tonggi qahva yoki kechki taomlar uchun tashrif buyuring.
              </p>
            </div>

            {!confirmed ? (
              <form
                onSubmit={handleSubmit}
                className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-5 items-end"
              >
                {/* Sana */}
                <div>
                  <label
                    htmlFor="reservation-date"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#5A5D52] mb-2"
                  >
                    Sana
                  </label>
                  <input
                    id="reservation-date"
                    type="date"
                    min={todayISO}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="h-[46px] w-full rounded-[12px] border border-white/70 bg-white/60 backdrop-blur-md px-3.5 text-sm text-[#1C1E18] tabular-nums transition-colors duration-200 focus:border-[#4F5D34] focus:outline-none"
                  />
                </div>

                {/* Vaqt */}
                <div>
                  <label
                    htmlFor="reservation-time"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#5A5D52] mb-2"
                  >
                    Vaqt
                  </label>
                  <div className="relative">
                    <select
                      id="reservation-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-[46px] w-full appearance-none rounded-[12px] border border-white/70 bg-white/60 backdrop-blur-md pl-3.5 pr-10 text-sm text-[#1C1E18] tabular-nums transition-colors duration-200 focus:border-[#4F5D34] focus:outline-none cursor-pointer"
                    >
                      {RESERVATION_TIMES.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5D52]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Mehmonlar */}
                <div>
                  <label
                    htmlFor="reservation-guests"
                    className="block text-[11px] uppercase tracking-[0.18em] text-[#5A5D52] mb-2"
                  >
                    Mehmonlar
                  </label>
                  <div className="relative">
                    <select
                      id="reservation-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="h-[46px] w-full appearance-none rounded-[12px] border border-white/70 bg-white/60 backdrop-blur-md pl-3.5 pr-10 text-sm text-[#1C1E18] transition-colors duration-200 focus:border-[#4F5D34] focus:outline-none cursor-pointer"
                    >
                      {RESERVATION_GUESTS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5D52]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Yuborish tugmasi */}
                <button
                  type="submit"
                  className="h-[46px] w-full md:w-auto rounded-full bg-[#4F5D34] hover:bg-[#3F4B28] px-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F5F3ED] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Band qilish
                </button>
              </form>
            ) : (
              <div
                role="status"
                aria-live="polite"
                className="animate-panel-in mt-10 rounded-[14px] border border-white/70 bg-white/55 backdrop-blur-md px-6 py-8 sm:px-10 text-center"
              >
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#4F5D34]/30 bg-[#4F5D34]/10 text-[#4F5D34]">
                  <Check className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </div>

                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#4F5D34] font-medium">
                  Band qilish so‘rovi qabul qilindi
                </p>

                <p className="mt-2 font-serif text-2xl sm:text-[28px] text-[#1C1E18]">
                  Sizni kutib qolamiz.
                </p>

                <p className="mt-3 text-sm text-[#5A5D52] tabular-nums">
                  {formatUzbekDate(date)} · {time} · {guests}
                </p>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => setConfirmed(false)}
                    className="link-underline text-xs font-medium uppercase tracking-[0.16em] text-[#1C1E18] py-1.5 cursor-pointer"
                  >
                    Buyurtmani o‘zgartirish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
