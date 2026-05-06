/\*\*

- Articles List Page
- Template untuk menampilkan list semua artikel
-
- Letakkan di: src/app/articles/page.tsx
  \*/

'use client';

import { useState, useEffect } from 'react';
import { articleService } from '@/lib/api/services/articleService';
import { ArticleCard } from '@/components/ArticleCard';
import { Container } from '@/components/Container';
import type { StrapiItem } from '@/types/strapi';
import type { Article } from '@/lib/api/services/articleService';

const CATEGORIES = ['Berita', 'Tips & Trik', 'Program', 'Inspirasi'];

export default function ArticlesPage() {
const [articles, setArticles] = useState<StrapiItem<Article>[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
fetchArticles();
}, [selectedCategory, searchQuery, currentPage]);

async function fetchArticles() {
setLoading(true);
setError(null);

    try {
      let response;

      if (searchQuery) {
        // Search articles
        response = await articleService.search(searchQuery, {
          pageSize: 12,
        });
      } else if (selectedCategory) {
        // Filter by category
        // Note: Anda perlu adjust ini sesuai dengan kategori slug
        response = await articleService.getPublished({
          pageSize: 12,
        });
      } else {
        // Get all published articles
        response = await articleService.getPublished({
          pageSize: 12,
        });
      }

      setArticles(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat artikel');
      setArticles([]);
    } finally {
      setLoading(false);
    }

}

return (
<>
{/_ Header _/}
<div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
<Container>
<h1 className="text-5xl font-bold mb-4">Artikel & Berita</h1>
<p className="text-lg text-primary-100 max-w-2xl">
Baca artikel terbaru, tips, dan berita dari Yayasan Markaz Qurrota A'yun
</p>
</Container>
</div>

      {/* Content */}
      <div className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="glass-card p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Cari Artikel</h3>
                <input
                  type="search"
                  placeholder="Kata kunci..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-600"
                />
              </div>

              {/* Categories */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4">Kategori</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      !selectedCategory
                        ? 'bg-primary-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    Semua
                  </button>

                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Memuat artikel...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-700">{error}</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                  <p className="text-gray-600 text-lg">Tidak ada artikel ditemukan</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <div className="px-4 py-2 flex items-center">
                      Page {currentPage}
                    </div>

                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>

);
}

/\*\*

- NOTES:
-
- Component ini adalah client component untuk:
- - Search functionality
- - Category filtering
- - Dynamic data fetching
- - State management
-
- IMPROVEMENTS:
- - Implementasi pagination yang proper
- - Add loading skeleton
- - Add filter dengan multiple categories
- - Add sort options (newest, oldest, popular)
- - Add infinite scroll
    \*/
