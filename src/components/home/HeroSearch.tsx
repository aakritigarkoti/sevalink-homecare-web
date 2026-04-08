'use client';

import { useState } from 'react';
import { Search, MapPin, ChevronDown, Stethoscope, HeartHandshake, UserRound, Activity } from 'lucide-react';
import Link from 'next/link';

const services = [
  { label: 'Nurse at Home', value: 'nurse-at-home', icon: Stethoscope },
  { label: 'Elder Care', value: 'elder-care', icon: HeartHandshake },
  { label: 'Doctor Home Visit', value: 'doctor-visit', icon: UserRound },
  { label: 'Post-Surgery Care', value: 'post-surgery-care', icon: Activity },
];

const popularSearches = [
  { label: 'Nurse at Home', href: '/nurse-at-home' },
  { label: 'Elder Care', href: '/elder-care' },
  { label: 'Doctor Visit', href: '/doctor-visit' },
  { label: 'Post-Surgery', href: '/post-surgery-care' },
];

export function HeroSearch() {
  const [selectedService, setSelectedService] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLabel = services.find((s) => s.value === selectedService)?.label ?? '';

  return (
    <section className="relative w-full bg-emerald-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.1) 0%, transparent 40%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 sm:pb-28">
        {/* Heading */}
        <h1 className="text-center text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-3">
          Your home for care
        </h1>
        <p className="text-center text-emerald-100 text-base sm:text-lg mb-10 max-w-xl mx-auto">
          Find and book trusted home care professionals in Rajkot
        </p>

        {/* Search Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Service Dropdown */}
              <div className="relative sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-200">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className={`flex-1 text-sm font-medium truncate ${selectedService ? 'text-gray-900' : 'text-gray-400'}`}>
                    {selectedLabel || 'Select service'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-b-xl shadow-lg z-20">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => {
                            setSelectedService(service.value);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${
                            selectedService === service.value
                              ? 'bg-emerald-50 text-emerald-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {service.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Search Input + Button */}
              <div className="flex items-center sm:w-1/2">
                <div className="flex items-center gap-3 flex-1 px-5 py-4">
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search caregivers, services…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                  />
                </div>
                <Link
                  href={selectedService ? `/${selectedService}` : '/book'}
                  className="shrink-0 m-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-emerald-200 text-sm font-medium">Popular:</span>
            {popularSearches.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/80 hover:text-white transition-colors px-2 py-0.5 rounded hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom service bar */}
      <div className="relative z-10 bg-emerald-800/80 border-t border-emerald-600/30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.value}
                  href={`/${service.value}`}
                  className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg text-white/80 hover:text-white hover:bg-emerald-700/50 transition-all group"
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-center leading-tight">{service.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
