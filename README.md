# COACHFLO Coaching Console

Platform manajemen coaching universal yang menggabungkan manajemen klien, AI assistant, dan analytics dalam satu dashboard yang dirancang khusus untuk coach profesional.

![COACHFLO](public/og-image.png)

## Fitur Utama

- **Manajemen Klien** — Kelola seluruh klien coaching dalam satu dashboard yang intuitif. Lacak progress, catat sesi, dan pantau perkembangan secara real-time.
- **AI Assistant** — Dapatkan insight cerdas dari AI yang terlatih khusus untuk coaching. Dari analisis kepribadian klien hingga rekomendasi strategi sesi.
- **Analytics Mendalam** — Visualisasi data coaching yang komprehensif dengan chart interaktif. Pahami tren, identifikasi pola, dan buat keputusan berbasis data.
- **Penjadwalan Cerdas** — Atur jadwal sesi coaching dengan kalender visual yang terintegrasi.
- **7 Template Niche** — Pilih dari template khusus: Manifestasi, Bisnis, Kesehatan, Karir, Relasi, Kreatif, atau Custom. Setiap template punya terminologi, fase, dan tools AI yang disesuaikan.
- **Goal Tracking** — Tetapkan dan lacak goals klien dengan sistem tracking visual.

## Tech Stack

| Teknologi | Kegunaan |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) | Component library |
| [Prisma](https://www.prisma.io/) | ORM |
| [SQLite](https://www.sqlite.org/) | Database |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Framer Motion](https://www.framer.com/motion/) | Animasi |
| [Recharts](https://recharts.org/) | Chart & visualization |
| [next-intl](https://next-intl-docs.vercel.app/) | Internationalization |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark mode |
| [Lucide React](https://lucide.dev/) | Icons |

## Struktur Proyek

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── dashboard/            # Dashboard & analytics
│   ├── klien/                # Manajemen klien (aktif & tidak aktif)
│   ├── jadwal/               # Penjadwalan sesi
│   ├── analytics/            # Analytics & reporting
│   ├── templates/            # Template management
│   ├── pengaturan/           # Pengaturan aplikasi
│   ├── onboarding/           # Template selector ( pertama kali)
│   └── api/                  # API routes
│       ├── clients/          # CRUD klien
│       ├── sessions/         # CRUD sesi
│       └── analytics/        # Analytics data
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── sidebar.tsx           # Sidebar navigation
│   ├── template-provider.tsx # Template context provider
│   ├── template-selector.tsx # Niche template picker
│   ├── theme-provider.tsx    # Dark mode provider
│   ├── theme-toggle.tsx      # Toggle dark/light mode
│   ├── ai-assistant-panel.tsx# AI assistant panel
│   └── page-wrapper.tsx      # Page layout wrapper
├── lib/
│   ├── branding.ts           # Brand constants
│   ├── db.ts                 # Prisma client
│   ├── demo-data.ts          # Demo/sample data
│   ├── types.ts              # TypeScript types
│   ├── utils.ts              # Utility functions
│   └── ai-tools-config.ts    # AI tools configuration
├── templates/                # Niche template definitions
└── hooks/
    └── use-local-storage.ts  # LocalStorage hook
```

## Mulai

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Bun](https://bun.sh/) (opsional, sebagai pengganti npm)

### Instalasi

1. Clone repository:
   ```bash
   git clone https://github.com/bangnevgo/navicoach.git
   cd navicoach
   ```

2. Install dependencies:
   ```bash
   npm install
   # atau
   bun install
   ```

3. Setup database:
   ```bash
   npm run db:push
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser.

### Scripts Tersedia

| Script | Kegunaan |
|---|---|
| `npm run dev` | Jalankan dev server di port 3000 |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan production build |
| `npm run lint` | Lint dengan ESLint |
| `npm run db:push` | Push schema ke database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Jalankan migration |
| `npm run db:reset` | Reset database |

## Database Schema

Menggunakan Prisma dengan SQLite:

- **Organization** — Organisasi/brand coaching
- **Client** — Data klien (nama, email, status, fase, goals, dll.)
- **Session** — Sesi coaching (tipe, tanggal, durasi, catatan)
- **ClientNote** — Catatan coaching (insight, block, afirmasi)
- **ClientGoal** — Tujuan & milestone klien
- **ClientFile** — File/dokumen klien

## Template Niche

Setiap template niche mengubah seluruh pengalaman dashboard:

| Template | Fokus |
|---|---|
| Manifestasi | Law of Attraction, affiliate |
| Bisnis | Business & entrepreneur coaching |
| Kesehatan | Health & wellness coaching |
| Karir | Career & professional development |
| Relasi | Relationship & family coaching |
| Kreatif | Creative & artistic coaching |
| Custom | Fully customizable |

## Deployment

Build untuk production:

```bash
npm run cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/
```

Output standalone bisa dideploy ke VPS, Docker, atau platform hosting pilihan.

## License

MIT License — lih di [LICENSE](LICENSE) untuk detail.

---

Dibuat oleh [bangnevgo](https://github.com/bangnevgo)
