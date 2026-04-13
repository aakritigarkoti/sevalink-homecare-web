'use client';

import { useMemo, useState } from 'react';

const locationSuggestions = [
  { label: '150 Feet Ring Road', city: 'Rajkot' },
  { label: 'Amin Marg', city: 'Rajkot' },
  { label: 'Kalawad Road', city: 'Rajkot' },
  { label: 'Kothariya Road', city: 'Rajkot' },
  { label: 'Kuvadva Road', city: 'Rajkot' },
  { label: 'Mavdi Main Road', city: 'Rajkot' },
  { label: 'Nana Mava', city: 'Rajkot' },
  { label: 'Race Course Ring Road', city: 'Rajkot' },
  { label: 'Raiya Road', city: 'Rajkot' },
  { label: 'Sadhu Vaswani Road', city: 'Rajkot' },
  { label: 'University Road', city: 'Rajkot' },
  { label: 'Yagnik Road', city: 'Rajkot' },
  { label: 'Gondal Road', city: 'Rajkot' },
  { label: 'Mavdi', city: 'Rajkot' },
  { label: 'Ghanteshwer', city: 'Rajkot' },
  { label: 'Bhakti Nagar', city: 'Rajkot' },
  { label: 'Chandra Park', city: 'Rajkot' },
];

type LocationAutocompleteProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export function LocationAutocomplete({
  id,
  label,
  value,
  onChange,
  placeholder = 'Enter your location',
  required = false,
  disabled = false,
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return locationSuggestions.filter((item) => item.label.toLowerCase().startsWith(query));
  }, [value]);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1 relative">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => {
          if (disabled) {
            return;
          }

          onChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (disabled) {
            return;
          }

          setIsOpen(true);
        }}
        onBlur={() => {
          window.setTimeout(() => setIsOpen(false), 120);
        }}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        disabled={disabled}
      />

      {isOpen && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-auto rounded-lg border border-gray-200 bg-white shadow-md">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleSelect(suggestion.label)}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100"
            >
              <span>{suggestion.label}</span>
              <span className="ml-2 text-xs text-gray-400">- {suggestion.city}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
