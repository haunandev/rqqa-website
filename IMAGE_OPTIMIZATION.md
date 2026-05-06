/\*\*

- Image Optimization Guide untuk SEO
- Meningkatkan Core Web Vitals dan performa website
  \*/

// ============================================================
// 1. OPTIMASI IMAGES DI STRAPI
// ============================================================

/\*
CHECKLIST:

- Upload images dengan format terbaik (JPG untuk photos, PNG untuk graphics)
- Set descriptive filename (contoh: "program-tahfidz-al-quran.jpg")
- Set altternativeText di Strapi media (penting untuk SEO!)
- Compress images sebelum upload (gunakan TinyPNG, ImageOptim)
- Untuk web gunakan ukuran <= 150KB per image
  \*/

// ============================================================
// 2. MENGGUNAKAN NEXT/IMAGE COMPONENT
// ============================================================

// BAD - Standar HTML img (tidak optimized):
// <img src={imageUrl} alt="..." />

// GOOD - Menggunakan Next.js Image (optimized, lazy loading, responsive):

import Image from 'next/image';

export default function ProgramCard({ program }) {
const imageUrl = program.attributes.media?.data?.[0]?.attributes.url;
const altText =
program.attributes.media?.data?.[0]?.attributes.alternativeText ||
program.attributes.title;

return (
<div className="rounded-lg overflow-hidden">
{/_ Next Image Component - Otomatis optimized _/}
<Image
src={imageUrl}
alt={altText}
width={400}
height={200}
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
className="w-full h-auto"
loading="lazy"
quality={75} // 75 sudah cukup untuk web
placeholder="blur" // Blur placeholder saat loading
blurDataURL="data:image/svg+xml,..."
/>
</div>
);
}

// ============================================================
// 3. IMAGE RESPONSIVE SRCSET
// ============================================================

// Jika menggunakan HTML img biasa:
<img
src={imageUrl}
alt="Program"
srcSet={`     ${imageUrl}?w=400 400w,
    ${imageUrl}?w=600 600w,
    ${imageUrl}?w=900 900w
  `}
sizes="(max-width: 640px) 100vw, 50vw"
loading="lazy"
/>

// ============================================================
// 4. AUTOMATIC IMAGE OPTIMIZATION CONFIG
// ============================================================

// next.config.js
module.exports = {
images: {
// Whitelist domain Strapi
domains: ['localhost', 'your-strapi-domain.com'],

    // Format output (otomatis menggunakan WebP jika browser support)
    formats: ['image/avif', 'image/webp'],

    // Breakpoints untuk responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimization
    minimumCacheTTL: 31536000, // 1 tahun

},
};

// ============================================================
// 5. STRAPI IMAGE OPTIMIZATION SERVICE
// ============================================================

/\*\*

- Helper function untuk mendapatkan optimized image URL dari Strapi
  \*/
  export function getOptimizedImageUrl(
  imagePath: string,
  width?: number,
  height?: number,
  quality: number = 75
  ): string {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const fullUrl = new URL(`${baseUrl}${imagePath}`);

if (width) fullUrl.searchParams.set('w', width.toString());
if (height) fullUrl.searchParams.set('h', height.toString());
fullUrl.searchParams.set('q', quality.toString());

return fullUrl.toString();
}

// Usage:
const imageUrl = getOptimizedImageUrl(
program.attributes.media?.data?.[0]?.attributes.url,
800,
600,
80
);

// ============================================================
// 6. LAZY LOADING STRATEGY
// ============================================================

// Above The Fold (immediate visibility):
<img
src={imageUrl}
alt="..."
loading="eager" // Load immediately
fetchPriority="high"
/>

// Below The Fold (tidak langsung visible):
<img
src={imageUrl}
alt="..."
loading="lazy" // Load saat user scroll
fetchPriority="low"
/>

// ============================================================
// 7. IMAGE WITH FALLBACK
// ============================================================

