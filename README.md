# Distinction Gardens — Luxury Hospitality Website

A luxury, responsive, mobile-first website for **Distinction Gardens**, a garden retreat, boutique hotel, and premier conference destination located along Kisumu-Siaya Road near Karapul Primary School in Siaya, Kenya.

Built with semantic HTML5, modern vanilla CSS, and vanilla JavaScript. Zero build steps, zero external framework dependencies, and zero layout shifts. Deployable instantly to static hosting platforms such as Vercel, Netlify, or GitHub Pages.

---

## 1. Architecture & Design System

### Design Tokens & Aesthetics
- **Color Palette:**
  - Cream Backgrounds: `#FBF7EE`, `#F3ECE0`
  - Deep Botanical Green (Accents & Footers): `#1B5E3B`, `#0E3621`, `#082114`
  - Warm Gold (Hairlines, CTAs & Stars): `#C9962B`, `#AF7F1E`, `#DFB253`
  - Charcoal Green Text: `#1F2A24`, `#57655D`
- **Typography:**
  - Display Headings: *Cormorant Garamond* (Google Fonts) with serif fallbacks
  - Body & UI: *Jost* / *Inter* with system sans-serif fallbacks
- **Live Background Slideshow:**
  - Crossfading carousel of verified authentic photos with gentle Ken Burns zoom (`scale(1)` to `scale(1.08)`).
  - Preloads first slide, lazy-loads subsequent slides, pauses on hidden tabs via the Page Visibility API, and disables under `prefers-reduced-motion`.

---

## 2. Single Source of Truth (`js/config.js`)

