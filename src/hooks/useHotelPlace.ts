import { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  CAFE_INFO,
  GOOGLE_MAPS_PLACE_URL,
  HOTEL_COORDS,
  USER_PATIO_PHOTO,
} from '../data/cafeData';

export interface PlacePhotoEntry {
  url: string;
  attribution?: string;
}

export interface HotelPlaceState {
  displayName: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri: string;
  photos: PlacePhotoEntry[];
  loadedFromPlaces: boolean;
}

const DEFAULT_PLACE_STATE: HotelPlaceState = {
  displayName: "Hotel Muso To'ra",
  formattedAddress: CAFE_INFO.address,
  location: { ...HOTEL_COORDS },
  googleMapsUri: GOOGLE_MAPS_PLACE_URL,
  photos: [{ url: USER_PATIO_PHOTO }],
  loadedFromPlaces: false,
};

export function useHotelPlace(): HotelPlaceState {
  const placesLib = useMapsLibrary('places');
  const [placeState, setPlaceState] = useState<HotelPlaceState>(DEFAULT_PLACE_STATE);

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    async function loadHotelPlace() {
      try {
        const { Place } = placesLib!;
        const { places } = await Place.searchByText({
          textQuery: "Hotel Muso To'ra, Khiva",
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'location',
            'photos',
            'rating',
            'userRatingCount',
            'googleMapsURI',
          ],
          locationBias: {
            center: HOTEL_COORDS,
            radius: 500,
          },
          maxResultCount: 1,
        });

        const matched = places?.[0];
        if (!matched || cancelled) return;

        const fetchedPhotos: PlacePhotoEntry[] = (matched.photos ?? [])
          .slice(0, 6)
          .map((photo: google.maps.places.Photo): PlacePhotoEntry => {
            const firstAuthor = photo.authorAttributions?.[0]?.displayName;
            return {
              url: photo.getURI({ maxWidth: 1200 }),
              attribution: firstAuthor ?? undefined,
            };
          })
          .filter((entry: PlacePhotoEntry) => Boolean(entry.url));

        const combinedPhotos: PlacePhotoEntry[] =
          fetchedPhotos.length > 0
            ? [{ url: USER_PATIO_PHOTO }, ...fetchedPhotos]
            : [{ url: USER_PATIO_PHOTO }];

        const loc = matched.location;
        const resolvedCoords = loc
          ? { lat: loc.lat(), lng: loc.lng() }
          : { ...HOTEL_COORDS };

        setPlaceState({
          displayName: matched.displayName || "Hotel Muso To'ra",
          formattedAddress: matched.formattedAddress || CAFE_INFO.address,
          location: resolvedCoords,
          rating: matched.rating ?? undefined,
          userRatingCount: matched.userRatingCount ?? undefined,
          googleMapsUri: matched.googleMapsURI || GOOGLE_MAPS_PLACE_URL,
          photos: combinedPhotos,
          loadedFromPlaces: true,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }
    }

    loadHotelPlace();

    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  return placeState;
}