export function OptimizedImage({
src,
alt,
width,
height,
className,
}) {
return (
<div className={`relative overflow-hidden ${className}`}>
<Image
src={src}
alt={alt}
width={width}
height={height}
onError={(e) => {
// Fallback ke placeholder jika gagal load
e.currentTarget.src = '/images/placeholder.png';
}}
/>
</div>
);
}

// ============================================================
// 8. PERFORMANCE METRICS
// ============================================================

// Gunakan Next.js built-in analytics
export function useWebVitals() {
if (typeof window !== 'undefined') {
// LCP (Largest Contentful Paint) - related to images
const observer = new PerformanceObserver((list) => {
list.getEntries().forEach((entry) => {
if (entry.entryType === 'largest-contentful-paint') {
console.log('LCP:', entry.renderTime || entry.loadTime);
}
});
});
observer.observe({ entryTypes: ['largest-contentful-paint'] });
}
}

// ============================================================
// 9. IMAGE COMPONENT BEST PRACTICES
// ============================================================

/\*
✅ DO:

- Use Next Image component untuk semua images
- Set width dan height attributes
- Use descriptive alt text (keyword-rich)
- Compress images di Strapi
- Use lazy loading untuk below-fold images
- Set quality parameter (75 sudah optimal)
- Monitor Core Web Vitals (LCP < 2.5s)
- Test responsive images di berbagai screen sizes

❌ DON'T:

- Use large unoptimized images
- Forget alt text
- Set width/height yang salah (akan distorted)
- Use same image size untuk semua devices
- Load high-quality images on slow connections
- Forget to set loading="lazy"
- Use excessive blurry placeholders
  \*/

// ============================================================
// 10. NEXT.JS IMAGE OPTIMIZATION EXAMPLE
// ============================================================

import Image from 'next/image';
import { programService } from '@/lib/api/services/programService';

export default async function ProgramGrid() {
const { data: programs } = await programService.getPublished({
pageSize: 20,
});

return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{programs?.map((program) => {
const media = program.attributes.media?.data?.[0];
if (!media) return null;

        return (
          <article key={program.id} className="rounded-lg overflow-hidden shadow-lg">
            {/* Optimized Image */}
            <div className="relative w-full h-48">
              <Image
                src={media.attributes.url}
                alt={media.attributes.alternativeText || program.attributes.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
                quality={75}
              />
            </div>

            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{program.attributes.title}</h2>
              <p className="text-gray-600 text-sm">{program.attributes.description}</p>
            </div>
          </article>
        );
      })}
    </div>

);
}

// ============================================================
// 11. MEASURING PERFORMANCE
// ============================================================

// Install @next/bundle-analyzer
// npm install -D @next/bundle-analyzer

// next.config.js dengan analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
// ... other config
images: {
// Image optimization config
},
});

// Run:
// ANALYZE=true npm run build

// ============================================================
// 12. STRAPI MEDIA FIELD OPTIMIZATION
// ============================================================

/\*
Di Strapi, saat configure Media field:

1. Set max file size (2-5MB)
2. Enable image optimization in Strapi
3. Add formats: thumbnail, small, medium, large
4. Setup CDN untuk serve images

Di programService.ts:

```typescript
populate: {
  media: {
    fields: ['id', 'url', 'alternativeText', 'name', 'mime', 'formats'],
  }
}
```

Kemudian gunakan format yang sesuai:
const imageUrl = media?.attributes?.formats?.medium?.url || media?.attributes.url;
\*/

// ============================================================
// SUMMARY
// ============================================================

/\*
KEY POINTS:

1. IMAGES adalah factor terbesar untuk Core Web Vitals
2. LCP (Largest Contentful Paint) sering kali gambar
3. Gunakan Next Image component untuk optimasi otomatis
4. Compress images di Strapi (< 150KB ideal)
5. Set width/height untuk prevent layout shift
6. Use lazy loading untuk below-fold images
7. Set alt text yang descriptive dan keyword-rich
8. Monitor dengan PageSpeed Insights & Google Analytics

EXPECTED IMPACT:

- LCP improvement: 30-50% faster
- File size reduction: 50-70% smaller
- Better mobile performance
- Higher SEO rankings
  \*/
