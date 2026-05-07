'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  UserRound, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageSquare, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

// Requirement 8: Mock provider data
const mockProviders = [
  { id: "1", name: "Ravi Sharma", qualification: "BSc Nursing", category: "Nurse at Home", experience: 5, base_price: 499 },
  { id: "2", name: "Anjali Verma", qualification: "BSc Nursing", category: "Nurse at Home", experience: 4, base_price: 499 },
  { id: "3", name: "Dr. Amit Singh", qualification: "MBBS, MD", category: "Doctor Visit", experience: 8, base_price: 899 },
  { id: "carebridge", name: "Ravi Sharma", qualification: "BSc Nursing", category: "Nurse at Home", experience: 5, base_price: 499 }, // For compatibility
];

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Requirement 1: Read providerId from URL
  const providerId = searchParams.get('providerId') || searchParams.get('agency'); // fallback for existing links
  const [provider, setProvider] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (providerId) {
      const found = mockProviders.find(p => p.id === providerId) || mockProviders[0];
      setProvider(found);
    } else {
      setProvider(mockProviders[0]);
    }
  }, [providerId]);

  // Requirement 6: Form handling logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Requirement 6: Validation
    if (!formData.fullName || !formData.phone || !formData.address || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Requirement 6: Log data in console
    console.log('Booking Data:', {
      provider_id: provider?.id,
      provider_name: provider?.name,
      scheduled_at: `${formData.date} ${formData.time}`,
      customer_name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      notes: formData.notes
    });

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Optional: redirect to success page after a delay
      setTimeout(() => router.push('/'), 3000);
    }, 1500);
  };

  if (!provider) return null;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </button>

      {/* Requirement 2: Provider Details Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold">Booking Details</h2>
          <span className="text-emerald-100 text-xs uppercase tracking-widest font-bold">Step 1 of 1</span>
        </div>
        
        <div className="p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="h-20 w-20 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <UserRound className="h-10 w-10" />
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{provider.name}</h1>
                <p className="text-emerald-600 font-bold text-sm">{provider.category}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-gray-900">₹{provider.base_price}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">per visit</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <GraduationCap className="h-4 w-4 text-emerald-500" />
                <span>{provider.qualification}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Briefcase className="h-4 w-4 text-emerald-500" />
                <span>{provider.experience} yrs experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requirement 3: Booking Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        {isSuccess ? (
          <div className="p-12 text-center">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500">Your appointment with {provider.name} has been scheduled. You will receive a confirmation call shortly.</p>
            <p className="text-sm text-emerald-600 mt-6 animate-pulse">Redirecting to home...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Service Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <textarea 
                  required
                  rows={3}
                  placeholder="Enter complete address for home visit"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input 
                    type="date" 
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input 
                    type="time" 
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Notes (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <textarea 
                  rows={2}
                  placeholder="Any special instructions for the professional?"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
            <p className="text-center text-xs text-gray-400">
              By confirming, you agree to our terms of service and privacy policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading booking form...</div>}>
          <BookingForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
