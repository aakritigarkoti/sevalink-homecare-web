# OTP Implementation - Quick Testing Checklist

## ✅ Implementation Complete

The OTP-based authentication has been successfully integrated into the Homecare booking flow with:

- ✅ Backend API integration (localhost:5005)
- ✅ Automatic demo mode fallback
- ✅ Token storage in localStorage
- ✅ User-friendly status messages
- ✅ Error handling for invalid OTP
- ✅ Connection status detection

## 🧪 Testing Scenarios

### Scenario 1: Backend Connected (Dev Mode)
```
Run Backend on localhost:5005
Dev OTP: 123456

Steps:
1. Go to http://localhost:3001/book
2. Enter phone: 9876543210
3. Click "Verify OTP"
   → Expect: "OTP sent to your phone (backend mode)"
4. Enter OTP: 123456
5. Click "Verify OTP"
   → Expect: "Phone number verified successfully"
   → accessToken stored in localStorage
```

### Scenario 2: Backend Disconnected (Demo Mode)
```
Backend stopped/unreachable
Demo OTP: 1234

Steps:
1. Go to http://localhost:3001/book
2. Enter phone: 9876543210
3. Click "Verify OTP"
   → Expect: "Demo mode: OTP ready for testing"
   → OTP hint: "Demo OTP: 1234"
4. Enter OTP: 1234
5. Click "Verify OTP"
   → Expect: "Phone number verified (demo mode)"
   → Demo token stored in localStorage
```

### Scenario 3: Invalid OTP Handling
```
Backend Mode:
- Send OTP with backend running
- Enter wrong OTP (not 123456)
- Expect: "Invalid OTP. Please try again."

Demo Mode:
- Send OTP without backend
- Enter wrong OTP (not 1234)
- Expect: "Invalid OTP. Demo mode uses: 1234"
```

### Scenario 4: Phone Number Change
```
1. Enter phone: 9876543210
2. Click "Verify OTP" → OTP field appears
3. Change phone to: 9123456789
4. Expect:
   - OTP input disappears
   - Status clears
   - Must resend OTP
```

### Scenario 5: Booking After OTP Verification
```
1. Complete OTP verification
2. Fill booking form:
   - Full Name: John Doe
   - Location: Select from map
   - Service Type: Select from dropdown
   - Date: Pick future date
   - Time: Pick time
3. Submit booking
4. Expect:
   - Redirect to booking-success page
   - Booking ID generated
   - All details displayed
```

## 🔍 Verification

Check localStorage after successful OTP verification:
```javascript
// Open browser DevTools Console
localStorage.getItem('accessToken')        // Should return token string
localStorage.getItem('phone')              // Should return phone number
localStorage.getItem('authTimestamp')      // Should return ISO timestamp
localStorage.getItem('isDemoMode')         // 'true' for demo, 'false' for backend
```

## 📝 Key Implementation Details

### Files Created:
- `src/lib/otp-auth.ts` - OTP utility functions

### Files Modified:
- `src/app/book/page.tsx` - Integrated OTP authentication

### Backend Endpoints:
- `POST http://localhost:5005/auth/send-otp` - Send OTP
- `POST http://localhost:5005/auth/verify-otp` - Verify OTP and get token

### OTP Codes:
- Production: Backend sends via SMS
- Dev/Backend Mode: "123456"
- Demo/Testing Mode: "1234"

## 🚀 Dev Server

The dev server is running on:
```
http://localhost:3001
```

Navigate to:
```
http://localhost:3001/book     - Booking flow with OTP
http://localhost:3001          - Homepage
```

## ⚙️ Configuration

To change settings, edit `src/lib/otp-auth.ts`:

```typescript
const BACKEND_URL = 'http://localhost:5005';  // Backend URL
const DEMO_OTP = '1234';                      // Demo OTP code
const BACKEND_DEV_OTP = '123456';            // Backend dev OTP
```

## 🔄 Flow Diagram

```
User enters phone
    ↓
Clicks "Verify OTP"
    ├→ Backend API responds → "Backend mode"
    └→ Backend API fails → "Demo mode"
    ↓
OTP input appears with appropriate message
    ↓
User enters OTP + clicks "Verify OTP"
    ├→ Backend mode: Verify with backend, get accessToken
    └→ Demo mode: Verify against "1234", generate demo token
    ↓
Token stored in localStorage
    ↓
Form fields enabled, user can complete booking
```

## 📊 Status Messages

| Scenario | Button Status | Input Hint | After OTP |
|----------|---------------|-----------|-----------|
| Before Send | "Verify OTP" | - | - |
| Sending OTP | "Sending..." | - | - |
| Backend Connected | "Verify OTP" | "Backend Mode: Check phone" | "Phone verified (backend mode)" |
| Demo Mode | "Verify OTP" | "Demo OTP: 1234" | "Phone verified (demo mode)" |
| Invalid OTP | "Verify OTP" | Error shown | - |

## 🐛 Troubleshooting

**Problem**: OTP field doesn't appear
- Check: Backend running or stopped as expected
- Check: Console for error messages

**Problem**: "Failed to send OTP" error
- Check: Backend is running on localhost:5005
- Check: No CORS policy blocking requests
- Check: Network connectivity

**Problem**: Token not persisting
- Check: localStorage not disabled in privacy settings
- Check: Browser DevTools Console for errors

## 📚 Additional Resources

- Full documentation: `docs/otp-implementation-guide.md`
- OTP utility source: `src/lib/otp-auth.ts`
- Booking page integration: `src/app/book/page.tsx`

---

**Status**: ✅ Ready for Testing
**Dev Server**: http://localhost:3001
**Backend**: http://localhost:5005 (optional for demo mode)
