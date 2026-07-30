# 🇯🇴 ALYAZOURI — PUBG Mobile Sensitivity Optimizer

<p align="center">
  <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Drizzle%20ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
</p>

<p align="center">
  <strong>🏆 مولد الحساسية الأكثر تطوراً للعبة PUBG Mobile — مدعوم بالذكاء الاصطناعي</strong><br />
  <strong>The most advanced PUBG Mobile Sensitivity Generator — AI-Powered 🇯🇴</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-api-routes">API Routes</a> •
  <a href="#-database-schema">Database Schema</a> •
  <a href="#-i18n--multilingual">i18n</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a>
</p>

<br />

---

## ✨ Features

### 🎯 AI-Powered Sensitivity Engine
Compute mathematically precise sensitivity values tailored to your exact setup. The engine factors in **device specifications**, **finger count**, **play style**, **gyroscope mode**, and **weapon recoil profiles** using real PUBG Mobile physics equations.

| Input | Options |
|-------|---------|
| **Devices** | 77 devices across 9 brands |
| **Weapons** | 44 weapons across 8 categories |
| **Fingers** | 2–6 finger configurations |
| **Play Styles** | Headshot, Spray, Competitive, Close Range, Reflex, Conqueror |
| **Gyro Modes** | Off, Scope Only, Always On |

### 📊 Advanced Sensitivity Output
- **Camera Sensitivity** — TPP / FPP / Red Dot / 2x–8x Scopes
- **ADS Sensitivity** — Per-scope fine-grained control
- **Gyroscope Sensitivity** — Camera & ADS gyro (scope-aware)
- **Free Look Sensitivity** — Camera, Parachute, Vehicle
- **AI Score** — 30–100 rating based on your full configuration
- **Stability Analysis** — Device, Weapon, Finger & Style factor breakdown

### 🗺️ Jordan DNS Live Status
Live DNS server checker covering **7 major Jordanian ISPs**:
- 🟠 **Orange Jordan** — AS8376
- 💜 **Zain Jordan** — AS48832
- 🔵 **Umniah Mobile** — AS47887
- 🟢 **Jordan Telecom (JTC)** — AS8697
- 🌐 **Vtel Jordan** — AS50710
- 🔴 **Batelco Jordan** — AS197335
- ⚡ **Damamax / Mada** — AS47302

> **100+ DNS servers** checked in real time with ping, jitter, and packet loss metrics.

### ⚡ PAC Script for PUBG Mobile Jordan
Pre-built **PAC (Proxy Auto-Config)** script optimized for Jordanian players to reduce ping to PUBG Mobile servers.

### 🌍 Multi-Language Support
| Language | Flag | Direction |
|----------|------|-----------|
| العربية | 🇯🇴 | RTL |
| English | 🇬🇧 | LTR |
| Türkçe | 🇹🇷 | LTR |
| Русский | 🇷🇺 | LTR |
| Español | 🇪🇸 | LTR |

