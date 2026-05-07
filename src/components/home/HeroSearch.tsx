'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  Brain,
  Check,
  ClipboardList,
  HeartPulse,
  MapPin,
  Search,
  Stethoscope,
  UserRound,
  Loader2,
  Star,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { normalizeSearchTerm, resolveServiceId } from '@/lib/home-care-search-data';
import { resolveServiceImage } from '@/lib/service-images';
import { ProviderCard } from '@/components/home/ProviderCard';

const locations = ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara'];
const popularSearches = ['Nurse', 'Elder Care', 'Doctor Visit', 'Post-Surgery'];
const suggestions = [
  'Nurse',
  'Elder Care',
  'Doctor Visit',
  'Post-Surgery',
  'Physiotherapy',
  'Diabetes Care',
  'Mental Health',
];

const categoryShortcuts = [
  { label: 'Nurse at Home', href: '/nurse-at-home' },
  { label: 'Elder Care', href: '/elder-care' },
  { label: 'Doctor Visit', href: '/doctor-visit' },
  { label: 'Post-Surgery', href: '/post-surgery' },
];

const homeCareCategories = [
  {
    serviceId: 'nurse',
    detailsHref: '/nurse-at-home',
    title: 'Nursing Care',
    description: 'Skilled in-home nursing support for daily medical needs.',
    features: ['Home nursing', 'ICU support', 'Elder care'],
    cta: 'BOOK NOW',
    Icon: Stethoscope,
  },
  {
    serviceId: 'physiotherapy',
    detailsHref: '/physiotherapy',
    title: 'Physiotherapy',
    description: 'Personalized rehabilitation and mobility recovery sessions.',
    features: ['Pain relief', 'Mobility rehab', 'Post-injury support'],
    cta: 'BOOK NOW',
    Icon: Activity,
  },
  {
    serviceId: 'diabetes-care',
    detailsHref: '/diabetes-care',
    title: 'Diabetes Management',
    description: 'Guidance, monitoring, and routine care for better control.',
    features: ['Sugar monitoring', 'Diet guidance', 'Routine follow-up'],
    cta: 'BOOK NOW',
    Icon: ClipboardList,
  },
  {
    serviceId: 'post-surgery',
    detailsHref: '/post-surgery',
    title: 'Post-Operative Care',
    description: 'Safe recovery support after surgery and hospital discharge.',
    features: ['Wound care', 'Recovery checks', 'Home support'],
    cta: 'BOOK NOW',
    Icon: HeartPulse,
  },
  {
    serviceId: 'mental-health',
    detailsHref: '/mental-health',
    title: 'Mental Health Support',
    description: 'Compassionate emotional care and therapy-led assistance.',
    features: ['Counseling care', 'Stress support', 'Wellness follow-up'],
    cta: 'BOOK NOW',
    Icon: Brain,
  },
  {
    serviceId: 'elder-care',
    detailsHref: '/elder-care',
    title: 'Elder Care',
    description: 'Respectful, dependable assistance for older adults at home.',
    features: ['Daily support', 'Companion care', 'Assisted mobility'],
    cta: 'BOOK NOW',
    Icon: UserRound,
  },
];

