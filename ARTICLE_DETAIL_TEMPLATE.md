/\*\*

- Article Detail Page
- Template untuk menampilkan artikel lengkap
-
- Letakkan di: src/app/articles/[slug]/page.tsx
  \*/

import type { Metadata, ResolvingMetadata } from 'next';
import { articleService } from '@/lib/api/services/articleService';
import {
generatePageMetadata,
generateArticleSchema,
generateBreadcrumbSchema,
generateJsonLd,
} from '@/lib/seo-utils';
import { Container } from '@/components/Container';
import Link from 'next/link';

interface Props {
params: {
slug: string;
};
}

/\*\*

- Generate metadata untuk SEO
  \*/
  export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
  ): Promise<Metadata> {
  try {
  const article = await articleService.getBySlug(params.slug);

      if (!article) {
        return {
          title: 'Artikel Tidak Ditemukan',
          description: 'Artikel yang Anda cari tidak ditemukan',
          robots: 'noindex, nofollow',
        };
      }

      const coverUrl = article.attributes.cover?.data?.attributes.url;
      const fullImageUrl = coverUrl ? `https://qurrota-ayun.org${coverUrl}` : undefined;

      return generatePageMetadata(
        article.attributes.title,
        article.attributes.description,
        fullImageUrl,
        `articles/${article.attributes.slug}`
      ) as Metadata;

  } catch (error) {
  console.error('Error generating metadata:', error);
  return {
  title: 'Artikel',
  description: 'Artikel dari Yayasan Markaz Qurrota A\'yun',
  };
  }
  }

/\*\*

- Article Detail Component
  \*/
  export default async function ArticleDetailPage({ params }: Props) {
  let article;

try {
article = await articleService.getBySlug(params.slug);

    if (!article) {
      return (
        <Container className="py-20 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Artikel tidak ditemukan
          </h1>
          <p className="text-gray-600 mb-8">
            Artikel yang Anda cari tidak ada di database kami.
          </p>
          <Link
            href="/articles"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Kembali ke Artikel
          </Link>
        </Container>
      );
    }

} catch (error) {
console.error('Error fetching article:', error);
return (
<Container className="py-20 text-center">
<h1 className="text-3xl font-bold text-red-600 mb-4">
Gagal memuat artikel
</h1>
<p className="text-gray-600">
Terjadi kesalahan saat memuat data artikel.
</p>
</Container>
);
}

const coverImage = article.attributes.cover?.data?.attributes;
const author = article.attributes.author?.data?.attributes;
const category = article.attributes.category?.data?.attributes;
const fullImageUrl = coverImage ? `https://qurrota-ayun.org${coverImage.url}` : undefined;

// Structured data
const articleSchema = generateArticleSchema({
title: article.attributes.title,
description: article.attributes.description,
content: article.attributes.content,
imageUrl: fullImageUrl,
slug: `articles/${article.attributes.slug}`,
publishedAt: article.attributes.publishedAt,
updatedAt: article.attributes.updatedAt,
author: author?.name || 'Yayasan Markaz Qurrota A\'yun',
});

const breadcrumbSchema = generateBreadcrumbSchema([
{ name: 'Home', url: 'https://qurrota-ayun.org' },
{ name: 'Artikel', url: 'https://qurrota-ayun.org/articles' },
{
name: article.attributes.title,
url: `https://qurrota-ayun.org/articles/${article.attributes.slug}`,
},
]);

const publishedDate = article.attributes.publishedAt
? new Date(article.attributes.publishedAt).toLocaleDateString('id-ID', {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric',
})
: null;

return (
<>
{/_ JSON-LD Structured Data _/}
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: generateJsonLd(articleSchema) }}
/>
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: generateJsonLd(breadcrumbSchema) }}
/>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <Container className="py-4">
          <nav aria-label="Breadcrumb" className="text-sm">
            {[
              { name: 'Home', url: '/' },
              { name: 'Artikel', url: '/articles' },
              { name: article.attributes.title, url: null },
            ].map((item, index, arr) => (
              <span key={item.name}>
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {item.url ? (
                  <Link href={item.url} className="text-primary-600 hover:underline">
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-700" aria-current="page">
                    {item.name}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </Container>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-12 md:py-16">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Category Badge */}
            {category && (
              <div className="mb-4">
                <Link
                  href={`/articles?category=${category.slug}`}
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition"
                >
                  {category.name}
                </Link>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {article.attributes.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 pb-6 border-b border-gray-200">
              {/* Author */}
              {author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{author.name}</p>
                    <p className="text-sm text-gray-500">{author.email}</p>
                  </div>
                </div>
              )}

              {/* Date */}
              {publishedDate && (
                <div className="md:ml-auto text-gray-600">
                  <time dateTime={article.attributes.publishedAt}>
                    📅 {publishedDate}
                  </time>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 mt-6 mb-8 leading-relaxed">
              {article.attributes.description}
            </p>
          </article>
        </Container>
      </div>

      {/* Featured Image */}
      {coverImage && (
        <div className="w-full bg-gray-200">
          <img
            src={coverImage.url}
            alt={coverImage.alternativeText || article.attributes.title}
            className="w-full h-96 md:h-[500px] object-cover"
            loading="lazy"
            width={1200}
            height={600}
          />
        </div>
      )}

      {/* Article Content */}
      <div className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Main Content */}
            {article.attributes.content ? (
              <div
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.attributes.content }}
              />
            ) : (
              <p className="text-gray-700 text-lg leading-relaxed">
                {article.attributes.description}
              </p>
            )}

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-700 font-semibold mb-4">Bagikan Artikel</p>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://qurrota-ayun.org/articles/${article.attributes.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://qurrota-ayun.org/articles/${article.attributes.slug}&text=${article.attributes.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition text-sm"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://qurrota-ayun.org/articles/${article.attributes.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Back to Articles */}
            <div className="mt-12 text-center">
              <Link
                href="/articles"
                className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                ← Kembali ke Artikel
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Related Articles Section */}
      {category && (
        <div className="py-16 md:py-20 bg-gray-50">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
              Artikel Terkait
            </h2>

            {/* Placeholder for related articles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-6 bg-gray-200 rounded mb-3" />
                  <div className="h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>

);
}

/\*\*

- SEO TIPS untuk Article Pages:
-
- 1.  Meta data otomatis dari Strapi content
- 2.  JSON-LD structured data (Article + Breadcrumb schema)
- 3.  Semantic HTML (article, header, time, nav tags)
- 4.  Image optimization (lazy loading, dimensions)
- 5.  Social sharing buttons
- 6.  Related articles section
- 7.  Breadcrumb navigation untuk UX & SEO
-
- RECOMMENDATIONS:
- - Add author schema markup
- - Add comment system (untuk engagement)
- - Add reading time estimate
- - Add table of contents untuk long articles
- - Implement related articles dynamically
    \*/
