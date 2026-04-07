# Quick Start Guide

## 📦 Project Created!

Lokasi: `/home/iyasmzn/projects/rqqa/website/`

## 🚀 Setup (5 Menit)

```bash
cd /home/iyasmzn/projects/rqqa/website
npm install
npm run dev
```

Buka: `http://localhost:3000`

---

## 📂 What's Included

```
website/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── page.tsx            # Homepage
│   │   ├── tentang-kami/       # About
│   │   ├── program/            # Programs
│   │   ├── unit-program/       # Units
│   │   ├── kontak/             # Contact
│   │   └── layout.tsx          # Root layout + SEO
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── content/
│   │   └── data.ts             # Organization data
│   ├── lib/
│   │   └── seo.ts              # SEO config
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── styles/
│       └── globals.css         # Global styles
├── tailwind.config.ts          # Tailwind theme
├── next.config.js              # Next.js config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
├── README.md                   # Documentation
├── DEVELOPMENT.md              # Dev guide
└── .env.example                # Environment template
```

---

## ✨ Features Ready to Use

✅ Fully responsive design
✅ SEO optimized (meta tags, structured data)
✅ TypeScript for type safety
✅ Dark mode support (Tailwind)
✅ Mobile navigation
✅ Contact form template
✅ Tailwind CSS utility-first styling

---

## 📝 Make Changes

### Update Organization Info

File: `src/content/data.ts`

```typescript
export const organizationData: Organization = {
  name: "Your Organization",
  foundedYear: 2024,
  address: {
    /* ... */
  },
  // ... update fields
};
```

### Add New Pages

Create in `src/app/`:

```
src/app/nama-halaman/page.tsx
```

### Customize Colors

File: `tailwind.config.ts`

```typescript
colors: {
  primary: {
    600: '#YOUR_COLOR',
  }
}
```

---

## 🎨 Pre-built Sections

### Homepage (`src/app/page.tsx`)

- Hero banner
- Stats section
- Programs grid
- Vision & mission
- CTA sections

### About Page (`src/app/tentang-kami/page.tsx`)

- Background info
- Organization details
- Vision & missions list

### Programs Page (`src/app/program/page.tsx`)

- Featured programs grid
- Benefits section

### Contact Page (`src/app/kontak/page.tsx`)

- Contact form
- Location info
- Social links

---

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run linter
npm run type-check   # Check TypeScript

```

---

## 🌐 SEO Configuration

Already included:

- ✅ Meta tags per halaman
- ✅ Open Graph tags
- ✅ Schema.org structured data
- ✅ Responsive design (Mobile-first)
- ✅ Fast page loading
- ✅ Semantic HTML

### To improve SEO:

1. Add real images (replace placeholders)
2. Fill in contact information
3. Add Google Analytics tracking ID in `.env.local`
4. Setup Google Search Console

---

## 🚀 Deployment Ready

### Deploy to Vercel (1-click)

1. Push ke GitHub
2. Connect di [vercel.com](https://vercel.com)
3. Auto-deploy on push

### Or local deployment

```bash
npm run build
npm start
```

---

## 📚 Next Steps

1. **Update Data**
   - Edit contact info in `src/content/data.ts`
   - Add real images to `public/`

2. **Add Pages**
   - Create new folders in `src/app/`
   - Copy structure dari existing pages

3. **Customize Design**
   - Edit colors in `tailwind.config.ts`
   - Modify components in `src/components/`

4. **Setup Forms**
   - Integrate EmailJS or backend API
   - Edit `src/app/kontak/page.tsx`

5. **Deploy**
   - Push to GitHub
   - Connect to Vercel

---

## 🆘 Need Help?

Check:

- `README.md` - Full documentation
- `DEVELOPMENT.md` - Development guide
- Each page has `export const metadata = { ... }` for SEO

---

## 💡 Pro Tips

- Use `clsx()` for conditional classes
- Import from `@/` for cleaner paths
- Keep components small and reusable
- Test on mobile regularly
- Check PageSpeed Insights

---

Generated: April 2024
Tech: Next.js 14 + TypeScript + Tailwind CSS
