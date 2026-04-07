# Yayasan Markaz Qurrota A'yun Website

Website resmi Yayasan Markaz Qurrota A'yun - Lembaga dakwah Islam yang berfokus pada pendidikan Qur'an dan pembentukan karakter.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library**: React
- **Font**: System Font Stack
- **Deployment**: Vercel (recommended)

## 📋 Fitur

- ✅ Responsif & Mobile-friendly
- ✅ SEO Optimized (SSR/SSG)
- ✅ Schema.org Structured Data
- ✅ Performance Optimized
- ✅ Accessibility Best Practices
- ✅ Dark Mode Ready (Tailwind CSS)

## 📁 Project Structure

```
website/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── layout.tsx          # Root layout dengan SEO
│   │   ├── page.tsx            # Homepage
│   │   ├── tentang-kami/       # About page
│   │   ├── program/            # Programs page
│   │   ├── unit-program/       # Units page
│   │   └── kontak/             # Contact page
│   ├── components/             # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── content/                # Static content & data
│   │   └── data.ts             # Organization data
│   ├── lib/                    # Utilities & helpers
│   │   └── seo.ts              # SEO configurations
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── utils/                  # Common utilities
│   └── styles/                 # Global styles
│       └── globals.css         # Tailwind globals
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ atau lebih tinggi
- npm atau yarn

### Installation

```bash
# Clone atau navigate ke project folder
cd website

# Install dependencies
npm install

# Setup environment variables (optional)
cp .env.example .env.local

# Run development server
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 📝 Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build untuk production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎨 Customization

### Colors

Edit warna primary dan secondary di `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    600: '#0284c7',  // Ubah sesuai kebutuhan
  }
}
```

### Content Data

Update data organisasi di `src/content/data.ts`:

- Program unggulan
- Unit-unit program
- Informasi organisasi

### Pages

Tambah halaman baru di `src/app/` folder sesuai dengan struktur App Router.

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Website ini juga dapat di-deploy ke:

- Netlify
- AWS Amplify
- GitHub Pages (static export)
- Docker

## 📊 SEO Features

- ✅ Meta tags per halaman
- ✅ Open Graph integration
- ✅ Structured Data (schema.org)
- ✅ Sitemap generation (setup di `next.config.js`)
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Mobile optimization

## 🔒 Environment Variables

Buat file `.env.local`:

```env
# Optional - untuk integrasi 3rd party
NEXT_PUBLIC_GA_ID=          # Google Analytics
NEXT_PUBLIC_API_URL=        # Backend API (jika ada)
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Performance Optimization

- Image optimization dengan Next.js Image component
- Code splitting otomatis
- CSS minification
- JavaScript minification
- Static site generation untuk pages statis

## 📞 Support & Maintenance

### Struktur Components

Untuk menambah komponen baru, buat di `src/components/`:

```typescript
// src/components/MyComponent.tsx
import { ReactNode } from 'react';

interface MyComponentProps {
  children?: ReactNode;
}

export function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}
```

### Adding New Pages

1. Buat folder baru di `src/app/`
2. Buat file `page.tsx`
3. Export default component

```typescript
// src/app/halaman-baru/page.tsx
export const metadata = {
  title: 'Halaman Baru',
  description: 'Deskripsi halaman'
};

export default function HalamanBaru() {
  return <div>Konten halaman</div>;
}
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 License

© 2024 Yayasan Markaz Qurrota A'yun

---

**Catatan Pengembang:**

- Selalu gunakan TypeScript untuk type safety
- Follow Tailwind CSS conventions untuk styling
- Buat components reusable dan modular
- Optimasi images sebelum upload
- Test di mobile sebelum deploy
