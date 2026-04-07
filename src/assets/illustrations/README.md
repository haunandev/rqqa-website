# Assets Illustrations

Tempat untuk menyimpan illustrations dan graphic assets yang diimport di komponen:

## Penggunaan

Simpan file ilustrasi (SVG recommended untuk scalability):

```jsx
import { HeroIllustration } from "@/assets/illustrations/hero";

export function HeroSection() {
  return (
    <div>
      <h1>Welcome</h1>
      <HeroIllustration className="w-full max-w-md" />
    </div>
  );
}
```

## Struktur

```
illustrations/
├── hero.svg / hero.tsx
├── empty-state.svg
├── error-404.svg
└── ...
```

Tips:

- Gunakan React components untuk illustrasi kompleks
- Atau export SVG langsung sebagai static files di public/
- Optimize SVG menggunakan tools seperti SVGO
