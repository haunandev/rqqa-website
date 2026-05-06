/**
 * Article Card Component
 * Menampilkan artikel dalam bentuk card
 */

import Link from "next/link";
import type { StrapiItem } from "@/types/strapi";
import type { Article } from "@/lib/api/services/articleService";

interface ArticleCardProps {
  article: StrapiItem<Article>;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const coverImage = article.attributes.cover?.data?.attributes;
  const author = article.attributes.author?.data?.attributes;
  const category = article.attributes.category?.data?.attributes;
  const publishedDate = article.attributes.publishedAt
    ? new Date(article.attributes.publishedAt).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  if (featured) {
    // Featured article - larger card
    return (
      <Link href={`/articles/${article.attributes.slug}`}>
        <article className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
          {/* Featured Image */}
          {coverImage && (
            <div className="relative w-full h-80 overflow-hidden bg-gray-200">
              <img
                src={coverImage.url}
                alt={coverImage.alternativeText || article.attributes.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={800}
                height={400}
              />

              {/* Category Badge */}
              {category && (
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {category.name}
                  </span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 flex flex-col h-full">
            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition line-clamp-2">
              {article.attributes.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3 flex-grow">
              {article.attributes.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                {author && (
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">{author.name}</p>
                    {publishedDate && (
                      <p className="text-gray-500 text-xs">{publishedDate}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Read More */}
              <span className="inline-flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                Baca →
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Regular article card
  return (
    <Link href={`/articles/${article.attributes.slug}`}>
      <article className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        {coverImage && (
          <div className="relative w-full h-48 overflow-hidden bg-gray-200">
            <img
              src={coverImage.url}
              alt={coverImage.alternativeText || article.attributes.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              width={400}
              height={200}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Category */}
          {category && (
            <span className="inline-block text-xs font-semibold text-primary-600 mb-2 bg-primary-50 px-2 py-1 rounded w-fit">
              {category.name}
            </span>
          )}

          {/* Title */}
          <h3 className="font-bold text-base mb-2 text-gray-900 group-hover:text-primary-600 transition line-clamp-2">
            {article.attributes.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
            {article.attributes.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              {publishedDate && <span>{publishedDate}</span>}
            </div>
            <span className="text-xs font-semibold text-primary-600">
              Baca →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;
