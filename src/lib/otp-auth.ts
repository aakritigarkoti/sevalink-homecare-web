/**
 * OTP Authentication utility — Production-ready
 *
 * Uses the same backend endpoints as the Sevalink Patient App:
 *   - POST /patients/send-otp   { phone }           → { message }
 *   - POST /patients/verify-otp { phone, otp }      → { accessToken, is_new_user, user, message }
 *
 * The backend is deployed at https://sevalink-backend-api.onrender.com.
 * For web clients the refresh token is set as an httpOnly cookie by the server,
 * so we only store the accessToken in localStorage.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sevalink-backend-api.onrender.com';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  is_new_user?: boolean;
  user?: {
    id: string;
    phone: string;
    role: string;
    name: string | null;
  };
  /** HTTP status code from the backend (only present on errors) */
  statusCode?: number;
}

// ─── Send OTP ───────────────────────────────────────────────────────────────

/**
 * Send OTP to the given phone number via the Sevalink backend.
 * Endpoint: POST /patients/send-otp
 */
export async function sendOtp(phone: string): Promise<SendOtpResponse> {
  if (!phone || !phone.trim()) {
    return { success: false, message: 'Phone number is required' };
  }

  const cleanPhone = phone.trim();

  try {
    const res = await fetch(`${API_BASE_URL}/patients/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone }),
      credentials: 'include', // send/receive cookies
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 429) {
        return {
          success: false,
          message: 'Too many requests. Please wait 60 seconds before trying again.',
        };
      }
      return {
        success: false,
        message: data?.message || `Failed to send OTP (${res.status})`,
      };
    }

    return {
      success: true,
      message: data?.message || 'OTP sent successfully',
    };
  } catch (error) {
    console.error('[otp-auth] sendOtp network error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

// ─── Verify OTP ─────────────────────────────────────────────────────────────

/**
 * Verify OTP against the Sevalink backend.
 * Endpoint: POST /patients/verify-otp
 *
 * On success the backend:
 *   - Returns { accessToken, is_new_user, user, message }
 *   - Sets an httpOnly `refresh_token` cookie (for web platform)
 */
export async function verifyOtp(phone: string, otp: string): Promise<VerifyOtpResponse> {
  if (!phone || !phone.trim()) {
    return { success: false, message: 'Phone number is required' };
  }
  if (!otp || !otp.trim()) {
    return { success: false, message: 'OTP is required' };
  }

  const cleanPhone = phone.trim();
  const cleanOtp = otp.trim();

  try {
    const res = await fetch(`${API_BASE_URL}/patients/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone, otp: cleanOtp }),
      credentials: 'include', // important: receives the httpOnly refresh_token cookie
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 400) {
        return {
          success: false,
          message: data?.message || 'Invalid OTP. Please check and try again.',
          statusCode: 400,
        };
      }
      if (res.status === 429) {
        return {
          success: false,
          message: 'Too many attempts. Please wait before trying again.',
          statusCode: 429,
        };
      }
      return {
        success: false,
        message: data?.message || `Verification failed (${res.status})`,
        statusCode: res.status,
      };
    }

    const accessToken = data?.accessToken;
    if (!accessToken) {
      return {
        success: false,
        message: 'No access token received from server',
      };
    }

    // Persist auth data in localStorage
    try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('phone', cleanPhone);
      localStorage.setItem('authTimestamp', new Date().toISOString());
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (e) {
      console.warn('[otp-auth] Failed to store auth data in localStorage:', e);
    }

    return {
      success: true,
      message: data.message || 'Phone number verified successfully',
      accessToken,
      is_new_user: data.is_new_user,
      user: data.user,
    };
  } catch (error) {
    console.error('[otp-auth] verifyOtp network error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Clear all locally-stored authentication data */
export function clearAuthData(): void {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('phone');
    localStorage.removeItem('authTimestamp');
    localStorage.removeItem('user');
  } catch (e) {
    console.warn('[otp-auth] Failed to clear auth data:', e);
  }
}

/** Retrieve the stored access token (or null) */
export function getAccessToken(): string | null {
  try {
    return localStorage.getItem('accessToken');
  } catch {
    return null;
  }
}

/** Quick check whether a token is stored */
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
