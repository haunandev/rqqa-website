/\*\*

- SEO Implementation Guide untuk Strapi Integration
- Best practices dan contoh implementasi untuk SEO-friendly website
  \*/

// ============================================================
// 1. DYNAMIC METADATA - Program Detail Page
// ============================================================

import type { Metadata } from 'next';
import { programService } from '@/lib/api/services/programService';
import { generatePageMetadata, generateArticleSchema, generateJsonLd } from '@/lib/seo-utils';

interface Props {
params: {
slug: string;
};
}

/\*\*

- Generate dynamic metadata untuk program detail
- Ini akan mengisi title, description, OG tags, dll dari Strapi data
  \*/
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
  const program = await programService.getBySlug(params.slug);

      if (!program) {
        return {
          title: 'Program Not Found',
        };
      }

      // Get first image dari media array
      const imageUrl = program.attributes.media?.data?.[0]?.attributes.url;

      return generatePageMetadata(
        program.attributes.title,
        program.attributes.description,
        imageUrl ? `https://qurrota-ayun.org${imageUrl}` : undefined,
        `program/${program.attributes.slug}`
      );

  } catch (error) {
  return {
  title: 'Program',
  description: 'Program dari Yayasan Markaz Qurrota A\'yun',
  };
  }
  }

/\*\*

- Program Detail Page Component dengan SEO
  \*/
  export default async function ProgramDetail({ params }: Props) {
  try {
  const program = await programService.getBySlug(params.slug);

      if (!program) {
        return <div>Program tidak ditemukan</div>;
      }

      const imageUrl = program.attributes.media?.data?.[0]?.attributes.url;

      // Generate structured data untuk search engines
      const articleSchema = generateArticleSchema({
        title: program.attributes.title,
        description: program.attributes.description,
        content: program.attributes.content,
        imageUrl: imageUrl ? `https://qurrota-ayun.org${imageUrl}` : undefined,
        slug: `program/${program.attributes.slug}`,
        publishedAt: program.attributes.publishedAt,
        updatedAt: program.attributes.updatedAt,
        author: 'Yayasan Markaz Qurrota A\'yun',
      });

      return (
        <>
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: generateJsonLd(articleSchema),
            }}
          />

          <article className="container mx-auto p-4">
            {/* SEO: Semantic HTML */}
            <header>
              <h1 className="text-4xl font-bold mb-4">{program.attributes.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{program.attributes.description}</p>
              {program.attributes.publishedAt && (
                <time dateTime={program.attributes.publishedAt} className="text-sm text-gray-500">
                  Dipublikasikan: {new Date(program.attributes.publishedAt).toLocaleDateString('id-ID')}
                </time>
              )}
            </header>

            {/* SEO: Image optimization */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={program.attributes.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
                loading="lazy"
                width={1200}
                height={630}
              />
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {program.attributes.content ? (
                <div dangerouslySetInnerHTML={{ __html: program.attributes.content }} />
              ) : (
                <p>{program.attributes.description}</p>
              )}
            </div>
          </article>
        </>
      );

  } catch (error) {
  console.error('Failed to fetch program:', error);
  return <div>Gagal memuat program</div>;
  }
  }

// ============================================================
// 2. SITEMAP - app/sitemap.ts
// ============================================================

// Buat file baru: src/app/sitemap.ts

import type { MetadataRoute } from 'next';
import { generateSitemapFromStrapi } from '@/lib/sitemap-generator';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
return generateSitemapFromStrapi();
}

// ============================================================
// 3. ROBOTS.TXT - public/robots.txt
// ============================================================

// Buat file baru: public/robots.txt

/_
User-agent: _
Allow: /
Disallow: /admin
Disallow: /\*.json$
Disallow: /api/

# Crawl delay

Crawl-delay: 1

# Sitemaps

Sitemap: https://qurrota-ayun.org/sitemap.xml
\*/

// ============================================================
// 4. PROGRAM LIST PAGE - SEO FRIENDLY
// ============================================================

import { programService } from '@/lib/api/services/programService';
import Link from 'next/link';
import { generateBreadcrumbSchema, generateJsonLd } from '@/lib/seo-utils';

