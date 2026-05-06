# Artikel Section - Implementation Guide

Panduan lengkap untuk mengintegrasikan artikel dari Strapi ke homepage dan membuat pages artikel.

## 📋 Strapi Configuration

Pastikan Anda sudah membuat collection type "Article" di Strapi dengan field berikut:

```
Field Configuration:
├── title (Text) - Required
├── description (Text) - Required
├── slug (UID) - Required, based on title
├── content (Rich Text) - Optional
├── cover (Media) - Optional
├── author (Relation) - many-to-one dengan Author
├── category (Relation) - many-to-one dengan Category
├── blocks (Dynamic Zone) - Optional, untuk content blocks
├── publishedAt (Publish Date) - Important untuk filtering
└── Draft/Published status
```

## 🗂️ Files Created

### Services

- **`src/lib/api/services/articleService.ts`**
  - Service untuk fetch artikel dari Strapi
  - Methods: `getLatest()`, `getPublished()`, `getBySlug()`, `search()`, `getRelated()`
  - Support filtering by category, author, search

### Components

- **`src/components/ArticleCard.tsx`**
  - Article card component dengan 2 variant: featured & regular
  - Menampilkan cover, title, description, author, category
  - Support untuk loading state & hover effects

- **`src/components/ArticlesSection.tsx`**
  - Section component untuk homepage
  - Menampilkan featured article + grid regular articles
  - Include sidebar dengan kategori & subscribe form
  - Async component - fetch data di server

### Pages

- **Home Page** (`src/app/page.tsx`)
  - Updated dengan ArticlesSection
  - Ditambahkan setelah PhotoGallery section

### Templates

- **`ARTICLE_DETAIL_TEMPLATE.md`**
  - Template untuk dynamic article detail page
  - Copy ke `src/app/articles/[slug]/page.tsx`
  - Include: metadata generation, JSON-LD, breadcrumb, sharing buttons

- **`ARTICLES_LIST_TEMPLATE.md`**
  - Template untuk articles list page
  - Copy ke `src/app/articles/page.tsx`
  - Include: search, category filter, pagination

## 🚀 Quick Start (15 minutes)

### Step 1: Strapi Setup

1. Di Strapi admin panel, buat collection type "Article"
2. Add fields sesuai konfigurasi di atas
3. Create minimal 1 artikel dengan status Published
4. Set cover image, author, category

### Step 2: Copy Templates

```bash
# Copy article detail page template
cp ARTICLE_DETAIL_TEMPLATE.md src/app/articles/\[slug\]/page.tsx

# Copy articles list page template
cp ARTICLES_LIST_TEMPLATE.md src/app/articles/page.tsx
```

### Step 3: Update Links

Pastikan link-link berikut sudah correct:

- Homepage: sudah ada ArticlesSection ✅
- Navigation: tambahkan link ke `/articles`

### Step 4: Test

```bash
npm run dev

# Visit:
# - http://localhost:3000 (lihat articles section di homepage)
# - http://localhost:3000/articles (list page)
# - http://localhost:3000/articles/[slug] (detail page)
```

## 📁 File Structure

```
src/
├── app/
│   ├── articles/              # [BUAT BARU]
│   │   ├── [slug]/
│   │   │   └── page.tsx       # Article detail
│   │   └── page.tsx           # Articles list
│   ├── page.tsx               # ✅ Updated
│   └── ...
├── components/
│   ├── ArticleCard.tsx        # ✅ Created
│   ├── ArticlesSection.tsx    # ✅ Created
│   └── ...
├── lib/api/services/
│   ├── articleService.ts      # ✅ Created
│   ├── programService.ts
│   └── ...
└── ...

Documents/
├── ARTICLE_DETAIL_TEMPLATE.md   # ✅ Created
├── ARTICLES_LIST_TEMPLATE.md    # ✅ Created
└── ...
```

## 🔗 Available Methods

### articleService.getLatest(limit)

Fetch N artikel terbaru yang sudah published

```typescript
const { data } = await articleService.getLatest(6);
```

### articleService.getPublished(pagination)

Fetch artikel dengan pagination

```typescript
const { data } = await articleService.getPublished({
  pageSize: 10,
});
```

### articleService.getBySlug(slug)

Fetch single artikel by slug (untuk detail page)

```typescript
const article = await articleService.getBySlug("my-article-slug");
```

### articleService.search(query)

Search artikel by title/description

```typescript
const { data } = await articleService.search("quran");
```

### articleService.getByCategory(categorySlug)

Filter artikel by category

```typescript
const { data } = await articleService.getByCategory("berita");
```

### articleService.getRelated(categoryId, excludeId, limit)

Get related articles dalam kategori yang sama

```typescript
const { data } = await articleService.getRelated(1, 5, 3);
```

## 🎨 Customization

### ArticlesSection Props

```typescript
<ArticlesSection
  title="Custom Title"
  description="Custom description"
  limit={6}              // Jumlah artikel
  showViewAll={true}     // Show "View All" button
  featured={true}        // Show featured card
/>
```

### ArticleCard Props

```typescript
<ArticleCard
  article={article}
  featured={false}  // true untuk larger card style
/>
```

## 🔍 SEO Features

### HomePage ArticlesSection

- ✅ Server-side rendering (async component)
- ✅ Dynamic title & description
- ✅ Image optimization
- ✅ Category badges
- ✅ Author metadata
- ✅ Published date

### Article Detail Page

- ✅ Dynamic metadata dari Strapi
- ✅ JSON-LD Article schema
- ✅ JSON-LD Breadcrumb schema
- ✅ Semantic HTML (article, header, time, nav)
- ✅ Image optimization
- ✅ Social sharing buttons
- ✅ Breadcrumb navigation

### Article List Page

- ✅ Search functionality
- ✅ Category filtering
- ✅ Pagination
- ✅ Meta tags

## 🐛 Troubleshooting

### Articles tidak muncul di homepage?

1. Check Strapi: apakah artikel sudah published?
2. Check URL: apakah image URL benar?
3. Check token: apakah API token valid?
4. Check logs: `npm run dev` dan lihat error di console

### Error "Cannot find module"?

- Pastikan path import correct (relative/absolute)
- Check TypeScript paths di `tsconfig.json`

### Images tidak muncul?

- Check Strapi media upload
- Check image URL di browser developer tools
- Pastikan image format supported (JPG, PNG, WebP)

## 📚 Related Documentation

- [Strapi API Integration](STRAPI_SETUP.md)
- [SEO Implementation](SEO_IMPLEMENTATION.md)
- [Program Service Reference](PROGRAM_DETAIL_EXAMPLE.md)

## 💡 Next Features

Beberapa fitur yang bisa ditambahkan:

- [ ] Comments section
- [ ] Reading time estimate
- [ ] Table of contents untuk long articles
- [ ] Related articles di detail page
- [ ] Author bio & social media
- [ ] Newsletter subscription
- [ ] Analytics tracking
- [ ] Like/upvote buttons

## 🔄 Update Workflow

Setiap kali tambah/update artikel di Strapi:

1. Publish artikel
2. Set cover image & metadata
3. Website otomatis update (no redeploy needed)
4. Homepage & articles page show artikel baru

## 📞 Support

Jika ada masalah:

1. Check console error: `npm run dev`
2. Check Strapi logs
3. Verify API token di `.env.local`
4. Check network request di browser DevTools

---

**Created:** May 2026  
**Last Updated:** May 2026
