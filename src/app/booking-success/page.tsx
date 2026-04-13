'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { jsPDF } from 'jspdf';

import Footer from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const getParam = (value: string | null, fallback = '-') => value?.trim() || fallback;

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();

  const bookingId = getParam(searchParams.get('bookingId'));
  const name = getParam(searchParams.get('name'));
  const phone = getParam(searchParams.get('phone'));
  const service = getParam(searchParams.get('service'));
  const subService = getParam(searchParams.get('subService'));
  const agency = getParam(searchParams.get('agency'));
  const date = getParam(searchParams.get('date'));
  const time = getParam(searchParams.get('time'));
  const location = getParam(searchParams.get('location'));

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('SevaLink Home Care - Booking Receipt', 14, 18);

    doc.setFontSize(11);
    doc.text(`Booking ID: ${bookingId}`, 14, 30);
    doc.text(`Name: ${name}`, 14, 40);
    doc.text(`Phone: ${phone}`, 14, 50);
    doc.text(`Primary Service: ${service}`, 14, 60);
    doc.text(`Service Type: ${subService}`, 14, 70);
    doc.text(`Agency: ${agency}`, 14, 80);
    doc.text(`Date: ${date}`, 14, 90);
    doc.text(`Time: ${time}`, 14, 100);
    doc.text(`Location: ${location}`, 14, 110);

    doc.setFontSize(10);
    doc.text('Thank you for booking with SevaLink. Our team will contact you shortly.', 14, 126);

    doc.save(`${bookingId}-receipt.pdf`);
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
            <div className="text-center">
              <p className="text-4xl" aria-hidden="true">✓</p>
              <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">Your booking has been confirmed</h1>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">Our team will contact you shortly</p>
            </div>

            <div className="mt-6 space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              <p><span className="font-semibold">Booking ID:</span> {bookingId}</p>
              <p><span className="font-semibold">Name:</span> {name}</p>
              <p><span className="font-semibold">Phone:</span> {phone}</p>
              <p><span className="font-semibold">Service:</span> {service}</p>
              <p><span className="font-semibold">Service Type:</span> {subService}</p>
              <p><span className="font-semibold">Agency:</span> {agency}</p>
              <p><span className="font-semibold">Date & Time:</span> {date} at {time}</p>
              <p><span className="font-semibold">Location:</span> {location}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Download Receipt
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
