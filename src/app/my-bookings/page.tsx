'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookingCard } from '@/components/booking/BookingCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { BookingStatus } from '@/lib/constants';
import { Search, PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Mock Bookings Data
const MOCK_BOOKINGS = [
  {
    id: "b1",
    provider_name: "Ravi Sharma",
    category: "Nurse at Home",
    scheduled_at: "2026-05-10T10:00",
    address: "123, Green Park, Rajkot",
    status: "pending" as BookingStatus
  },
  {
    id: "b2",
    provider_name: "Anjali Verma",
    category: "Nurse at Home",
    scheduled_at: "2026-05-08T14:30",
    address: "Satellite, Ahmedabad",
    status: "accepted" as BookingStatus
  },
  {
    id: "b3",
    provider_name: "Dr. Amit Singh",
    category: "Doctor Visit",
    scheduled_at: "2026-05-01T11:00",
    address: "Kalawad Road, Rajkot",
    status: "completed" as BookingStatus
  },
  {
    id: "b4",
    provider_name: "Suresh Kumar",
    category: "Physiotherapy",
    scheduled_at: "2026-04-25T16:00",
    address: "Vesu, Surat",
    status: "cancelled" as BookingStatus
  }
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setBookings(MOCK_BOOKINGS);
      setLoading(false);
      // Uncomment to test error state
      // setError("Something went wrong while fetching your bookings.");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and track your healthcare service appointments</p>
            </div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition"
            >
              <PlusCircle className="h-4 w-4" />
              New Booking
            </Link>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
              <LoadingSpinner message="Fetching your bookings..." />
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-2xl p-12 shadow-sm border border-red-100 text-center">
              <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Something went wrong</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition"
              >
                Try Again
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center">
              <div className="h-16 w-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h2>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">You haven't booked any homecare services yet. Start by finding a provider.</p>
              <Link 
                href="/"
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
              >
                Browse Providers
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} {...booking} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
