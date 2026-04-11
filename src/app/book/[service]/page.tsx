'use client';

import { FormEvent, useState } from 'react';

import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LocationAutocomplete } from '@/components/forms/LocationAutocomplete';

type BookingFormData = {
  fullName: string;
  phoneNumber: string;
  location: string;
  date: string;
  time: string;
  notes: string;
};

type ServiceConfig = {
  title: string;
  subtitle: string;
  serviceLabel: string;
};

const initialFormData: BookingFormData = {
  fullName: '',
  phoneNumber: '',
  location: '',
  date: '',
  time: '',
  notes: '',
};

const serviceConfigs: Record<string, ServiceConfig> = {
  'elder-care': {
    title: 'Book Elder Care at Home',
    subtitle: 'Select the type of nursing service you need and provide your details',
    serviceLabel: 'Elder Care',
  },
  'doctor-visit': {
    title: 'Book Doctor Visit at Home',
    subtitle: 'Select the type of nursing service you need and provide your details',
    serviceLabel: 'Doctor Visit',
  },
  'post-surgery': {
    title: 'Book Post-Surgery Care at Home',
    subtitle: 'Select the type of nursing service you need and provide your details',
    serviceLabel: 'Post-Surgery',
  },
  physiotherapy: {
    title: 'Book Physiotherapy at Home',
    subtitle: 'Select the type of nursing service you need and provide your details',
    serviceLabel: 'Physiotherapy',
  },
  'diabetes-care': {
    title: 'Book Diabetes Care at Home',
    subtitle: 'Select the type of nursing service you need and provide your details',
    serviceLabel: 'Diabetes Care',
  },
  'mental-health': {
    title: 'Book Mental Health Support at Home',
    subtitle: 'Select the type of nursing service you need and provide your details',
    serviceLabel: 'Mental Health Support',
  },
};

export default function ServiceBookingPage({ params }: { params: { service: string } }) {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  const config = serviceConfigs[params.service] ?? {
    title: 'Book Home Care Service',
    subtitle: 'Select the type of nursing service you need and provide your details',
    serviceLabel: 'Home Care Service',
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      category: params.service,
      selectedService: config.serviceLabel,
      formData,
    });
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
          <div className="mx-auto mb-6 max-w-3xl text-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{config.title}</h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">{config.subtitle}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-md"
          >
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, fullName: event.target.value }))
                }
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
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, phoneNumber: event.target.value }))
                }
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
                placeholder="Enter your address or location"
                required
              />

            <div className="space-y-1">
              <label htmlFor="serviceLabel" className="text-sm font-medium text-gray-700">
                Service Type
              </label>
              <input
                id="serviceLabel"
                type="text"
                value={config.serviceLabel}
                readOnly
                className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, date: event.target.value }))
                }
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
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, time: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Additional Requirements
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, notes: event.target.value }))
                }
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                placeholder="Any specific care instructions"
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
