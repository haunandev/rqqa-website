/\*\*

- Example: Program Detail Page with Full SEO
- Gunakan file ini sebagai template untuk dynamic routes
-
- Copy ke: src/app/program/[slug]/page.tsx
  \*/

import type { Metadata, ResolvingMetadata } from 'next';
import { programService } from '@/lib/api/services/programService';
import {
generatePageMetadata,
generateArticleSchema,
generateBreadcrumbSchema,
generateJsonLd,
} from '@/lib/seo-utils';

interface Props {
params: {
slug: string;
};
}

/\*\*

- Generate metadata untuk SEO
- Akan menjadi title, meta description, OG tags, dll
  \*/
  export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
  ): Promise<Metadata> {
  try {
  const program = await programService.getBySlug(params.slug);

      if (!program) {
        return {
          title: 'Program Tidak Ditemukan',
          description: 'Program yang Anda cari tidak ditemukan',
          robots: 'noindex, nofollow',
        };
      }

      // Get image dari media array
      const imageUrl = program.attributes.media?.data?.[0]?.attributes.url;
      const fullImageUrl = imageUrl
        ? `https://qurrota-ayun.org${imageUrl}`
        : undefined;

      return generatePageMetadata(
        program.attributes.title,
        program.attributes.description,
        fullImageUrl,
        `program/${program.attributes.slug}`
      ) as Metadata;

  } catch (error) {
  console.error('Error generating metadata:', error);
  return {
  title: 'Program',
  description: 'Program dari Yayasan Markaz Qurrota A\'yun',
  };
  }
  }

/\*\*

- Program Detail Page Component
- SEO-optimized dengan structured data dan semantic HTML
  \*/
  export default async function ProgramDetailPage({ params }: Props) {
  let program;

try {
program = await programService.getBySlug(params.slug);

    if (!program) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-red-600">Program tidak ditemukan</h1>
          <p>Program yang Anda cari tidak ada di database kami.</p>
        </div>
      );
    }

} catch (error) {
console.error('Error fetching program:', error);
return (
<div className="container mx-auto p-4">
<h1 className="text-2xl font-bold text-red-600">Gagal memuat program</h1>
<p>Terjadi kesalahan saat memuat data program.</p>
</div>
);
}

const imageUrl = program.attributes.media?.data?.[0]?.attributes.url;
const fullImageUrl = imageUrl ? `https://qurrota-ayun.org${imageUrl}` : undefined;

// Generate structured data untuk search engines
const articleSchema = generateArticleSchema({
title: program.attributes.title,
description: program.attributes.description,
content: program.attributes.content,
imageUrl: fullImageUrl,
slug: `program/${program.attributes.slug}`,
publishedAt: program.attributes.publishedAt,
updatedAt: program.attributes.updatedAt,
author: 'Yayasan Markaz Qurrota A\'yun',
});

// Breadcrumb untuk navigation dan schema
const breadcrumbItems = [
{ name: 'Home', url: 'https://qurrota-ayun.org' },
{ name: 'Program', url: 'https://qurrota-ayun.org/program' },
{ name: program.attributes.title, url: `https://qurrota-ayun.org/program/${program.attributes.slug}` },
];

const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

return (
<>
{/_ Structured Data - JSON-LD _/}
<script
type="application/ld+json"
dangerouslySetInnerHTML={{
          __html: generateJsonLd(articleSchema),
        }}
/>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLd(breadcrumbSchema),
        }}
      />

      <div className="container mx-auto p-4">
        {/* Breadcrumb Navigation - Semantic & SEO-friendly */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          {breadcrumbItems.map((item, index) => (
            <span key={item.url}>
              {index > 0 && <span className="mx-2">/</span>}
              {index === breadcrumbItems.length - 1 ? (
                <span aria-current="page" className="text-gray-700">
                  {item.name}
                </span>
              ) : (
                <a href={item.url} className="text-blue-600 hover:underline">
                  {item.name}
                </a>
              )}
            </span>
          ))}
        </nav>

        {/* Main Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Article Header - Semantic HTML */}
          <header className="mb-8">
            {/* Primary Heading - h1 untuk main content */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {program.attributes.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 text-gray-600 mb-6 border-b pb-4">
              {/* Published Date */}
              {program.attributes.publishedAt && (
                <div>
                  <time dateTime={program.attributes.publishedAt}>
                    📅 Dipublikasikan: {new Date(program.attributes.publishedAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}

              {/* Updated Date */}
              {program.attributes.updatedAt && (
                <div>
                  <time dateTime={program.attributes.updatedAt}>
                    🔄 Diupdate: {new Date(program.attributes.updatedAt).toLocaleDateString('id-ID')}
                  </time>
                </div>
              )}

              {/* Author */}
              <div>
                <span>👤 Oleh: Yayasan Markaz Qurrota A\'yun</span>
              </div>
            </div>

            {/* Description - Meta Description dari Strapi */}
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {program.attributes.description}
            </p>
          </header>

          {/* Featured Image - Optimized */}
          {imageUrl && (
            <figure className="my-8">
              <img
                src={imageUrl}
                alt={program.attributes.media?.data?.[0]?.attributes.alternativeText || program.attributes.title}
                className="w-full rounded-lg shadow-lg mb-4"
                loading="lazy"
                width={1200}
                height={630}
                // Untuk Next.js Image component (better performance):
                // <Image src={imageUrl} alt="..." width={1200} height={630} ... />
              />
              {program.attributes.media?.data?.[0]?.attributes.alternativeText && (
                <figcaption className="text-center text-gray-600 text-sm">
                  {program.attributes.media.data[0].attributes.alternativeText}
                </figcaption>
              )}
            </figure>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            {program.attributes.content ? (
              // Content dari Strapi (Rich Text/Markdown)
              <div
                dangerouslySetInnerHTML={{ __html: program.attributes.content }}
                className="leading-relaxed text-gray-800"
              />
            ) : (
              // Fallback ke description jika content kosong
              <p className="leading-relaxed text-gray-800">
                {program.attributes.description}
              </p>
            )}
          </div>

          {/* Footer Section */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Tertarik dengan program ini?</h3>
              <p className="text-gray-700 mb-4">
                Hubungi kami untuk informasi lebih lanjut tentang program {program.attributes.title}.
              </p>
              <a
                href="/kontak"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </footer>
        </article>

        {/* Related Programs - Optional */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Program Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPrograms?.map(related => (...))}
          </div>
        </div> */}
      </div>
    </>

);
}

/\*\*

- TIPS untuk SEO:
-
- 1.  METADATA:
- - Title: Keyword + Brand (max 60 chars)
- - Description: Clear & actionable (max 160 chars)
- - Automatically generated dari Strapi data
-
- 2.  SEMANTIC HTML:
- - Use proper heading hierarchy (h1 > h2 > h3)
- - Use semantic tags: article, header, footer, nav, figure
- - Use datetime attributes untuk dates
-
- 3.  IMAGES:
- - Add alt text (descriptive, keyword-rich)
- - Use lazy loading (loading="lazy")
- - Specify width/height untuk performance
- - Optimize file size (compress, WebP format)
-
- 4.  STRUCTURED DATA:
- - JSON-LD for rich snippets
- - Article schema for blog posts
- - Breadcrumb schema for navigation
- - Organization schema for homepage
-
- 5.  INTERNAL LINKING:
- - Link to related programs
- - Link to category pages
- - Use descriptive anchor text (avoid "click here")
-
- 6.  PERFORMANCE:
- - Minimize render-blocking resources
- - Optimize fonts
- - Use compression (gzip, brotli)
- - Lazy load below-the-fold content
    \*/
