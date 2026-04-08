# Development Guide

## Getting Started

### 1. Install Dependencies

```bash
cd website
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open `http://localhost:3000` di browser.

---

## Project Structure Guide

### `/src/app`

App Router pages dan layouts. Setiap folder = route path.

**Contoh:**

- `src/app/page.tsx` → `/`
- `src/app/program/page.tsx` → `/program`
- `src/app/program/[slug]/page.tsx` → `/program/:slug` (dynamic route)

### `/src/components`

Reusable React components.

**Convention:**

- Functional components
- File name = PascalCase
- Export sebagai named export

```typescript
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Hello</div>;
}
```

### `/src/content`

Static data dan content configuration.

**File: `data.ts`**

- Contains organization data
- Program definitions
- Unit information

### `/src/lib`

Utility functions dan configurations.

**File: `seo.ts`**

- SEO metadata
- Schema.org configurations
- Canonical URLs

### `/src/types`

TypeScript type definitions.

---

## Common Tasks

### Add a New Page

1. Create folder: `src/app/halaman-baru/`
2. Create file: `page.tsx`

```typescript
// src/app/halaman-baru/page.tsx
import { Container } from "@/components/Container";

export const metadata = {
  title: "Halaman Baru",
  description: "Deskripsi halaman",
};

export default function HalamanBaru() {
  return (
    <Container>
      <h1>Halaman Baru</h1>
      <p>Konten halaman Anda</p>
    </Container>
  );
}
```

### Add a New Component

1. Create file: `src/components/MyComponent.tsx`

```typescript
import { ReactNode } from "react";

interface MyComponentProps {
  title: string;
  children?: ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="p-4 bg-gray-50 rounded">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
```

### Update Organization Data

Edit `src/content/data.ts`:

```typescript
export const organizationData: Organization = {
  name: "...",
  foundedYear: 2022,
  // ... update fields
};
```

### Add SEO Meta Tags

In pages, use `metadata`:

```typescript
export const metadata = {
  title: "Page Title",
  description: "Page description for SEO",
  keywords: ["keyword1", "keyword2"],
};
```

---

## Styling Guide

### Using Tailwind CSS

```typescript
<div className="flex items-center justify-between gap-4 p-6 bg-primary-50 rounded-lg">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition">
    Click Me
  </button>
</div>
```

### Custom Colors

Defined in `src/theme/colors.ts` and applied from `tailwind.config.ts`.

```typescript
primary: {
  50: "#effafa",
  100: "#d4f3f4",
  200: "#a8e5e7",
  300: "#66d0d1",
  400: "#2ea0a4",
  500: "#1b7b7d",
  600: "#08484A",
  700: "#06363a",
  800: "#052b30",
  900: "#041f24",
  950: "#031419",
}
```

Use in styles: `bg-primary-600`, `text-primary-700`

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Single column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

Common breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Type Safety

### Define Component Props

```typescript
interface ButtonProps {
  title: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({
  title,
  onClick,
  variant = "primary",
  disabled,
}: ButtonProps) {
  // ...
}
```

### Use Imported Types

```typescript
import { Program, Unit, Organization } from "@/types";

const myProgram: Program = {
  id: "1",
  title: "My Program",
  // ...
};
```

---

## Performance Tips

1. **Use Next Image Component**

   ```typescript
   import Image from "next/image";

   <Image
     src="/image.jpg"
     alt="Description"
     width={800}
     height={600}
   />
   ```

2. **Code Splitting**
   - Dynamic components dengan `next/dynamic`
   - Lazy load heavy components

3. **Optimize CSS**
   - Hanya import yang dipakai
   - Tailwind purges unused styles

4. **Check Bundle Size**
   ```bash
   npm run build
   # Check .next/static folder
   ```

---

## SEO Checklist

- [ ] Page title & meta description
- [ ] Heading hierarchy (h1, h2, h3...)
- [ ] Keyword in first paragraph
- [ ] Internal links
- [ ] Alt text untuk images
- [ ] Mobile responsive
- [ ] Fast page load
- [ ] Structured data (schema.json)

---

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Environment Variables

Create `.env.local` dengan production values.

---

## Troubleshooting

### Import errors

- Check path alias di `tsconfig.json`
- Verify file exists at correct location

### Style not applying

- Check Tailwind classname spelling
- Rebuild: `npm run dev`

### Type errors

- Run `npm run type-check` untuk full TypeScript check
- Import types dari `@/types`

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/halaman-baru

# Make changes
git add .
git commit -m "feat: add halaman baru page"

# Push to remote
git push origin feature/halaman-baru

# Create Pull Request
```

---

Last Updated: April 2024
