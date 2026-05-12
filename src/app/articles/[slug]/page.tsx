import type { Metadata, ResolvingMetadata } from "next";
import { Article, articleService } from "@/lib/api/services/articleService";
import { getImageUrl } from "@/lib/utils/image-url";
import {
  generatePageMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateJsonLd,
} from "@/lib/seo-utils";
import { Container } from "@/components/Container";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const article = (await articleService.getBySlug(
      (await params).slug,
    )) as unknown as Article;

    if (!article) {
      return {
        title: "Artikel Tidak Ditemukan",
        description: "Artikel yang Anda cari tidak ditemukan",
        robots: "noindex, nofollow",
      };
    }

    const coverUrl = article.cover?.url;
    const fullImageUrl = getImageUrl(coverUrl) || undefined;

    return generatePageMetadata(
      article.title,
      article.description,
      fullImageUrl,
      `articles/${article.slug}`,
    ) as Metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Artikel",
      description: "Artikel dari Yayasan Markaz Qurrota A'yun",
    };
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  let article;

  try {
    console.log(
      "ArticleDetailPage: Fetching article with slug:",
      await (
        await params
      ).slug,
    );
    article = (await articleService.getBySlug(
      (await params).slug,
    )) as unknown as Article;

    console.log("ArticleDetailPage: Fetched article:", article);

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
    console.error("Error fetching article:", error);
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

  const coverImage = article.cover;
  const author = article.author;
  const category = article.category;
  const fullImageUrl = getImageUrl(coverImage?.url) || undefined;

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.description,
    content: article.content,
    imageUrl: fullImageUrl,
    slug: `articles/${article.slug}`,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    author: author?.name || "Yayasan Markaz Qurrota A'yun",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://qurrota-ayun.org" },
    { name: "Artikel", url: "https://qurrota-ayun.org/articles" },
    {
      name: article.title,
      url: `https://qurrota-ayun.org/articles/${article.slug}`,
    },
  ]);

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJsonLd(breadcrumbSchema) }}
      />

      <div className="bg-gray-50 border-b border-gray-200">
        <Container className="py-4">
          <nav aria-label="Breadcrumb" className="text-sm">
            {[
              { name: "Home", url: "/" },
              { name: "Artikel", url: "/articles" },
              { name: article.title, url: null },
            ].map((item, index) => (
              <span key={item.name}>
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {item.url ? (
                  <Link
                    href={item.url}
                    className="text-primary-600 hover:underline"
                  >
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

      <div className="bg-gradient-to-b from-primary-50 to-white py-12 md:py-16">
        <Container>
          <article className="max-w-4xl mx-auto">
            {category && (
              <div className="mb-4">
                <span className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {category.name}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {article.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 pb-6 border-b border-gray-200">
              {author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{author.name}</p>
                    {publishedDate && (
                      <p className="text-sm text-gray-500">{publishedDate}</p>
                    )}
                  </div>
                </div>
              )}

              {!author && publishedDate && (
                <div className="text-gray-600">
                  <time dateTime={article.publishedAt}>📅 {publishedDate}</time>
                </div>
              )}
            </div>

            <p className="text-xl text-gray-600 mt-6 mb-8 leading-relaxed">
              {article.description}
            </p>
          </article>
        </Container>
      </div>

      {coverImage && (
        <div className="w-full bg-gray-200">
          <img
            src={getImageUrl(coverImage.url) || ""}
            alt={coverImage.alternativeText || article.title}
            className="w-full h-96 md:h-[500px] object-cover"
            loading="lazy"
            width={1200}
            height={600}
          />
        </div>
      )}

      <div className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            {article.content ? (
              <div
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              />
            ) : (
              <p className="text-gray-700 text-lg leading-relaxed">
                {article.description}
              </p>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-700 font-semibold mb-4">
                Bagikan Artikel
              </p>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://qurrota-ayun.org/articles/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=https://qurrota-ayun.org/articles/${article.slug}&text=${article.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition text-sm"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://qurrota-ayun.org/articles/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>

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
    </>
  );
}
