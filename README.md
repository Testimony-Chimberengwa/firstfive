# FirstFive — Emergency Responder Network

**Save Lives in the First Five Minutes**

FirstFive is a mobile-first app that mobilizes trained citizen responders to arrive at emergencies **before EMS**. For cardiac arrest, every minute without CPR drops survival by 7-10%. FirstFive closes the critical gap.

---

## The Problem

- **Cardiac arrest has 90% fatality rate** without help in 4-6 minutes
- **Average EMS response: 8-12 minutes** (up to 20+ in rural areas)
- **Trained people are nearby** but have no way to know an emergency is happening
- **Fewer than 40%** of cardiac arrest victims receive bystander CPR before EMS

## The Solution

FirstFive bridges this gap by:

1. **Immediate alert** to all CPR-trained citizens within 500m
2. **Live guidance** (CPR, EpiPen, Narcan) for bystanders
3. **Real-time coordination** between victim, responders, and EMS
4. **No replacement for 911** — EMS is always called in parallel

---

## Key Features

✅ **SOS Trigger** — 2-second hold button, any location  
✅ **Smart Routing** — PostGIS-powered 500m responder radius queries  
✅ **Live Chat** — 2-way communication victim ↔ responders  
✅ **First Aid Guides** — CPR, EpiPen, Narcan, Choking with metronome  
✅ **Responder Profile** — Badges, stats, certification tracking  
✅ **Impact Dashboard** — Real-time platform metrics for judges  
✅ **Push Notifications** — Expo-powered alert delivery  
✅ **Demo Mode** — Pre-seeded responders for live demo

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React Native (Expo) + TypeScript | Mobile + Web from one codebase |
| **Backend** | Supabase (PostgreSQL + PostGIS) | Geo-queries built-in, free tier |
| **Routing** | Expo Router v3 | File-based, type-safe |
| **UI** | NativeWind v4 + Tailwind | Rapid, consistent design |
| **Maps** | Leaflet.js + OpenStreetMap | Free, open-source |
| **Push** | Expo Notifications API | Cross-platform, simple |
| **State** | Zustand | Lightweight, no boilerplate |
| **Geospatial** | PostGIS (ST_DWithin) | sub-100ms radius queries |

---

## SDG 3 Impact

**Sustainable Development Goal 3 — Good Health and Well-being**

- **3.4** — Reduce premature mortality from cardiovascular disease  
- **3.8** — Achieve universal health coverage, including emergency access  
- **3.d** — Strengthen capacity for early warning

FirstFive targets **low-income neighborhoods and rural Zimbabwe** where EMS response is slowest.

---

## Setup & Run

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g eas-cli`)
- Supabase account (free tier)

### Installation

```bash
# Clone repo
git clone https://github.com/Testimony-Chimberengwa/firstfive.git
cd firstfive

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your Supabase credentials:
# EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# Start development server
npx expo start

# On phone: scan QR code with Expo Go app
# Or press 'i' for iOS simulator / 'a' for Android emulator
```

### Database Setup

Database tables are automatically deployed via Supabase CLI:

```bash
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

---

## Key Screens

| Screen | Purpose |
|--------|---------|
| **Splash** | Hero landing, SOS CTA, responder register |
| **SOS Trigger** | 2-second hold button (urgent UX) |
| **Type Selector** | Choose emergency type |
| **Waiting** | Live responder count, first aid guide, chat |
| **Responder Alert** | Full-screen urgent takeover (30s countdown) |
| **Navigation Map** | Route to incident, AED locations, ETA |
| **Impact Dashboard** | Platform metrics (alerts, cities, avg arrival time) |

---

## Demo Flow (30 seconds)

1. **Open app** → Splash screen
2. **Hold SOS button** → 2-second hold animation + haptic feedback
3. **Select "Cardiac Arrest"** → Type selector
4. **Send Alert** → Waiting screen
5. **Live stats update** → "3 responders alerted, 2 on their way"
6. **Chat appears** → "Chidi here, 2 min away. Keep compressions going."
7. **Judge sees impact** → Tab to Impact Dashboard

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Native App                      │
│              (Expo Router v3 File-based)                 │
├─────────────────────────────────────────────────────────┤
│  Screens:  Splash │ Auth │ SOS │ Responder │ Tabs       │
├─────────────────────────────────────────────────────────┤
│         Zustand (App State) │ Supabase Client           │
├─────────────────────────────────────────────────────────┤
│              Supabase Backend (Edge)                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │ PostgreSQL + PostGIS (500m radius queries)         │ │
│  │ Edge Functions (trigger-sos, push dispatch)        │ │
│  │ Realtime (incident status, chat messages)          │ │
│  │ Auth (magic links, JWT, Row Level Security)        │ │
│  └────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  External: Expo Push API │ OpenStreetMap │ OpenAED      │
└─────────────────────────────────────────────────────────┘
```

---

## Critical Path: SOS → Responder (< 2 seconds)

```
0ms   — User holds SOS button
~200ms — Client posts to Supabase Edge Function
~300ms — PostGIS queries: find active responders within 500m
~500ms — Build push payload, batch dispatch to Expo Push API
~1200ms — Expo Push delivers to responder device
~1500ms — Responder sees notification with alert sound
```

---

## Responder Model

- **Purely voluntary** — No payment, just badges & recognition
- **Skill-based alerts** — CPR → cardiac_arrest alerts only
- **Opt-in availability** — Toggle Active/Off Duty anytime
- **Legal protection** — Good Samaritan laws (Zimbabwe, USA, EU, etc.)
- **Optional credentials** — Upload CPR cert for verified badge
- **Incentive system** — Badges (First Responder, Life Saver, Community Hero)

---

## Security & Privacy

✅ **Row Level Security** — Users only access their own data  
✅ **Location minimization** — Coords deleted when off-duty  
✅ **Victim anonymity** — Identity never shared post-incident  
✅ **No auth required for SOS** — Anonymous trigger supported  
✅ **HTTPS everywhere** — Vercel + Supabase enforced TLS  
✅ **Rate limiting** — 3 SOS triggers per user per 10 mins  

---

## Post-Hackathon Roadmap

| Phase | Timeline | Features |
|-------|----------|----------|
| **V1.1** | Month 1-2 | Native app (Expo → React Native) |
| **V1.2** | Month 2-3 | Verified responders (Red Cross partnership) |
| **V2.0** | Month 3-6 | Institutional API (hospitals, corps) |
| **V2.1** | Month 4-6 | Apple Watch companion app |
| **V3.0** | Month 6-12 | Public health data partnership (WHO, cities) |
| **V3.1** | Month 6-12 | Offline-first mode (sync on reconnect) |

---

## Team

**GNEC Hackathon 2026 Entry**  
Built in **9 days** for SDG 3: Good Health and Well-being

**Key Contributors:**  
- Copilot (Senior Engineer AI)  
- Testimony Chimberengwa (Product Lead)

---

## License

**Open source** (MIT) — Built for the world's health.

---

## Getting Help

- **Medical:** Always call 999/112 in Zimbabwe first
- **Technical:** Check `/docs` or open an issue on GitHub
- **Questions:** Contact team@firstfive.care (placeholder)

---

**"In the first five minutes, trained hands save lives. FirstFive gets them there."**

🚨 **Download. Register. Respond. Save.**
