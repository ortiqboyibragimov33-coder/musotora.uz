import { useCallback, useEffect, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Footer } from './components/Footer';
import { FullMenuModal } from './components/FullMenuModal';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LegalModal } from './components/LegalModal';
import { LocationAndFeature } from './components/LocationAndFeature';
import { MenuHighlights } from './components/MenuHighlights';
import { ReservationSection } from './components/ReservationSection';
import { StoryModal } from './components/StoryModal';
import {
  CAFE_INFO,
  GOOGLE_MAPS_PLACE_URL,
  HOTEL_COORDS,
  USER_PATIO_PHOTO,
  type MenuCategoryKey,
} from './data/cafeData';
import { useHotelPlace, type HotelPlaceState } from './hooks/useHotelPlace';

const MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  import.meta.env.GOOGLE_MAPS_API_KEY ||
  '';

const FALLBACK_PLACE_STATE: HotelPlaceState = {
  displayName: "Hotel Muso To'ra",
  formattedAddress: CAFE_INFO.address,
  location: { ...HOTEL_COORDS },
  googleMapsUri: GOOGLE_MAPS_PLACE_URL,
  photos: [{ url: USER_PATIO_PHOTO }],
  loadedFromPlaces: false,
};

function PlacesConnectedPage({
  hasMapsApiKey,
  quotaExceeded,
}: {
  hasMapsApiKey: boolean;
  quotaExceeded: boolean;
}) {
  const hotelPlace = useHotelPlace();
  return (
    <PageLayout
      place={hotelPlace}
      hasMapsApiKey={hasMapsApiKey}
      quotaExceeded={quotaExceeded}
    />
  );
}

function PageLayout({
  place,
  hasMapsApiKey,
  quotaExceeded,
}: {
  place: HotelPlaceState;
  hasMapsApiKey: boolean;
  quotaExceeded: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuCategory, setMenuCategory] = useState<MenuCategoryKey>('Tonggi Qahva');
  const [storyOpen, setStoryOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleOpenFullMenu = useCallback((category: MenuCategoryKey = 'Tonggi Qahva') => {
    setMenuCategory(category);
    setMenuOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3ED] text-[#1C1E18] selection:bg-[#4F5D34]/15">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header onNavigate={scrollToSection} />

      <main>
        <Hero
          onOpenMenu={() => handleOpenFullMenu('Tonggi Qahva')}
          onBookTable={() => scrollToSection('reserve')}
          heroImage={place.photos[0]?.url || USER_PATIO_PHOTO}
        />

        <MenuHighlights
          onOpenFullMenu={handleOpenFullMenu}
          onOpenStory={() => setStoryOpen(true)}
          photos={place.photos}
        />

        <LocationAndFeature
          onOpenStory={() => setStoryOpen(true)}
          onBookTable={() => scrollToSection('reserve')}
          place={place}
          hasMapsApiKey={hasMapsApiKey}
        />

        <ReservationSection />
      </main>

      <Footer onOpenLegal={setLegalType} />

      <FullMenuModal
        isOpen={menuOpen}
        initialCategory={menuCategory}
        onClose={() => setMenuOpen(false)}
        onBookTable={() => scrollToSection('reserve')}
      />

      <StoryModal
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </div>
  );
}

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  if (!MAPS_API_KEY) {
    return (
      <PageLayout
        place={FALLBACK_PLACE_STATE}
        hasMapsApiKey={false}
        quotaExceeded={quotaExceeded}
      />
    );
  }

  return (
    <APIProvider
      apiKey={MAPS_API_KEY}
      libraries={['marker', 'places']}
      language="uz"
      region="UZ"
    >
      <PlacesConnectedPage
        hasMapsApiKey={true}
        quotaExceeded={quotaExceeded}
      />
    </APIProvider>
  );
}