export function HeroSearch() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('Rajkot');
  const [searchQuery, setSearchQuery] = useState('');
  const [isServicePickerOpen, setIsServicePickerOpen] = useState(false);
  const [highlightedService, setHighlightedService] = useState('');
  
  // New search states
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const homeCareServicesRef = useRef<HTMLElement | null>(null);
  const normalizedSearchQuery = normalizeSearchTerm(searchQuery);

  const filteredSuggestions = suggestions.filter((item) =>
    normalizeSearchTerm(item).includes(normalizedSearchQuery),
  );

  const handleSelect = (value: string, location?: string) => {
    const normalizedValue = normalizeSearchTerm(value);
    const resolvedId = resolveServiceId(normalizedValue);
    const serviceParam = resolvedId || normalizedValue;
    const locationParam = location ? `&location=${encodeURIComponent(location)}` : '';

    router.push(`/agencies?service=${encodeURIComponent(serviceParam)}${locationParam}`);
  };

  const handleCardLocationFlow = (value: string) => {
    const normalizedValue = normalizeSearchTerm(value);
    const resolvedId = resolveServiceId(normalizedValue);
    const serviceParam = resolvedId || normalizedValue;

    router.push(`/select-location?service=${encodeURIComponent(serviceParam)}`);
  };

  const handleSearch = async (overrideQuery?: string) => {
    const trimmedQuery = (typeof overrideQuery === 'string' ? overrideQuery : searchQuery).trim();

    if (!trimmedQuery) {
      return;
    }

    setLoading(true);
    setError(null);
    setProviders([]);

    // Requirement 8: Map search keywords to backend categories
    const mapKeywordToCategory = (query: string) => {
      const q = query.toLowerCase();
      if (q.includes('nurse')) return 'nurse_at_home';
      if (q.includes('elder')) return 'elder_care';
      if (q.includes('doctor')) return 'doctor_visit';
      if (q.includes('physio')) return 'physiotherapy';
      return q;
    };

    const category = mapKeywordToCategory(trimmedQuery);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      // Requirement 1: Call the API
      const response = await fetch('https://sevalink-backend-api.onrender.com/patients/homecare/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          category: category,
          latitude: 22.3039,
          longitude: 70.8022,
          radius_km: 10
        }),
      });

      if (response.status === 401) {
        throw new Error('UNAUTHORIZED');
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Requirement 2: Update providers state
      // Assuming the API returns an array of providers or an object with a providers array
      const results = Array.isArray(data) ? data : (data.providers || []);
      setProviders(results);
    } catch (err: any) {
      // Requirement 6: Handle errors
      console.error('Search failed:', err);
      if (err.message === 'UNAUTHORIZED') {
        setError('Please login as a patient to use the search feature.');
      } else {
        setError('Unable to find providers. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (label: string) => {
    handleCardLocationFlow(label);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const scrollToServicesSection = () => {
    if (!homeCareServicesRef.current) {
      return;
    }

    homeCareServicesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleServicePickerSelect = (serviceTitle: string) => {
    setIsServicePickerOpen(false);
    setHighlightedService(serviceTitle);
    window.setTimeout(() => {
      scrollToServicesSection();
    }, 120);
  };

  useEffect(() => {
    const handleOpenServicePicker = () => {
      setIsServicePickerOpen(true);
    };

    window.addEventListener('open-homecare-service-picker', handleOpenServicePicker);

    return () => {
      window.removeEventListener('open-homecare-service-picker', handleOpenServicePicker);
    };
  }, []);

  return (
    <section
      className="bg-gradient-to-b px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      style={{ background: 'linear-gradient(to bottom, rgba(182,219,201,0.28), #ffffff)' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="max-w-3xl text-center">
          <span className="section-label text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Homecare Services
          </span>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Your home for <span className="text-emerald-600">care</span>
          </h1>
          <p className="mt-4 text-sm text-gray-600 sm:text-base">
            Find and book trusted home care professionals near you
          </p>
        </div>

        <div className="mt-10 w-full max-w-3xl rounded-xl border border-gray-200 bg-white shadow-md">
          <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-stretch sm:gap-0">
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 sm:w-56 sm:shrink-0 sm:border-0 sm:border-r sm:rounded-none sm:px-5">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <select
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none"
                aria-label="Select location"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1">
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 sm:h-full sm:rounded-none sm:border-0 sm:px-5">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search services, caregivers..."
                  className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  aria-label="Search services or caregivers"
                />
              </div>

              {searchQuery.trim().length > 0 && filteredSuggestions.length > 0 ? (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Results Section */}
        <div className="mt-8 w-full max-w-4xl">
          {/* Requirement 3: Show loading while fetching */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="mt-2 text-sm text-gray-500">Searching for best care providers...</p>
            </div>
          )}

          {/* Requirement 6: Show error message */}
          {error && !loading && (
            <div className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Requirement 5: Handle empty state */}
          {!loading && !error && searchQuery && providers.length === 0 && providers !== null && (
            <div className="rounded-lg bg-gray-50 py-10 text-center">
              <p className="text-gray-600">No providers found for "{searchQuery}" in {selectedLocation}.</p>
              <p className="mt-1 text-sm text-gray-400">Try searching for "nurse", "elder care", or "physio".</p>
            </div>
          )}

          {/* Requirement 4: Display results */}
          {providers.length > 0 && !loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {providers.map((provider, index) => (
                <ProviderCard
                  key={provider.id || index}
                  id={provider.id}
                  name={provider.name}
                  qualification={provider.qualification || 'Certified Professional'}
                  category={provider.category || 'Home Care'}
                  experience={provider.experience || 5}
                  base_price={provider.base_price || 500}
                  distance_km={provider.distance_km || 2.5}
                  onBook={(id) => router.push(`/booking?providerId=${id}`)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
          <span className="font-medium text-gray-600">Popular searches:</span>
          {popularSearches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer transition hover:text-emerald-600"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoryShortcuts.map((category) => (
            <button
              key={category.href}
              type="button"
              onClick={() => handleCategoryClick(category.label)}
              className="rounded-2xl bg-white p-4 text-center text-sm font-semibold text-gray-900 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {category.label}
            </button>
          ))}
        </div>

        <section ref={homeCareServicesRef} className="w-full py-16" id="home-care-services">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Home Care Services</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {homeCareCategories.map(({ serviceId, detailsHref, title, description, features, cta, Icon }) => (
                <article
                  key={title}
                  className={`group overflow-hidden rounded-[20px] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)] ${
                    highlightedService === title ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
                  }`}
                >
                  <div className="relative h-[180px] w-full overflow-hidden">
                    <Image
                      src={resolveServiceImage(title)}
                      alt={title}
                      width={900}
                      height={540}
                      quality={100}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 flex items-end gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-bold text-white">{title}</h3>
                    </div>
                  </div>

                  <div className="space-y-4 p-4">
                    <ul className="space-y-1.5 text-sm text-gray-600">
                      {features.map((feature) => (
                        <li key={`${title}-${feature}`} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs leading-relaxed text-gray-500">{description}</p>

                    <Link
                      href={`/select-location?service=${encodeURIComponent(serviceId)}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold tracking-wide !text-white visited:!text-white hover:!text-white active:!text-white transition hover:bg-emerald-700"
                    >
                      {cta}
                    </Link>

                    <Link
                      href={detailsHref}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold tracking-wide text-gray-700 transition hover:bg-gray-50"
                    >
                      MORE DETAILS
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {isServicePickerOpen ? (
          <section className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
            <div className="w-full max-w-xl rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Select Service</h3>
                <button
                  type="button"
                  onClick={() => setIsServicePickerOpen(false)}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  Close
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-600">Choose a service and we will scroll to Home Care Services.</p>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {homeCareCategories.map(({ title }) => (
                  <button
                    key={`service-picker-${title}`}
                    type="button"
                    onClick={() => handleServicePickerSelect(title)}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