### 🛠️ Additional Tools
| Tool | Description |
|------|-------------|
| **DPI Calculator** | Calculate optimal DPI for your device/screen |
| **AI Predictions** | ML-based sensitivity recommendations |
| **HUD Preview** | Visual preview of sensitivity layout |
| **Ping Monitor** | Real-time network latency monitoring |
| **Saved Profiles** | Persist & restore your configurations |
| **Touch Test** | Test touch response & latency |
| **Quick Search** | Instant device/weapon lookup |
| **Night Mode** | Dark theme toggle with auto-detection |
| **Particles Animation** | Immersive background particle system |

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) v0.45 |
| **Migrations** | [Drizzle Kit](https://orm.drizzle.team/kit) v0.31 |
| **Linting** | [ESLint](https://eslint.org/) + `eslint-config-next` |
| **Deployment** | [Netlify](https://www.netlify.com/) (via `@netlify/plugin-nextjs`) |
| **Environment** | Node.js 20 |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 20.x
- **npm** ≥ 10.x
- **PostgreSQL** database (local or remote)

### Installation

```bash
# Clone the repository
git clone https://github.com/alyazouri/S-website.git
cd S-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

### Database Setup

```bash
# Generate Drizzle migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# (Optional) Open Drizzle Studio
npx drizzle-kit studio
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking (`tsc --noEmit`) |
| `npx drizzle-kit generate` | Generate database migrations |
| `npx drizzle-kit migrate` | Apply database migrations |
| `npx drizzle-kit studio` | Open Drizzle ORM Studio GUI |

---

## 📁 Project Structure

```
S-website/
├── public/                          # Static assets
│   ├── manifest.json                # PWA manifest
│   └── README.md
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── api/                     # API routes
│   │   │   ├── profiles/            # Sensitivity profiles CRUD
│   │   │   ├── ratings/             # User ratings
│   │   │   ├── ping/               # Ping measurements
│   │   │   └── dns/                 # DNS check endpoints
│   │   ├── dns/                     # DNS Live Status page
│   │   ├── globals.css              # Global styles + Tailwind
│   │   ├── layout.tsx               # Root layout (metadata, viewport)
│   │   └── page.tsx                 # Home page (generator)
│   ├── components/                  # React components
│   │   ├── AIPredictions.tsx        # ML-based prediction UI
│   │   ├── CopyButton.tsx           # Copy-to-clipboard
│   │   ├── DPICalculator.tsx        # DPI calculation tool
│   │   ├── FactorsPanel.tsx         # Stability factors display
│   │   ├── Hero.tsx                 # Landing hero section
│   │   ├── HudPreview.tsx           # Sensitivity HUD preview
│   │   ├── LanguageContext.tsx       # React context for i18n
│   │   ├── LanguageSwitcher.tsx     # Language selector UI
│   │   ├── MobileMenu.tsx           # Responsive mobile nav
│   │   ├── NightModeToggle.tsx      # Dark/light mode toggle
│   │   ├── PacSection.tsx           # PAC script section
│   │   ├── Particles.tsx            # Particle animation system
│   │   ├── PingMonitor.tsx          # Real-time ping monitor
│   │   ├── QuickSearch.tsx          # Instant device/weapon search
│   │   ├── SavedProfiles.tsx        # Profile save/load management
│   │   ├── SensitivityTable.tsx     # Sensitivity values display
│   │   ├── ShareButton.tsx          # Share configuration
│   │   └── StatusBar.tsx            # Status indicator bar
│   ├── db/                          # Database layer
│   │   ├── index.ts                 # Drizzle client initialization
│   │   └── schema.ts                # Database tables definition
│   └── lib/                         # Core library
│       ├── data.ts                  # Device & weapon databases
│       ├── dns-servers.ts           # Jordan DNS server registry
│       ├── i18n.ts                  # Multi-language translations
│       ├── sensitivity.ts           # Core sensitivity engine
│       └── weaponProfiles.ts        # Weapon recoil profiles
├── drizzle.config.json              # Drizzle ORM configuration
├── eslint.config.mjs                # ESLint flat config
├── netlify.toml                     # Netlify deployment config
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies & scripts
├── postcss.config.mjs               # PostCSS configuration
└── tsconfig.json                    # TypeScript configuration
```

---

## 🧮 Sensitivity Engine

The core algorithm in `src/lib/sensitivity.ts` computes PUBG Mobile sensitivity values using a multi-factor equation:

```
Sensitivity = WeaponProfile × DeviceFactor × FingerFactor × StyleFactor × GyroModeBoost
```

### Device Factor (`DeviceFactor`)
```
FPS Factor = 0.65 + (120 / DeviceFPS) × 0.35
Touch Factor = 0.80 + (240 / DeviceTouchRate) × 0.20
Screen Factor = DeviceScreenSize / 11.0
DeviceFactor = FPSFactor × TouchFactor × ScreenFactor
```

### Finger Factor (`FingerFactor`)
| Fingers | Multiplier |
|---------|-----------|
| 2 | 1.15 |
| 3 | 1.06 |
| 4 | 1.00 (reference) |
| 5 | 0.95 |
| 6 | 0.90 |

### Style Factor (`StyleFactor`)
Different play styles adjust CQC, scope, and gyro multipliers independently for fine-grained control.

### Reference Baseline
All values are calibrated against a **iPad Pro 11″ / 120 FPS / 240Hz Touch / 4 Fingers / Gyro Always On** reference configuration.

### AI Score
A composite 30–100 rating built from:
- **FPS Score** (max 20) — ≥120 FPS gives full points
- **Touch Score** (max 15) — ≥480Hz touch sampling
- **Gyro Score** (max 12) — Gyro quality assessment
- **Finger Score** (max 12) — 4+ fingers recommended
- **Style Score** (max 12) — Competitive/Conqueror styles
- **Weapon Score** (max 10) — Low-recoil weapons score higher

---

## 🗄️ Database Schema

Defined in `src/db/schema.ts` using Drizzle ORM:

### `sensitivity_profiles`
| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial PK` | Auto-increment ID |
| `session_id` | `varchar(100)` | Browser session identifier |
| `name` | `varchar(200)` | Profile name |
| `device_brand` | `varchar(100)` | Device manufacturer |
| `device_name` | `varchar(200)` | Device model name |
| `weapon_category` | `varchar(100)` | Weapon class |
| `weapon_name` | `varchar(100)` | Specific weapon |
| `fingers` | `integer` | Number of fingers (2–6) |
| `style_id` | `varchar(50)` | Play style identifier |
| `gyro_mode` | `varchar(20)` | Gyroscope mode |
| `sensitivity_data` | `jsonb` | Full sensitivity object |
| `ai_score` | `integer` | Computed AI score |
| `created_at` | `timestamp` | Auto-set creation time |

### `ratings`
| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial PK` | Auto-increment ID |
| `session_id` | `varchar(100)` | Browser session |
| `rating` | `integer` | 1–5 star rating |
| `comment` | `text` | Optional user feedback |
| `created_at` | `timestamp` | Auto-set creation time |

### `ping_measurements`
| Column | Type | Description |
|--------|------|-------------|
| `id` | `serial PK` | Auto-increment ID |
| `session_id` | `varchar(100)` | Browser session |
| `server_id` | `varchar(50)` | DNS server identifier |
| `server_name` | `varchar(100)` | Server name |
| `ping` | `integer` | Latency in ms |
| `jitter` | `integer` | Jitter in ms |
| `loss` | `integer` | Packet loss % |
| `is_best` | `boolean` | Best server flag |
| `created_at` | `timestamp` | Auto-set creation time |

---

## 🌐 i18n: Multi-Language System

The translation system in `src/lib/i18n.ts` uses a **typed dictionary pattern**:

```typescript
type Lang = "ar" | "en" | "tr" | "ru" | "es";

const translations = {
  key_name: {
    ar: "العربية",
    en: "English",
    tr: "Türkçe",
    ru: "Русский",
    es: "Español",
  },
};
```

**Usage in components:**
```tsx
import { useLang } from "@/components/LanguageContext";
import { t } from "@/lib/i18n";

const { lang } = useLang();
return <h1>{t("hero_title1", lang)}</h1>;
```

### RTL Support
Arabic (`ar`) automatically applies `dir="rtl"` throughout the layout, with mirrored spacing and alignment via Tailwind's `rtl:` modifier.

### Adding a New Language
1. Add the language code to the `Lang` type in `i18n.ts`
2. Add language metadata to the `LANGUAGES` array
3. Add translations for every key in the `translations` object

---

## ☁️ Deployment

### Netlify (Current)
This project is configured for **Netlify** deployment via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_PRIVATE_STANDALONE = "true"
```

**Environment variables to set:**
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |

### Other Platforms
This is a standard Next.js application and can be deployed to:
- **Vercel** (recommended alternative)
- **Docker** container
- **AWS EC2 / ECS**
- **Google Cloud Run**
- **DigitalOcean App Platform**

---

## 📡 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profiles` | `GET` | List saved sensitivity profiles |
| `/api/profiles` | `POST` | Save a new sensitivity profile |
| `/api/profiles/[id]` | `DELETE` | Delete a saved profile |
| `/api/ratings` | `POST` | Submit a user rating |
| `/api/ping` | `POST` | Record a ping measurement |
| `/api/ping/best` | `GET` | Get best server by session |
| `/api/dns/check` | `POST` | Trigger DNS server check |

---

## 🧪 Quality Assurance

```bash
# TypeScript type checking
npm run typecheck

# Lint all files
npm run lint

# Build for production
npm run build
```

The project uses strict TypeScript mode with `strict: true` and `allowJs: false` for maximum type safety.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style (TypeScript strict mode)
- Add translations for **all 5 languages** when adding UI text
- Ensure RTL compatibility for Arabic
- Test on both mobile and desktop viewports
- Run `npm run typecheck` before committing

---

## 📜 License

This project is open source. See the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Author

**ALYAZOURI** — *Jordan's PUBG Mobile Sensitivity Expert*

| Platform | Handle |
|----------|--------|
| TikTok | [@saeedalyazouri0](https://tiktok.com/@saeedalyazouri0) |
| Instagram | [@saeedjor11](https://instagram.com/saeedjor11) |
| PUBG ID | `5744469523` |

---

<p align="center">
  <strong>🇯🇴 Made in Jordan with ❤️ — أقل بنق، أعلى دقة، أفضل حساسية</strong><br />
  <sub>Lowest Ping · Highest Precision · Best Sensitivity</sub>
</p>

<p align="center">
  <a href="https://github.com/alyazouri/S-website">
    <img src="https://img.shields.io/github/stars/alyazouri/S-website?style=social" alt="GitHub stars" />
  </a>
  <a href="https://github.com/alyazouri/S-website/network">
    <img src="https://img.shields.io/github/forks/alyazouri/S-website?style=social" alt="GitHub forks" />
  </a>
</p>
