'use client';

import { FormEvent, useState } from 'react';

import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LocationAutocomplete } from '@/components/forms/LocationAutocomplete';

type BookingFormData = {
  fullName: string;
  phoneNumber: string;
  location: string;
  serviceType: string;
  date: string;
  time: string;
};

const initialFormData: BookingFormData = {
  fullName: '',
  phoneNumber: '',
  location: '',
  serviceType: 'Nursing Care',
  date: '',
  time: '',
};

const serviceOptions = [
  'Nursing Care',
  'Elder Care',
  'Doctor Visit',
  'Post-Surgery',
  'Physiotherapy',
  'Diabetes Care',
  'Mental Health Support',
];

export default function BookPage() {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
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
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Book Home Care Service</h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Fill in your details to book a service at your home
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-md"
          >
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={(event) => setFormData((prev) => ({ ...prev, phoneNumber: event.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <LocationAutocomplete
              id="location"
              label="Location"
              value={formData.location}
              onChange={(location) => setFormData((prev) => ({ ...prev, location }))}
              placeholder="Enter your location"
              required
            />

            <div className="space-y-1">
              <label htmlFor="serviceType" className="text-sm font-medium text-gray-700">
                Service Type
              </label>
              <select
                id="serviceType"
                value={formData.serviceType}
                onChange={(event) => setFormData((prev) => ({ ...prev, serviceType: event.target.value }))}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                required
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="time" className="text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(event) => setFormData((prev) => ({ ...prev, time: event.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-emerald-700"
            >
              Confirm Booking
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
