import { getAccessToken } from './otp-auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sevalink-backend-api.onrender.com';

export interface CreateBookingPayload {
  providerId: string;
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  durationHours: number;
  lat: number;
  lng: number;
  serviceAddress: string;
  patientNotes?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: Record<string, unknown>;
}

export async function createBooking(payload: CreateBookingPayload): Promise<BookingResponse> {
  const token = getAccessToken();
  if (!token) {
    return { success: false, message: 'Authentication required. Please verify your phone number again.' };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/patient/homecare/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Failed to create booking (${res.status})`,
      };
    }

    return {
      success: true,
      message: 'Booking created successfully',
      booking: data,
    };
  } catch (error) {
    console.error('[booking-api] createBooking network error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

export async function searchServices(query: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/homecare-service/services/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function discoverProviders(lat: number, lng: number, serviceId: string) {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        serviceId: serviceId,
        radiusKm: '50'
    });

    try {
        const res = await fetch(`${API_BASE_URL}/patient/homecare/discovery?${params.toString()}`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}
