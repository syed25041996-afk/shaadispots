# ShaadiSpots Mobile 📱✨

A high-performance, royal-themed mobile application for discovering, shortlisting, and booking premier wedding halls, kalyana mantapas, and convention centers across Bengaluru.

---

## 💎 Features at a Glance

- **Royal Heritage Aesthetics**: Designed with royal Indian wedding hues — Royal Maroon (`#881337`), Antique Gold (`#d4af37`), Ivory Cream (`#fdfbf7`), and Deep Charcoal Stone.
- **Strictly Lightweight & Fast (Zero 3D Overhead)**:
  - Explicitly built **without** 3D canvas, Three.js, `@react-three/fiber`, or `@react-three/rapier` to ensure near-instant boot, minimal battery consumption, and smooth 60 FPS performance on all mobile devices.
- **Rich 14-Venue Bengaluru Directory**: Authentic kalyana mantapas, palace grounds, and 5-star hotel banquet halls complete with high-resolution imagery, pricing breakdown (hall rent vs per plate catering), capacity metrics, and hall dimensions.
- **Instant Search & Locality Filtering**: Filter by popular Bengaluru hubs (Palace Grounds, Koramangala, Jayanagar, Whitefield, Malleshwaram, Indiranagar, etc.).
- **Comprehensive Venue Filtering**:
  - Budget presets (Under ₹2L, ₹2L–₹5L, ₹5L+)
  - Guest capacity presets (Intimate <300, Grand 300–800, Mega 800+)
  - Must-have amenities: Pure Veg Only, Central AC, Dedicated Parking, Guest Rooms.
- **Shortlist & Offline Bookmarking**: Save dream venues with one tap; state is persisted locally via `@react-native-async-storage/async-storage`.
- **In-App Booking & Enquiry Engine**:
  - Guest count selector, event date picker, custom requests.
  - Generates booking references saved locally under the **Enquiries** tab.
  - Direct 24-hour concierge follow-up integration.
- **Royal Concierge Screen**:
  - Direct one-touch calling (`tel:`), instant WhatsApp chat (`wa.me`), and email support.
  - Comprehensive wedding venue FAQs accordion.
  - Venue owner onboarding portal ("List Your Venue").

---

## 📂 Project Architecture

```
mobile/
├── App.tsx                     # Root App component with providers
├── app.json                    # Expo configuration
├── babel.config.js             # Babel preset configuration
├── index.js                    # Expo entry registration
├── package.json                # Dependencies (Expo 51, React Navigation, AsyncStorage)
├── tsconfig.json               # TypeScript configuration
└── src/
    ├── components/
    │   ├── common/
    │   │   ├── Badge.tsx       # Veg/Non-Veg, AC, rating, and status chips
    │   │   ├── Button.tsx      # Royal gold, maroon, and outline buttons
    │   │   ├── EmptyState.tsx  # Clean empty state placeholders with CTAs
    │   │   └── Header.tsx      # ShaadiSpots header with concierge hotline
    │   ├── halls/
    │   │   ├── EnquiryModal.tsx     # Full booking submission bottom sheet
    │   │   ├── HallCard.tsx         # Responsive venue card with heart bookmark
    │   │   ├── HallFiltersModal.tsx # Filter bottom sheet modal
    │   │   ├── HallGalleryPager.tsx # Horizontal image swipe carousel
    │   │   └── HallSpecsGrid.tsx    # 4-card metric grid & features
    │   └── home/
    │       ├── HeroBanner.tsx       # Search hero banner
    │       ├── QuickAreaChips.tsx   # Horizontal scrollable locality chips
    │       └── StatsStrip.tsx       # Trust & metric badges
    ├── context/
    │   ├── ShortlistContext.tsx # Persistent bookmarking context
    │   └── ToastContext.tsx     # Royal top notification toast banner
    ├── data/
    │   └── halls.ts             # 14 Bengaluru wedding venues data
    ├── navigation/
    │   ├── AppNavigator.tsx     # Native Stack Navigator (MainTabs, HallDetail)
    │   └── TabNavigator.tsx     # 5 Bottom Tabs (Explore, Venues, Saved, Enquiries, Concierge)
    ├── screens/
    │   ├── ConciergeScreen.tsx  # Concierge hotline, FAQs, and onboarding
    │   ├── EnquiriesScreen.tsx  # Active booking requests & reference tracking
    │   ├── HallDetailScreen.tsx # Complete venue specification screen (Zero 3D)
    │   ├── HomeScreen.tsx       # Discovery feed, featured carousels, quick links
    │   └── ListingsScreen.tsx   # Search catalog with sorting and filter modal
    ├── services/
    │   └── hallService.ts       # Async client-side filtering, fetching & storage
    ├── theme/
    │   └── colors.ts            # Royal wedding design tokens
    └── types/
        └── hall.ts              # TypeScript models for venues, reviews, and bookings
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or newer recommended)
- [Expo Go](https://expo.dev/go) app installed on your physical Android or iOS device (optional, for device testing)

### 2. Installation
Navigate into the `mobile` folder and install dependencies:

```bash
cd mobile
npm install
```

### 3. Run the App

Start the Expo bundler:
```bash
npm start
```
or
```bash
npx expo start
```

### 4. Open on Device or Emulator
- **Physical Device**: Open the **Expo Go** app on your phone and scan the QR code displayed in the terminal.
- **Web Browser**: Press `w` in the terminal to launch the web preview.
- **Android Emulator**: Press `a` in the terminal (requires Android Studio / ADB set up).
- **iOS Simulator**: Press `i` in the terminal (macOS only).

