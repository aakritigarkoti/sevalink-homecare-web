'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LocationAutocomplete } from '@/components/forms/LocationAutocomplete';
import {
  getServiceLabelForBooking,
  getSubServiceOptionsForPrimary,
  normalizeSearchTerm,
  resolveServiceId,
} from '@/lib/home-care-search-data';
import { resolveServiceImage } from '@/lib/service-images';

type BookingFormData = {
  fullName: string;
  phoneNumber: string;
  location: string;
  primaryService: string;
  subServiceType: string;
  date: string;
  time: string;
};

const initialFormData: BookingFormData = {
  fullName: '',
  phoneNumber: '',
  location: '',
  primaryService: 'Nursing Care',
  subServiceType: 'ICU Nurse',
  date: '',
  time: '',
};

export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [lockedServiceId, setLockedServiceId] = useState('nurse');
  const [agencyId, setAgencyId] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [otpStatus, setOtpStatus] = useState('');
  const [otpError, setOtpError] = useState('');
  const [formError, setFormError] = useState('');

  const subServiceOptions = getSubServiceOptionsForPrimary(lockedServiceId);

  useEffect(() => {
    const selectedService = searchParams.get('service');
    const selectedAgency = searchParams.get('agency');
    const selectedLocation = searchParams.get('location');

    if (selectedAgency) {
      setAgencyId(selectedAgency);
    }

    if (selectedLocation) {
      setFormData((prev) => ({
        ...prev,
        location: selectedLocation,
      }));
    }

    if (!selectedService) {
      return;
    }

    const normalizedService = normalizeSearchTerm(selectedService);
    const resolvedServiceId = resolveServiceId(normalizedService) || normalizedService;
    const mappedServiceLabel = getServiceLabelForBooking(resolvedServiceId);
    const nextSubServiceOptions = getSubServiceOptionsForPrimary(resolvedServiceId);
    const firstSubService = nextSubServiceOptions[0] ?? 'General Home Care Support';

    setLockedServiceId(resolvedServiceId);

    setFormData((prev) => ({
      ...prev,
      primaryService: mappedServiceLabel,
      subServiceType: firstSubService,
    }));
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    if (!isVerified) {
      setFormError('Phone number verification is required before booking');
      return;
    }

    if (!formData.fullName.trim()) {
      setFormError('Full Name is required');
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setFormError('Phone Number is required');
      return;
    }

    if (!formData.location.trim()) {
      setFormError('Location is required');
      return;
    }

    if (!formData.subServiceType.trim()) {
      setFormError('Service Type is required');
      return;
    }

    if (!formData.date) {
      setFormError('Date is required');
      return;
    }

    if (!formData.time) {
      setFormError('Time is required');
      return;
    }

    const bookingId = `BK-${Date.now()}`;
    const successParams = new URLSearchParams({
      bookingId,
      name: formData.fullName,
      phone: formData.phoneNumber,
      service: formData.primaryService,
      subService: formData.subServiceType,
      agency: agencyId || 'Not Specified',
      date: formData.date,
      time: formData.time,
      location: formData.location,
    });

    router.push(`/booking-success?${successParams.toString()}`);
  };

  const handleSendOtp = () => {
    if (!formData.phoneNumber.trim()) {
      setOtpError('Enter phone number first');
      setOtpStatus('');
      return;
    }

    setIsOtpSent(true);
    setIsVerified(false);
    setOtp('');
    setOtpError('');
    setOtpStatus('OTP sent');
  };

  const handleVerifyOtp = async () => {
    if (!isOtpSent) {
      return;
    }

    setIsOtpVerifying(true);
    setOtpError('');
    setOtpStatus('');

    await new Promise((resolve) => setTimeout(resolve, 600));

    if (otp.trim() === '123456') {
      setIsVerified(true);
      setOtpStatus('Phone number verified');
      setOtpError('');
    } else {
      setIsVerified(false);
      setOtpError('Invalid OTP');
      setOtpStatus('');
    }

    setIsOtpVerifying(false);
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
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-2">
              <div className="shrink-0 rounded-[10px] border border-gray-200">
                <Image
                  src={resolveServiceImage(lockedServiceId)}
                  alt={formData.primaryService}
                  width={80}
                  height={80}
                  quality={100}
                  className="h-20 w-20 object-cover rounded-[10px]"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{formData.primaryService} booking details</p>
            </div>

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
                onChange={(event) => {
                  const nextPhoneNumber = event.target.value;

                  setFormData((prev) => ({ ...prev, phoneNumber: nextPhoneNumber }));
                  setIsVerified(false);
                  setIsOtpSent(false);
                  setOtp('');
                  setOtpStatus('');
                  setOtpError('');
                }}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                placeholder="Enter your phone number"
                required
              />

              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                  Verify OTP
                </button>
                {otpStatus ? <span className="text-xs text-emerald-700">{otpStatus}</span> : null}
              </div>

              {isOtpSent && !isVerified ? (
                <div className="mt-2 space-y-2">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                    Demo OTP: 123456
                  </div>

                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.slice(0, 6))}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                    placeholder="Enter 6-digit OTP"
                    inputMode="numeric"
                    maxLength={6}
                  />

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isOtpVerifying}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isOtpVerifying ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              ) : null}

              {otpError ? <p className="mt-2 text-xs text-red-600">{otpError}</p> : null}
            </div>

            <LocationAutocomplete
              id="location"
              label="Location"
              value={formData.location}
              onChange={(location) => setFormData((prev) => ({ ...prev, location }))}
              placeholder="Enter your location"
              required
              disabled={!isVerified}
            />

            <div className="space-y-1">
              <label htmlFor="primaryService" className="text-sm font-medium text-gray-700">
                Booking For
              </label>
              <input
                id="primaryService"
                type="text"
                value={formData.primaryService}
                readOnly
                className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="subServiceType" className="text-sm font-medium text-gray-700">
                Service Type
              </label>
              <select
                id="subServiceType"
                value={formData.subServiceType}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, subServiceType: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-500"
                required
                disabled={!isVerified}
              >
                {subServiceOptions.map((option) => (
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
                disabled={!isVerified}
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
                disabled={!isVerified}
              />
            </div>

            {formError ? <p className="text-xs text-red-600">{formError}</p> : null}

            <button
              type="submit"
              disabled={!isVerified}
              className="w-full rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
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
