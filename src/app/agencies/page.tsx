'use client';

import { useEffect, useMemo, useState } from 'react';
import Footer from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  filterAgenciesByService,
  getDemoAgenciesForService,
  getServiceDisplayLabel,
  homeCareAgencies,
  normalizeSearchTerm,
  resolveServiceId,
} from '@/lib/home-care-search-data';
import { resolveServiceImage } from '@/lib/service-images';

const supportedCities = ['Rajkot', 'Ahmedabad', 'Vadodara', 'Surat'];

export default function AgenciesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedService = searchParams.get('service') ?? '';
  const requestedLocation = searchParams.get('location') ?? '';
  const normalizedService = normalizeSearchTerm(requestedService);
  const resolvedServiceId = resolveServiceId(normalizedService) || normalizedService;
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [locationQuery, setLocationQuery] = useState('');
  const [agenciesList, setAgenciesList] = useState(homeCareAgencies);
  const [isLocationDetected, setIsLocationDetected] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [isUnsupportedLocation, setIsUnsupportedLocation] = useState(false);
  const [isUsingDemoProviders, setIsUsingDemoProviders] = useState(false);

  const serviceMatchedAgencies = normalizedService
    ? filterAgenciesByService(resolvedServiceId)
    : homeCareAgencies;

  const availableLocations = useMemo(
    () => ['All Locations', ...supportedCities],
    [],
  );

  const filteredLocationOptions = availableLocations.filter((location) =>
    normalizeSearchTerm(location).includes(normalizeSearchTerm(locationQuery)),
  );

  useEffect(() => {
    const normalizedRequestedLocation = normalizeSearchTerm(requestedLocation);

    if (!normalizedRequestedLocation) {
      return;
    }

    const matchedLocation = supportedCities.find(
      (city) => normalizeSearchTerm(city) === normalizedRequestedLocation,
    );

    if (!matchedLocation) {
      return;
    }

    setSelectedLocation(matchedLocation);
    setLocationQuery(matchedLocation);
    setIsUnsupportedLocation(false);
    setLocationStatus('');
    setIsLocationDetected(false);
  }, [requestedLocation]);

  useEffect(() => {
    const normalizedSelectedLocation = normalizeSearchTerm(selectedLocation);

    const shouldUseServiceFallback = Boolean(resolvedServiceId || normalizedService);

    const nextAgencies = serviceMatchedAgencies.filter((agency) => {
      if (selectedLocation === 'All Locations') {
        return true;
      }

      return normalizeSearchTerm(agency.location).includes(normalizedSelectedLocation);
    });

    if (nextAgencies.length > 0) {
      setAgenciesList(nextAgencies);
      setIsUsingDemoProviders(false);
      return;
    }

    if (shouldUseServiceFallback) {
      const demoAgencies = getDemoAgenciesForService(resolvedServiceId || normalizedService);

      if (demoAgencies.length > 0) {
        setAgenciesList(demoAgencies);
        setIsUsingDemoProviders(true);
        return;
      }
    }

    setAgenciesList([]);
    setIsUsingDemoProviders(false);
  }, [serviceMatchedAgencies, selectedLocation, isUnsupportedLocation, normalizedService, resolvedServiceId]);

  useEffect(() => {
    const serviceParam = resolvedServiceId || 'nurse';

    agenciesList.slice(0, 10).forEach((agency) => {
      const finalLocation = selectedLocation === 'All Locations' ? agency.location : selectedLocation;

      router.prefetch(
        `/booking?service=${encodeURIComponent(serviceParam)}&location=${encodeURIComponent(finalLocation)}&agency=${encodeURIComponent(agency.id)}`,
      );
      router.prefetch(
        `/agency/${encodeURIComponent(agency.id)}?service=${encodeURIComponent(serviceParam)}&location=${encodeURIComponent(finalLocation)}`,
      );
    });
  }, [agenciesList, selectedLocation, resolvedServiceId, router]);

  const navigateWithFallback = (href: string) => {
    router.push(href);

    window.setTimeout(() => {
      if (window.location.pathname !== '/' && window.location.pathname !== '/agencies') {
        return;
      }

      window.location.assign(href);
    }, 1200);
  };

  const handleUseCurrentLocation = () => {
    router.push(`/select-location?service=${encodeURIComponent(resolvedServiceId || 'nurse')}`);
  };

  const handleBookServiceClick = (agencyId: string, agencyLocation: string) => {
    const serviceParam = resolvedServiceId || 'nurse';
    const finalLocation = selectedLocation === 'All Locations' ? agencyLocation : selectedLocation;

    console.log('Book Service clicked', { service: serviceParam, agencyId, location: finalLocation });

    const href = `/booking?service=${encodeURIComponent(serviceParam)}&location=${encodeURIComponent(finalLocation)}&agency=${encodeURIComponent(agencyId)}`;
    navigateWithFallback(href);
  };

  const handleViewDetailsClick = (agencyId: string, agencyLocation: string) => {
    const serviceParam = resolvedServiceId || 'nurse';
    const finalLocation = selectedLocation === 'All Locations' ? agencyLocation : selectedLocation;

    console.log('View Details clicked', { service: serviceParam, agencyId, location: finalLocation });

    const href = `/agency/${encodeURIComponent(agencyId)}?service=${encodeURIComponent(serviceParam)}&location=${encodeURIComponent(finalLocation)}`;
    navigateWithFallback(href);
  };

  const locationLabel = selectedLocation === 'All Locations' ? 'all locations' : selectedLocation;

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
          <div className="mx-auto max-w-6xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {agenciesList.length} agencies available in {locationLabel}
              </h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">Book services with verified agencies</p>
              {locationStatus ? <p className="mt-2 text-sm text-emerald-700">{locationStatus}</p> : null}
              {isUsingDemoProviders ? (
                <p className="mt-2 inline-flex rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Showing demo providers for your selected service
                </p>
              ) : null}
            </div>

            <div className="grid gap-6 lg:grid-cols-[7fr_3fr]">
              <div className="space-y-4">
                {agenciesList.map((agency) => {
                  const otherServices = agency.services.filter((serviceId) => serviceId !== resolvedServiceId);
                  const cardServiceId = resolvedServiceId || agency.services[0] || 'nurse';

                  return (
                    <article
                      key={agency.id}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="shrink-0 rounded-[10px] border border-gray-200">
                          <Image
                            src={resolveServiceImage(cardServiceId)}
                            alt={getServiceDisplayLabel(cardServiceId)}
                            width={80}
                            height={80}
                            quality={100}
                            className="h-20 w-20 object-cover rounded-[10px]"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h2 className="text-xl font-bold text-gray-900">{agency.name}</h2>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                              {resolvedServiceId ? getServiceDisplayLabel(resolvedServiceId) : 'Home Care'}
                            </span>
                            {agency.rating ? (
                              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                                {agency.rating.toFixed(1)} rating
                              </span>
                            ) : null}
                            {agency.experienceYears ? (
                              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                                {agency.experienceYears}+ yrs exp
                              </span>
                            ) : null}
                            {agency.availability ? (
                              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                                {agency.availability}
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-3 text-sm text-gray-600">{agency.description}</p>
                          <p className="mt-2 text-sm text-gray-700">{agency.address}</p>
                          <p className="mt-1 text-sm text-gray-700">{agency.location}</p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-gray-500">Other services:</span>
                            {otherServices.length > 0 ? (
                              otherServices.map((serviceId) => (
                                <span
                                  key={`${agency.id}-${serviceId}`}
                                  className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
                                >
                                  {getServiceDisplayLabel(serviceId)}
                                </span>
                              ))
                            ) : (
                              <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600">
                                No additional services
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-full space-y-2 md:w-auto md:min-w-[180px]">
                          <p className="text-right text-sm font-semibold text-gray-900">
                            {agency.priceFrom ? `Starts at Rs. ${agency.priceFrom}` : 'Contact for pricing'}
                          </p>
                          <button
                            type="button"
                            onMouseEnter={() => {
                              const serviceParam = resolvedServiceId || 'nurse';
                              const finalLocation = selectedLocation === 'All Locations' ? agency.location : selectedLocation;
                              router.prefetch(
                                `/booking?service=${encodeURIComponent(serviceParam)}&location=${encodeURIComponent(finalLocation)}&agency=${encodeURIComponent(agency.id)}`,
                              );
                            }}
                            onClick={() => handleBookServiceClick(agency.id, agency.location)}
                            className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold !text-white visited:!text-white hover:!text-white active:!text-white"
                          >
                            Book Service
                          </button>
                          <button
                            type="button"
                            onMouseEnter={() => {
                              const serviceParam = resolvedServiceId || 'nurse';
                              const finalLocation = selectedLocation === 'All Locations' ? agency.location : selectedLocation;
                              router.prefetch(
                                `/agency/${encodeURIComponent(agency.id)}?service=${encodeURIComponent(serviceParam)}&location=${encodeURIComponent(finalLocation)}`,
                              );
                            }}
                            onClick={() => handleViewDetailsClick(agency.id, agency.location)}
                            className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                          >
                            Contact / View Details
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {agenciesList.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
                    No services found for your selected criteria
                    <p className="mt-2 text-xs text-gray-500">Try nearby locations</p>
                  </div>
                ) : null}
              </div>

              <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">Filter by Location</h2>

                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
                >
                  Use Current Location
                </button>

                <div className="mt-3">
                  <label htmlFor="locationSearch" className="text-xs font-medium text-gray-600">
                    Search Location
                  </label>
                  <input
                    id="locationSearch"
                    type="text"
                    value={locationQuery}
                    onChange={(event) => {
                      const nextLocationValue = event.target.value;
                      setLocationQuery(nextLocationValue);
                      setSelectedLocation(nextLocationValue || 'All Locations');
                      setIsUnsupportedLocation(false);
                      setLocationStatus('');
                      setIsLocationDetected(false);
                    }}
                    placeholder="Type a city"
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {filteredLocationOptions.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(location);
                        setLocationQuery(location === 'All Locations' ? '' : location);
                        setIsUnsupportedLocation(false);
                        setLocationStatus('');
                        setIsLocationDetected(false);
                      }}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                        selectedLocation === location
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 bg-gray-50 text-gray-700'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  {isLocationDetected ? 'Auto-detected location active' : 'Manual location selection active'}
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