All operational data, contact channels, reviews, menus, and policies are centrally defined in [`js/config.js`](file:///c:/Users/user/OneDrive/Distinction%20hotel/js/config.js). Every HTML page dynamically binds to this object on load via `data-config` attributes.

### Editing Hotel Details
To update any hotel detail, edit only `js/config.js`:
```javascript
const HOTEL_CONFIG = {
  name: "Distinction Gardens",
  tagline: "Comfort Redefined!",
  
  // Update Phone or WhatsApp
  contact: {
    phone: "+254 725 111888",
    phoneClean: "254725111888",
    whatsAppClean: "254725111888",
    email: "info@distinctiongardens.co.ke"
  },

  // Update Verified M-Pesa Till
  payment: {
    tillNumber: "899734" // Lipa Na M-Pesa Buy Goods Till
  },

  // Update Google Rating periodically
  reputation: {
    googleRating: 4.1,
    reviewCount: 617,
    lastRefreshed: "October 2026"
  }
};
```

---

## 3. Confirmed Facts vs. CONFIRM Checklist

### Confirmed Facts (Verified from Official Signage & Records)
- **Official Name:** Distinction Gardens
- **Official Tagline:** *"Comfort Redefined!"* (verified on reception wall & chef uniform)
- **Physical Address:** Kisumu-Siaya Road, near Karapul Primary School, Siaya 40600, Kenya
- **Phone:** +254 725 111888
- **Email:** info@distinctiongardens.co.ke
- **Facebook:** facebook.com/distinctiongardenske
- **Google Rating:** 4.1 out of 5 stars based on 617+ verified reviews
- **Lipa Na M-Pesa Till Number:** **899734** (verified on 1902 Club Lounge bar counter plaque)
- **Conference Hall Capacity:** Up to 50 delegates in classroom/seminar layout
- **Features & Amenities:** Restaurant & Bar, 1902 Club Lounge, Covered Veranda Lounge, Private Circular Dining Banda Gazebo, Tropical Garden Lawns, Fireplace, BBQ Braai, Free On-site Parking, Free Wi-Fi, 24h Reception Desk, Playground.

### Items Marked `CONFIRM` (Awaiting Hotel Management Sign-Off)
The following items are shown with "Contact us for rates" or marked `CONFIRM` across pages and config:
1. **Total Room Count:** Public listings vary (11, 20, or 21 rooms).
2. **Nightly Room Rates:** Standard Room, Deluxe Garden Room, and The Supreme Suite (shown as *"Contact us for rates"* until confirmed).
3. **Check-in / Check-out Times:** Tentatively set to 12:00 PM check-in and 10:00 AM check-out.
4. **Children Policy:** Family rooms and high chairs available; exact age brackets await sign-off.
5. **Pet Policy:** Current OTA listings state pets are not permitted.
6. **Kisumu Airport Shuttle:** Transfer tariffs and advance notice requirements.
7. **Primary WhatsApp Business Line:** Currently defaulting to +254 725 111888.
8. **Banquet Hall Max Seated Capacity:** Tent setup capacity for large wedding banquets.
9. **General Manager Name:** To be added to official leadership credits.
10. **Road Distances to Attractions:** Calibrated approx distances (Siaya Town ~2.5 km, Museum ~3 km, Usenge/Lake Victoria ~45 km, Kit Mikayi ~55 km, Airport ~60 km).

---

## 4. Photography Asset Management

All photography utilized is verified authentic Distinction Gardens imagery. See [`images/CREDITS.md`](file:///c:/Users/user/OneDrive/Distinction%20hotel/images/CREDITS.md) for full asset provenance.

### Standards for Adding New Photos
1. **Resolution:** Minimum 1600px wide for landscape hero banners, 1200px for card thumbnails.
2. **Formats:** Convert images to modern **WebP** (`.webp`) with universal **JPEG** (`.jpg`) fallbacks.
3. **Sizes:** Generate 800px, 1280px, and 1920px variants using `<picture>` with `srcset`.
4. **Compression:** Keep every base WebP file **strictly under 250 KB**.
5. **No Stock Imagery:** If a shot is not available, use the gradient fallback and list it below.

### Photos Still Needed (Wishlist for On-Site Photographer)
- [ ] Daytime wide-angle exterior facade shot of the main hotel entrance and reception gate from Kisumu-Siaya Road.
- [ ] High-resolution daytime drone shot showing the complete property layout, rooflines, and garden grounds.
- [ ] Professional plated food photography of Whole Fried Lake Victoria Tilapia and Goat Nyama Choma.
- [ ] En-suite bathroom rainfall shower close-up.
- [ ] Children's outdoor playground in active daytime use.

---

## 5. Local Testing & Static Deployment

### Running Locally
To test the website locally, launch any static file server:
```bash
# Using Python:
python -m http.server 8000

# Or using Node:
npx serve .
```
Navigate to `http://localhost:8000` in your web browser.

### Deploying to Vercel (Zero-Config)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Distinction Gardens Production Website"
   ```
2. Deploy via Vercel CLI:
   ```bash
   npx vercel --prod
   ```
   Or push to GitHub and import the repository into the [Vercel Dashboard](https://vercel.com). Because this is a pure static site, Vercel will auto-detect and deploy instantly with global CDN caching.

---

## 6. Phase 2 Back-End Architecture Plan (Future Roadmap)

When Distinction Gardens is ready to activate real-time room availability, automated booking management, and instant Safaricom M-Pesa STK push payments, follow this production blueprint:

### 1. Technology Stack
- **Server:** Node.js (v20+ LTS) with Express.js or Fastify
- **Database:** PostgreSQL (v16+) hosted on Neon, Supabase, or AWS RDS
- **Payment Gateway:** Safaricom Daraja API 2.0 (Lipa Na M-Pesa Online / STK Push)
- **Deployment:** Render, Railway, or Google Cloud Run

### 2. Relational Database Schema (`schema.sql`)
```sql
CREATE TABLE room_types (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    base_rate_kes NUMERIC(10, 2) NOT NULL,
    total_inventory INT NOT NULL DEFAULT 5,
    max_occupancy INT NOT NULL DEFAULT 2
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    guest_name VARCHAR(100) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    guest_email VARCHAR(100),
    room_type_id VARCHAR(50) REFERENCES room_types(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_amount_kes NUMERIC(10, 2) NOT NULL,
    deposit_amount_kes NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING_PAYMENT', -- PENDING, CONFIRMED, CANCELLED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mpesa_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id),
    merchant_request_id VARCHAR(100),
    checkout_request_id VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    mpesa_receipt_number VARCHAR(50),
    transaction_date TIMESTAMP WITH TIME ZONE,
    result_code INT,
    result_desc TEXT,
    status VARCHAR(30) DEFAULT 'PROCESSING'
);
```

### 3. Safaricom Daraja STK Push Integration Workflow
1. **Guest initiates booking:** Front-end collects reservation dates, room preference, and guest phone (`2547XXXXXXXX`).
2. **Server generates booking & tokens:** Node.js backend obtains an OAuth token from `https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`.
3. **STK Push Dispatch:** Server calls `https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest` with:
   - `BusinessShortCode`: `899734` (or Paybill)
   - `Password`: `Base64(ShortCode + PassKey + Timestamp)`
   - `Amount`: Deposit KES
   - `PhoneNumber`: Guest handset
   - `CallBackURL`: `https://api.distinctiongardens.co.ke/webhooks/daraja-callback`
4. **Handset Prompt:** Safaricom prompts the guest on their mobile phone for their M-Pesa PIN.
5. **Callback Verification:** Safaricom calls the backend callback URL with the transaction receipt code (e.g. `SDF1234567`). The backend automatically flips `bookings.status` to `CONFIRMED` and dispatches an automated WhatsApp / SMS confirmation to the guest.
6. **Clean Hooks:** Front-end stubs for `submitAvailabilityCheck`, `initiateDarajaStkPush`, and `pollDarajaPaymentStatus` are already placed in [`js/main.js`](file:///c:/Users/user/OneDrive/Distinction%20hotel/js/main.js).
