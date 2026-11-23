import { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { ArrowRight, ExternalLink, MapPin, Star } from 'lucide-react';
import { CAFE_INFO, HOTEL_COORDS } from '../data/cafeData';
import type { HotelPlaceState } from '../hooks/useHotelPlace';
import { useInView } from '../hooks/useInView';

interface LocationAndFeatureProps {
  onOpenStory: () => void;
  onBookTable: () => void;
  place: HotelPlaceState;
  hasMapsApiKey: boolean;
}

export function LocationAndFeature({
  onOpenStory,
  onBookTable,
  place,
  hasMapsApiKey,
}: LocationAndFeatureProps) {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.12 });
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <section
      id="story"
      ref={ref}
      className="scroll-mt-24 py-16 md:py-24"
    >
      <div
        id="location"
        className="scroll-mt-24 mx-auto max-w-[1200px] px-6 md:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Chap ustun: Haqiqiy Google Xarita (Hotel Muso To'ra) */}
          <div
            className={`reveal-on-scroll lg:col-span-6 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="font-serif text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.015em] text-[#1C1E18] mb-6">
              Manzilimiz
            </h2>

            <div className="relative h-[420px] sm:h-[450px] w-full overflow-hidden rounded-[18px] border border-white/65 bg-[#EAE8E0] shadow-[0_12px_32px_rgba(28,30,24,0.08)]">
              {hasMapsApiKey ? (
                <GoogleMap
                  defaultCenter={HOTEL_COORDS}
                  defaultZoom={16}
                  mapId="DEMO_MAP_ID"
                  gestureHandling="cooperative"
                  mapTypeControl={false}
                  streetViewControl={false}
                  fullscreenControl={true}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  <AdvancedMarker
                    ref={markerRef}
                    position={place.location}
                    title={place.displayName}
                    onClick={() => setInfoOpen(true)}
                  >
                    <Pin
                      background="#4F5D34"
                      borderColor="#313B22"
                      glyphColor="#F5F3ED"
                      scale={1.15}
                    />
                  </AdvancedMarker>

                  {infoOpen && marker && (
                    <InfoWindow
                      anchor={marker}
                      maxWidth={260}
                      onCloseClick={() => setInfoOpen(false)}
                    >
                      <div className="p-1 text-[#1C1E18]">
                        <p className="font-serif text-lg leading-snug">
                          {place.displayName}
                        </p>
                        <p className="mt-1 text-xs text-[#5A5D52] leading-relaxed">
                          {place.formattedAddress}
                        </p>
                        {place.rating && (
                          <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#4F5D34]">
                            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                            <span>{place.rating}</span>
                            {place.userRatingCount && (
                              <span className="text-[#5A5D52]">
                                ({place.userRatingCount})
                              </span>
                            )}
                          </p>
                        )}
                        <div className="mt-2.5 pt-2 border-t border-[#D9D6CA]">
                          <a
                            href={place.googleMapsUri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4F5D34] hover:underline"
                          >
                            <span>Google Xaritada ochish</span>
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <MapPin className="h-8 w-8 text-[#4F5D34] mb-3" strokeWidth={1.5} />
                  <p className="font-serif text-2xl text-[#1C1E18]">{place.displayName}</p>
                  <p className="mt-1 text-sm text-[#5A5D52]">{place.formattedAddress}</p>
                  <a
                    href={place.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#4F5D34] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#F5F3ED]"
                  >
                    <span>Google Xaritada ochish</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}

              {/* Yuqori chap shisha manzil bloki (pastki Google logotiplarini to'smaydi) */}
              <div className="pointer-events-none absolute top-4 left-4 right-14 sm:right-auto z-10 max-w-[330px]">
                <div className="pointer-events-auto rounded-[16px] bg-white/65 backdrop-blur-xl border border-white/75 shadow-[0_12px_32px_rgba(28,30,24,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#4F5D34]">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                      <span>Ichan Qalʼa · Xiva</span>
                    </span>

                    {place.rating && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1C1E18] tabular-nums">
                        <Star className="h-3 w-3 fill-[#4F5D34] text-[#4F5D34]" aria-hidden="true" />
                        {place.rating}
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 font-serif text-xl sm:text-2xl leading-snug text-[#1C1E18]">
                    {place.displayName}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#5A5D52]">
                    {place.formattedAddress} · {CAFE_INFO.hours}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <a
                      href={place.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group link-underline inline-flex items-center gap-1.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#4F5D34] hover:text-[#313B22]"
                    >
                      <span>Xaritada ochish</span>
                      <ExternalLink className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={onOpenStory}
                      className="group link-underline inline-flex items-center gap-1.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1C1E18] hover:text-[#4F5D34] cursor-pointer"
                    >
                      <span>Hikoyamiz</span>
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* O‘ng ustun: To‘q zaytun rangli tahririy karta */}
          <div
            style={{ transitionDelay: isInView ? '120ms' : '0ms' }}
            className={`reveal-on-scroll lg:col-span-6 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="font-serif text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.015em] text-[#1C1E18] mb-6">
              Falsafa va Tashrif
            </h2>

            <div className="relative flex-1 min-h-[420px] sm:min-h-[450px] overflow-hidden rounded-[18px] bg-[#313B22] p-8 sm:p-10 md:p-12 text-[#F5F3ED] flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D9DEC9]">
                  MEHMONDO‘STLIK FALSAFASI
                </p>
                <span className="h-2 w-2 rounded-full bg-[#D9DEC9]/60" aria-hidden="true" />
              </div>

              <div className="my-8">
                <p className="font-serif uppercase text-[clamp(2.4rem,4.5vw,3.85rem)] leading-[0.98] tracking-[-0.015em] text-[#F5F3ED]">
                  BUGUN TASHRIF
                  <br />
                  BUYURING
                </p>

                <p className="mt-5 max-w-[440px] text-[14.5px] leading-[1.75] text-[#E4E4D8]/85">
                  Oddiy masalliqlar, halol mahorat — tonggi yakka navli qahvadan kechki milliy dasturxongacha har bir lahza sokin suhbat va halovat uchun yaratilgan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onBookTable}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#F5F3ED] hover:bg-[#EAE8E0] px-7 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#1C1E18] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <span>Stol band qilish</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={onOpenStory}
                  className="inline-flex items-center justify-center rounded-full border border-[#F5F3ED]/30 hover:border-[#F5F3ED]/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#F5F3ED] transition-colors duration-300 whitespace-nowrap cursor-pointer"
                >
                  Falsafamiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
