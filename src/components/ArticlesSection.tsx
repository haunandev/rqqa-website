/**
 * Articles Section Component
 * Menampilkan featured articles dan latest articles
 * Bisa digunakan di homepage atau page lainnya
 */

import Link from "next/link";
import { articleService } from "@/lib/api/services/articleService";
import { ArticleCard } from "./ArticleCard";
import { Container } from "./Container";
import { SubscribeForm } from "./SubscribeForm";
import type { Article } from "@/lib/api/services/articleService";

interface ArticleSectionProps {
  title?: string;
  description?: string;
  limit?: number;
  showViewAll?: boolean;
  featured?: boolean; // Jika true, tampilkan featured card style
}

export async function ArticlesSection({
  title = "Artikel Terbaru",
  description = "Baca artikel dan berita terkini dari Yayasan Markaz Qurrota A'yun",
  limit = 6,
  showViewAll = true,
  featured = true,
}: ArticleSectionProps) {
  try {
    const { data: articles } = await articleService.getLatest(limit);
    console.log("ArticlesSection: Fetched articles:", articles);

    // Jika tidak ada artikel, jangan render section
    if (!articles) {
      return null;
    }

    // Ensure articles is array - always convert to array
    const articleList: Article[] = (Array.isArray(articles)
      ? articles
      : [articles]) as unknown as Article[];

    // Jika featured dan ada minimal 1 artikel, tampilkan 1 featured + sisanya regular
    const featuredArticle: Article | null =
      featured && articleList.length > 0 ? articleList[0] : null;
    const regularArticles: Article[] =
      featured && articleList.length > 1 ? articleList.slice(1) : articleList;

    console.log("ArticlesSection: Featured article:", featuredArticle);
    console.log("ArticlesSection: Regular articles:", regularArticles);

    return (
      <section className="py-20 bg-gradient-to-b from-white to-primary-50/30">
        <Container>
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">{description}</p>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ArticleCard article={featuredArticle} featured />
                </div>

                {/* Quick Links Sidebar */}
                <div className="glass-card p-6">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">
                    Kategori Artikel
                  </h3>
                  <div className="space-y-2">
                    {["Berita", "Tips & Trik", "Program", "Inspirasi"].map(
                      (category) => (
                        <Link
                          key={category}
                          href={`/articles?category=${category.toLowerCase()}`}
                          className="flex items-center p-3 rounded-lg hover:bg-primary-50 text-gray-700 hover:text-primary-600 transition"
                        >
                          <span>📌</span>
                          <span className="ml-3">{category}</span>
                        </Link>
                      ),
                    )}
                  </div>

                  {/* Subscribe */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-sm mb-3">
                      Ikuti Update Terbaru
                    </h4>
                    <SubscribeForm />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          {regularArticles.length > 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article) => (
                  <div key={article.id}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              {/* View All Button */}
              {showViewAll && (
                <div className="flex justify-center mt-12">
                  <Link
                    href="/articles"
                    className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg hover:shadow-primary-600/30 transition-all"
                  >
                    Lihat Semua Artikel →
                  </Link>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("ArticlesSection: Failed to fetch articles:", {
      message: errorMessage,
      error,
    });
    return null;
  }
}

export default ArticlesSection;
