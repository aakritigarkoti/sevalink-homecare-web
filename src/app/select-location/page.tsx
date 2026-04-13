'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { normalizeSearchTerm } from '@/lib/home-care-search-data';

const supportedCities = ['Rajkot', 'Ahmedabad', 'Vadodara', 'Surat'];

const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  Rajkot: { lat: 22.3039, lon: 70.8022 },
  Ahmedabad: { lat: 23.0225, lon: 72.5714 },
  Vadodara: { lat: 22.3072, lon: 73.1812 },
  Surat: { lat: 21.1702, lon: 72.8311 },
};

type SelectedCoords = {
  lat: number;
  lng: number;
};

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '400px',
};

const mapCoordinatesToSupportedCity = (latitude: number, longitude: number) => {
  let closestCity = '';
  let closestDistance = Number.POSITIVE_INFINITY;

  supportedCities.forEach((city) => {
    const coordinates = cityCoordinates[city];
    const distance = Math.sqrt(
      (coordinates.lat - latitude) ** 2 + (coordinates.lon - longitude) ** 2,
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCity = city;
    }
  });

  if (closestDistance <= 1.8) {
    return closestCity;
  }

  return '';
};

export default function SelectLocationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get('service') ?? 'nurse';

  const [manualLocation, setManualLocation] = useState('Rajkot');
  const [status, setStatus] = useState('');
  const [isAvailabilityError, setIsAvailabilityError] = useState(false);
  const [mapStatus, setMapStatus] = useState('');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<SelectedCoords | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);

  const goToAgencies = (location: string) => {
    router.push(
      `/agencies?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`,
    );
  };

  const closeMapModal = () => {
    setIsMapOpen(false);
    setMapStatus('');
  };

  const showUnavailableServiceMessage = () => {
    closeMapModal();
    setIsFetchingLocation(false);
    setIsAvailabilityError(true);
    setStatus('Service not available at your location. Please choose a different location.');
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Current location is not supported in this browser.');
      return;
    }

    setStatus('');
    setIsAvailabilityError(false);
    setIsMapOpen(true);
    setIsFetchingLocation(true);
    setMapStatus('Detecting your location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMapStatus('Location detected. Adjust the pin if needed and confirm.');
        setIsFetchingLocation(false);
      },
      () => {
        setMapStatus('Unable to detect location. Please choose from city chips below.');
        setIsFetchingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  useEffect(() => {
    if (!isMapOpen || !selectedCoords || !mapContainerRef.current) {
      return;
    }

    let isMounted = true;

    const setupMap = async () => {
      const leaflet = leafletRef.current ?? (await import('leaflet'));
      leafletRef.current = leaflet;

      if (!isMounted || !mapContainerRef.current) {
        return;
      }

      if (!mapRef.current) {
        mapRef.current = leaflet.map(mapContainerRef.current, {
          zoomControl: true,
        }).setView([selectedCoords.lat, selectedCoords.lng], 13);

        leaflet
          .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          })
          .addTo(mapRef.current);

        mapRef.current.on('click', (event: any) => {
          setSelectedCoords({ lat: event.latlng.lat, lng: event.latlng.lng });
          setMapStatus('Pin moved. Confirm this location to continue.');
        });
      }

      if (!markerRef.current) {
        markerRef.current = leaflet
          .circleMarker([selectedCoords.lat, selectedCoords.lng], {
            radius: 9,
            color: '#059669',
            fillColor: '#10b981',
            fillOpacity: 0.95,
            weight: 2,
          })
          .addTo(mapRef.current);
      } else {
        markerRef.current.setLatLng([selectedCoords.lat, selectedCoords.lng]);
      }

      mapRef.current.setView([selectedCoords.lat, selectedCoords.lng], mapRef.current.getZoom(), {
        animate: true,
      });

      window.setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
          mapRef.current.setView([selectedCoords.lat, selectedCoords.lng], mapRef.current.getZoom(), {
            animate: false,
          });
        }
      }, 300);
    };

    setupMap();

    return () => {
      isMounted = false;
    };
  }, [isMapOpen, selectedCoords]);

  useEffect(() => {
    if (!isMapOpen) {
      return;
    }

    const resizeTimer = window.setTimeout(() => {
      if (mapRef.current && selectedCoords) {
        mapRef.current.invalidateSize();
        mapRef.current.setView([selectedCoords.lat, selectedCoords.lng], mapRef.current.getZoom(), {
          animate: false,
        });
      }
    }, 300);

    return () => {
      window.clearTimeout(resizeTimer);
    };
  }, [isMapOpen, selectedCoords]);

  useEffect(() => {
    if (isMapOpen) {
      return;
    }

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      markerRef.current = null;
    }
  }, [isMapOpen]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const reverseGeocodeCity = async (coords: SelectedCoords) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`,
    );

    if (!response.ok) {
      throw new Error('Unable to resolve city for coordinates.');
    }

    const data = await response.json();
    const address = data.address ?? {};
    const detectedCityName =
      address.city ?? address.town ?? address.village ?? address.state_district ?? address.county ?? '';

    return detectedCityName as string;
  };

  const handleConfirmMapLocation = async () => {
    if (!selectedCoords) {
      setMapStatus('Select a location on the map to continue.');
      return;
    }

    setMapStatus('Checking service availability for selected location...');

    try {
      const reverseGeocodedCity = await reverseGeocodeCity(selectedCoords);
      const detectedNormalized = normalizeSearchTerm(reverseGeocodedCity);

      const matchedSupportedCity = supportedCities.find(
        (city) => normalizeSearchTerm(city) === detectedNormalized,
      );

      if (matchedSupportedCity) {
        goToAgencies(matchedSupportedCity);
        return;
      }

      const nearbySupportedCity = mapCoordinatesToSupportedCity(selectedCoords.lat, selectedCoords.lng);
      if (nearbySupportedCity) {
        goToAgencies(nearbySupportedCity);
        return;
      }

      showUnavailableServiceMessage();
    } catch {
      const fallbackCity = mapCoordinatesToSupportedCity(selectedCoords.lat, selectedCoords.lng);

      if (fallbackCity) {
        goToAgencies(fallbackCity);
        return;
      }

      showUnavailableServiceMessage();
    }
  };

  const handleMapCityChipClick = (city: string) => {
    const coords = cityCoordinates[city];
    setSelectedCoords({ lat: coords.lat, lng: coords.lon });
    setMapStatus(`Pin moved to ${city}. Confirm location to continue.`);
  };

  const handleManualContinue = () => {
    const normalized = normalizeSearchTerm(manualLocation);
    const matchedCity = supportedCities.find(
      (city) => normalizeSearchTerm(city) === normalized,
    );

    if (!matchedCity) {
      setIsAvailabilityError(false);
      setStatus('Please select a supported location: Rajkot, Ahmedabad, Vadodara, Surat.');
      return;
    }

    setStatus('');
    setIsAvailabilityError(false);

    goToAgencies(matchedCity);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, rgba(182,219,201,0.28), #ffffff)',
      }}
    >
      <Header />

      <main className="pt-[3.5rem] sm:pt-[4.5rem] md:pt-16">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Select Location</h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Choose your location to view agencies for {service}.
            </p>

            <div className="mt-5 space-y-4">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Use Current Location
              </button>

              <p className="text-xs text-gray-500">
                We will open a live map, detect your location, and let you adjust the pin before continuing.
              </p>

              <div className="space-y-2">
                <label htmlFor="manualLocation" className="text-sm font-medium text-gray-700">
                  Select Manually
                </label>
                <input
                  id="manualLocation"
                  type="text"
                  value={manualLocation}
                  onChange={(event) => {
                    setManualLocation(event.target.value);
                    setStatus('');
                    setIsAvailabilityError(false);
                  }}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none"
                  placeholder="Rajkot, Ahmedabad, Vadodara, Surat"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {supportedCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setManualLocation(city);
                      setStatus('');
                      setIsAvailabilityError(false);
                    }}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {city}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleManualContinue}
                className="inline-flex w-full items-center justify-center rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
              >
                Continue
              </button>

              {status ? (
                <p
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                    isAvailabilityError
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                >
                  {status}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {isMapOpen ? (
          <section className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6">
            <div className="flex h-[90vh] w-full max-w-4xl flex-col rounded-t-2xl bg-white shadow-2xl sm:h-auto sm:rounded-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Confirm Your Location</h2>
                  <p className="text-xs text-gray-500">Tap on map to move pin, then confirm.</p>
                </div>
                <button
                  type="button"
                  onClick={closeMapModal}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6">
                {selectedCoords ? (
                  <div
                    ref={mapContainerRef}
                    style={mapContainerStyle}
                    className="location-map w-full rounded-xl border border-gray-200 bg-gray-100"
                  />
                ) : (
                  <div
                    style={mapContainerStyle}
                    className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-600"
                  >
                    Detecting your location...
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {supportedCities.map((city) => (
                    <button
                      key={`map-city-${city}`}
                      type="button"
                      onClick={() => handleMapCityChipClick(city)}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                      {city}
                    </button>
                  ))}
                </div>

                {selectedCoords ? (
                  <p className="mt-3 text-xs text-gray-600">
                    Selected coordinates: {selectedCoords.lat.toFixed(5)}, {selectedCoords.lng.toFixed(5)}
                  </p>
                ) : null}

                {mapStatus ? <p className="mt-2 text-xs text-gray-600">{mapStatus}</p> : null}

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleConfirmMapLocation}
                    disabled={isFetchingLocation}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isFetchingLocation ? 'Detecting location...' : 'Confirm Location'}
                  </button>
                  <button
                    type="button"
                    onClick={closeMapModal}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                  >
                    Continue with Manual Selection
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
