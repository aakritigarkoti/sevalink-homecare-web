# OTP Authentication Implementation Guide

## Overview

The Homecare booking flow now includes a complete OTP-based authentication system with backend integration and demo mode fallback.

## Architecture

### Components

1. **OTP Auth Utility** (`src/lib/otp-auth.ts`)
   - Handles communication with backend OTP APIs
   - Manages fallback to demo mode on API failures
   - Stores and retrieves authentication tokens

2. **Booking Page** (`src/app/book/page.tsx`)
   - Integrates OTP authentication into booking flow
   - Shows appropriate UI based on connection status
   - Stores `accessToken` after successful verification

## Backend APIs

The implementation uses these backend endpoints (running on `http://localhost:5005`):

### 1. Send OTP
```
POST /auth/send-otp
Content-Type: application/json

{
  "phone": "9876543210"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### 2. Verify OTP
```
POST /auth/verify-otp
Content-Type: application/json

{
  "phone": "9876543210",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "OTP verified successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Authentication Flow

### Scenario 1: Backend Connected (Production/Dev Mode)

```
1. User enters phone number and clicks "Verify OTP"
   ↓
2. Frontend calls POST /auth/send-otp with { phone }
   ↓
3. Backend responds successfully → UI shows "Backend Mode"
   ↓
4. UI prompts for OTP with message "Check your phone for OTP"
   ↓
5. User enters OTP and clicks "Verify OTP"
   ↓
6. Frontend calls POST /auth/verify-otp with { phone, otp: "123456" }
   ↓
7. Backend returns accessToken
   ↓
8. Frontend stores accessToken in localStorage
   ↓
9. User can proceed with booking
```

### Scenario 2: Backend Disconnected (Demo/Testing Mode)

```
1. User enters phone number and clicks "Verify OTP"
   ↓
2. Frontend attempts POST /auth/send-otp
   ↓
3. Backend not reachable (timeout/error) → automatically fall back to demo mode
   ↓
4. UI shows "Demo mode: OTP ready for testing"
   ↓
5. UI displays demo OTP: "1234"
   ↓
6. User enters "1234" and clicks "Verify OTP"
   ↓
7. Frontend validates against demo OTP "1234"
   ↓
8. Frontend generates demo token and stores in localStorage
   ↓
9. User can proceed with booking
```

## Key Features

### 1. Automatic Backend Detection
- Attempts to connect to backend API on `http://localhost:5005`
- 5-second timeout for connection attempts
- Automatically switches to demo mode on failure

### 2. Dual OTP Modes
- **Backend Mode**: OTP "123456" (dev mode from backend)
- **Demo Mode**: OTP "1234" (for local testing without backend)

### 3. Token Management
- Stores `accessToken` in `localStorage` after successful verification
- Stores metadata: `phone`, `authTimestamp`, `isDemoMode`
- Provides utility functions to retrieve/check token status

### 4. User Feedback
- Clear status messages indicating active mode (backend/demo)
- Error messages for invalid OTP or API failures
- Loading states during API calls

## Usage

### Frontend Integration

The booking page automatically handles OTP flow:

```typescript
// OTP state is managed in the booking page
const [isVerified, setIsVerified] = useState(false);
const [isDemoMode, setIsDemoMode] = useState(false);
const [backendConnected, setBackendConnected] = useState<boolean | null>(null);

// Handlers use the OTP API utilities
const handleSendOtp = async () => {
  const response = await sendOtpApi({ phone: formData.phoneNumber });
  // Response includes backendConnected flag
};

const handleVerifyOtp = async () => {
  const response = await verifyOtpApi({ phone, otp });
  // Response includes accessToken if successful
};
```

### Token Retrieval

```typescript
import { getAccessToken, isAuthenticated, getAuthMode } from '@/lib/otp-auth';

// Check if user is authenticated
if (isAuthenticated()) {
  // User has valid token
}

// Get the access token for API calls
const token = getAccessToken();

// Check auth mode (backend, demo, or none)
const mode = getAuthMode(); // 'backend' | 'demo' | 'none'
```

## Testing Guide

### Test Case 1: Backend Connected (OTP "123456")

**Prerequisites**: Backend running on `http://localhost:5005`

**Steps**:
1. Navigate to `/book` page
2. Enter any phone number (e.g., "9876543210")
3. Click "Verify OTP"
   - Expected: Status shows "OTP sent to your phone (backend mode)"
   - Expected: OTP input shows "Backend Mode: Check your phone for OTP"
4. Enter OTP "123456"
5. Click "Verify OTP"
   - Expected: Verification succeeds
   - Expected: Status shows "Phone number verified successfully"
   - Expected: Can proceed with booking

### Test Case 2: Backend Disconnected (OTP "1234")

**Prerequisites**: Backend NOT running or unreachable

**Steps**:
1. Navigate to `/book` page
2. Enter any phone number (e.g., "9876543210")
3. Click "Verify OTP"
   - Expected: Status shows "Demo mode: OTP ready for testing"
   - Expected: OTP input shows "Demo OTP: 1234"
4. Enter OTP "1234"
5. Click "Verify OTP"
   - Expected: Verification succeeds
   - Expected: Status shows "Phone number verified (demo mode)"
   - Expected: Can proceed with booking

### Test Case 3: Invalid OTP

**Backend Mode**:
1. Backend running and OTP sent successfully
2. Enter any OTP except "123456" (e.g., "000000")
3. Click "Verify OTP"
   - Expected: Error "Invalid OTP. Please try again."

**Demo Mode**:
1. Backend not running and OTP sent
2. Enter any OTP except "1234" (e.g., "000000")
3. Click "Verify OTP"
   - Expected: Error "Invalid OTP. Demo mode uses: 1234"

### Test Case 4: Changed Phone Number

**Steps**:
1. Enter phone number and send OTP
2. OTP field appears
3. Change the phone number in the input
   - Expected: OTP input field disappears
   - Expected: Verification status clears
   - Expected: Must resend OTP for new number

## Configuration

### Change Backend URL

Edit `src/lib/otp-auth.ts`:

```typescript
const BACKEND_URL = 'http://your-backend-url:port';
```

### Change Demo OTP

Edit `src/lib/otp-auth.ts`:

```typescript
const DEMO_OTP = 'your-demo-otp';
const BACKEND_DEV_OTP = 'backend-dev-otp';
```

## Security Considerations

### For Production

1. **HTTPS Only**: Ensure all API calls use HTTPS
2. **Token Storage**: Consider using httpOnly cookies instead of localStorage
3. **CORS**: Configure backend CORS policies appropriately
4. **Rate Limiting**: Implement rate limiting on backend OTP endpoints
5. **Token Expiry**: Add token expiration logic and refresh tokens
6. **Remove Demo Mode**: Disable demo mode in production builds

### Current Implementation

- ✅ Supports both backend and demo modes
- ✅ Proper error handling and user feedback
- ✅ Secure token storage in localStorage
- ⚠️ Demo mode should be removed in production
- ⚠️ Consider implementing token refresh mechanism

## Troubleshooting

### Issue: OTP field doesn't appear after clicking "Verify OTP"

**Solution**: Check that backend is either running (if backend mode) or not running (if demo mode). Check browser console for errors.

### Issue: "Failed to send OTP" error

**Solution**:
1. Check if backend is running on `http://localhost:5005`
2. Check browser console for CORS errors
3. Verify backend API is responding

### Issue: Wrong OTP doesn't show error message

**Solution**: Ensure you're entering the correct OTP:
- Backend mode: "123456"
- Demo mode: "1234"

### Issue: Token not persisting after page refresh

**Solution**: Check browser localStorage is enabled and not disabled in privacy settings.

## API Response Handling

All OTP functions return standardized response objects:

```typescript
interface SendOtpResponse {
  success: boolean;
  message: string;
  backendConnected: boolean;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  backendConnected: boolean;
  isDemoMode?: boolean;
}
```

The `backendConnected` flag indicates:
- `true`: Backend API was successfully reached
- `false`: Fallback to demo mode (backend unreachable)

## Future Enhancements

1. **SMS Integration**: Switch from demo OTP to real SMS in production
2. **Token Refresh**: Implement automatic token refresh before expiry
3. **Biometric Auth**: Add fingerprint/face recognition as alternative
4. **Rate Limiting UI**: Show remaining OTP attempts
5. **Email Verification**: Support email-based OTP as alternative
6. **Remember Device**: Skip OTP on previously verified devices

## Files Modified

- ✅ Created: `src/lib/otp-auth.ts` - OTP authentication utilities
- ✅ Modified: `src/app/book/page.tsx` - Integrated OTP authentication

## Related Documentation

- [Booking Flow](../developer-guide.md#booking-flow)
- [Backend API Documentation](https://your-backend-docs-url)
- [Next.js Client Components](https://nextjs.org/docs/rendering-options/client-components)