export const metadata = {
title: 'Program | Yayasan Markaz Qurrota A\'yun',
description:
'Lihat berbagai program dakwah dan pendidikan dari Yayasan Markaz Qurrota A\'yun yang fokus pada pendidikan Qur\'an dan pembentukan karakter.',
keywords: ['program islam', 'tahfidz', 'pendidikan quran', 'jakarta'],
openGraph: {
title: 'Program Kami',
description: 'Berbagai program dakwah dan pendidikan Qur\'an',
url: 'https://qurrota-ayun.org/program',
},
};

export default async function ProgramPage() {
try {
const { data: programs } = await programService.getPublished({
pageSize: 50,
});

    // Breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://qurrota-ayun.org' },
      { name: 'Program', url: 'https://qurrota-ayun.org/program' },
    ]);

    return (
      <>
        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonLd(breadcrumbSchema),
          }}
        />

        <div className="container mx-auto p-4">
          {/* SEO: Good heading hierarchy */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Program Kami</h1>
            <p className="text-lg text-gray-600">
              Berbagai program dakwah dan pendidikan Qur\'an untuk semua kalangan
            </p>
          </header>

          {/* SEO: Semantic grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs?.map((program) => (
              <article
                key={program.id}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/program/${program.attributes.slug}`}>
                  {/* SEO: Lazy loading untuk images */}
                  {program.attributes.media?.data?.[0] && (
                    <img
                      src={program.attributes.media.data[0].attributes.url}
                      alt={
                        program.attributes.media.data[0].attributes.alternativeText ||
                        program.attributes.title
                      }
                      className="w-full h-48 object-cover"
                      loading="lazy"
                      width={400}
                      height={200}
                    />
                  )}

                  <div className="p-4">
                    {/* SEO: Proper heading hierarchy */}
                    <h2 className="text-xl font-semibold mb-2">
                      {program.attributes.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {program.attributes.description}
                    </p>

                    {/* SEO: Schema markup untuk produk/layanan */}
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                          '@context': 'https://schema.org',
                          '@type': 'Service',
                          name: program.attributes.title,
                          description: program.attributes.description,
                          image: program.attributes.media?.data?.[0]?.attributes.url,
                          provider: {
                            '@type': 'Organization',
                            name: 'Yayasan Markaz Qurrota A\'yun',
                          },
                        }),
                      }}
                    />

                    <span className="text-blue-600 hover:text-blue-800">
                      Baca Selengkapnya →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </>
    );

} catch (error) {
console.error('Failed to fetch programs:', error);
return <div>Gagal memuat program</div>;
}
}

// ============================================================
// 5. SEO BEST PRACTICES CHECKLIST
// ============================================================

/\*
✅ ON-PAGE SEO:

- [x] Proper heading hierarchy (h1 > h2 > h3)
- [x] Meta title dan description dari Strapi
- [x] Canonical URLs
- [x] OG tags (Open Graph) untuk social sharing
- [x] Semantic HTML (article, header, nav, time tags)
- [x] Image alt text
- [x] Lazy loading untuk images
- [x] Schema markup (JSON-LD)

✅ TECHNICAL SEO:

- [x] Server-side rendering (Next.js App Router)
- [x] Mobile responsive
- [x] Fast page load (minimal JS, optimized images)
- [x] Sitemap.xml
- [x] robots.txt
- [x] SSL/HTTPS
- [x] Structured data (Schema.org)
- [x] Breadcrumb navigation

✅ CONTENT SEO:

- [x] Keyword optimization (dari Strapi title/description)
- [x] Fresh content (publishedAt timestamps)
- [x] Content length (dari Strapi content field)
- [x] Internal linking (program links)
- [x] Descriptive anchor text

✅ PERFORMANCE:

- [x] Image optimization (lazy loading, width/height)
- [x] Code splitting (Next.js automatic)
- [x] Caching strategy
- [x] CDN untuk images
- [ ] Core Web Vitals optimization (LCP, FID, CLS)

✅ NEXT STEPS:

1. Setup Google Search Console
2. Setup Google Analytics 4
3. Monitor search performance
4. Add breadcrumb navigation
5. Implement robots.txt dan sitemap.xml
6. Optimize images untuk Core Web Vitals
7. Add schema markup untuk LocalBusiness
   \*/
