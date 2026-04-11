'use client';

import { useState } from 'react';
import {
  Brain,
  ClipboardList,
  HeartPulse,
  MapPin,
  Search,
  Stethoscope,
  UserRound,
  Activity,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const locations = ['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara'];

const popularSearches = [
  'Nurse at Home',
  'Elder Care',
  'Doctor Visit',
  'Post-Surgery Care',
];

const suggestions = [
  'Nurse at Home',
  'Nursing Care',
  'ICU Nurse',
  'Home Nurse Booking',
  'Elder Care',
  'Senior Care',
  'Home Assistance',
  'Doctor Visit',
  'Post-Surgery Care',
];

const categoryShortcuts = [
  { label: 'Nurse at Home', href: '/nurse-at-home' },
  { label: 'Elder Care', href: '/elder-care' },
  { label: 'Doctor Visit', href: '/doctor-visit' },
  { label: 'Post-Surgery', href: '/post-surgery' },
];

const homeCareCategories = [
  {
    title: 'Nursing Care',
    description: 'Skilled in-home nursing support for daily medical needs.',
    Icon: Stethoscope,
  },
  {
    title: 'Physiotherapy',
    description: 'Personalized rehabilitation and mobility recovery sessions.',
    Icon: Activity,
  },
  {
    title: 'Diabetes Management',
    description: 'Guidance, monitoring, and routine care for better control.',
    Icon: ClipboardList,
  },
  {
    title: 'Post-Operative Care',
    description: 'Safe recovery support after surgery and hospital discharge.',
    Icon: HeartPulse,
  },
  {
    title: 'Mental Health Support',
    description: 'Compassionate emotional care and therapy-led assistance.',
    Icon: Brain,
  },
  {
    title: 'Elder Care',
    description: 'Respectful, dependable assistance for older adults at home.',
    Icon: UserRound,
  },
];

export function HeroSearch() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('Rajkot');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const resolveServiceRoute = (value: string) => {
    const v = value.toLowerCase();

    if (v.includes('nurs')) {
      return '/nurse-at-home';
    }

    if (v.includes('physio')) {
      return '/physiotherapy';
    }

    if (v.includes('diab')) {
      return '/diabetes-care';
    }

    if (v.includes('mental')) {
      return '/mental-health';
    }

    if (v.includes('elder')) {
      return '/elder-care';
    }

    if (v.includes('doctor')) {
      return '/doctor-visit';
    }

    if (v.includes('post')) {
      return '/post-surgery';
    }

    return '/nurse-at-home';
  };

  const handleSelect = (value: string) => {
    router.push(resolveServiceRoute(value));
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      return;
    }

    handleSelect(trimmedQuery);
  };

  const handleCategoryClick = (href: string) => {
    router.push(href);
  };

  const handleHomeCareCategoryClick = (category: string) => {
    router.push(resolveServiceRoute(category));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSelect(suggestion);
  };

  return (
    <section
      className="bg-gradient-to-b px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      style={{
        background: 'linear-gradient(to bottom, rgba(182,219,201,0.28), #ffffff)',
      }}
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
              onClick={() => handleCategoryClick(category.href)}
              className="rounded-2xl bg-white p-4 text-center text-sm font-semibold text-gray-900 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {category.label}
            </button>
          ))}
        </div>

        <section className="w-full py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Home Care Services
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {homeCareCategories.map(({ title, description, Icon }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => handleHomeCareCategoryClick(title)}
                  className="group flex min-h-[170px] cursor-pointer flex-col rounded-2xl bg-white p-4 text-left shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 sm:min-h-[200px] sm:p-6"
                >
                  <Icon className="h-7 w-7 text-emerald-600 transition-transform duration-200 group-hover:scale-110 sm:h-8 sm:w-8" />
                  <h3 className="mt-3 text-base font-semibold leading-snug text-gray-900 sm:mt-4 sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
