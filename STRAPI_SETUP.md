# Strapi API Integration Setup

Dokumentasi lengkap setup REST API untuk Strapi dengan clean dan scalable architecture.

## 📁 Struktur File

```
src/
├── lib/api/
│   ├── client.ts         # Base HTTP client dengan fetch wrapper
│   ├── strapi.ts         # Strapi-specific utilities
│   └── services/         # Business logic layer untuk setiap resource
├── hooks/
│   └── useStrapiData.ts  # Custom hooks untuk data fetching
├── types/
│   └── strapi.ts         # TypeScript types untuk Strapi responses
└── ...
```

## 🚀 Setup

### 1. Environment Variables

Copy `.env.local.example` ke `.env.local` dan sesuaikan:

```bash
cp .env.local.example .env.local
```

Isi nilai-nilai berikut:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337  # atau production URL
STRAPI_API_TOKEN=your_api_token_here          # dari Strapi API Tokens
```

### 2. API Client (lib/api/client.ts)

Base client yang handles:

- ✅ Query string building (nested params)
- ✅ Authorization header (Bearer token)
- ✅ Request timeout
- ✅ JSON response parsing
- ✅ Error handling

**Usage:**

```typescript
import { api } from "@/lib/api/client";

// GET request
const data = await api.get("/api/articles", {
  params: {
    populate: "author",
    filters: { published: true },
  },
});

// POST request
const created = await api.post("/api/articles", {
  data: { title: "New Article" },
});

// PUT request
const updated = await api.put("/api/articles/1", {
  data: { title: "Updated" },
});

// DELETE request
await api.delete("/api/articles/1");
```

### 3. Strapi API Wrapper (lib/api/strapi.ts)

Convenience wrapper dengan Strapi-specific methods:

**Usage:**

```typescript
import { strapi } from "@/lib/api/strapi";

// Get list
const articles = await strapi.list("articles", {
  populate: ["author"],
  filters: { published: true },
  sort: "createdAt:desc",
  pagination: { page: 1, pageSize: 10 },
});

// Get single
const article = await strapi.get("articles", 1, {
  populate: ["author", "comments"],
});

// Create
const newArticle = await strapi.create("articles", {
  title: "New Article",
  content: "Content here...",
  author: 1,
});

// Update
const updated = await strapi.update("articles", 1, {
  title: "Updated Title",
});

// Delete
await strapi.delete("articles", 1);
```

### 4. Custom Hooks (hooks/useStrapiData.ts)

Hooks untuk React components dengan auto-fetching:

**For Single Item:**

```typescript
'use client';

import { useStrapiData } from '@/hooks/useStrapiData';

export default function ArticleDetail({ id }: { id: number }) {
  const { data: article, loading, error } = useStrapiData('articles', id, {
    populate: 'author,comments'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{article?.attributes.title}</div>;
}
```

**For List:**

```typescript
'use client';

import { useStrapiBList } from '@/hooks/useStrapiData';

export default function ArticleList() {
  const { data: articles, loading, error } = useStrapiBList('articles', {
    populate: 'author',
    sort: 'createdAt:desc',
    pagination: { pageSize: 10 }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {articles?.map(article => (
        <li key={article.id}>{article.attributes.title}</li>
      ))}
    </ul>
  );
}
```

### 5. Service Layer (lib/api/services/)

Create service files untuk setiap resource type:

**Example: lib/api/services/articleService.ts**

```typescript
import { strapi } from "@/lib/api/strapi";
import type { StrapiItem } from "@/types/strapi";

interface Article {
  title: string;
  content: string;
  publishedAt: string;
  author: StrapiItem<any>;
}

export const articleService = {
  // Get all articles
  getAll: async (params = {}) => {
    return strapi.list<Article>("articles", {
      populate: ["author", "category"],
      sort: "createdAt:desc",
      ...params,
    });
  },

  // Get published articles
  getPublished: async (pagination = { pageSize: 10 }) => {
    return strapi.list<Article>("articles", {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
      populate: ["author", "category"],
      sort: "createdAt:desc",
      pagination,
    });
  },

  // Get single article
  getById: async (id: number) => {
    return strapi.get<Article>("articles", id, {
      populate: ["author", "category", "comments"],
    });
  },

  // Create article
  create: async (data: Partial<Article>) => {
    return strapi.create<Article>("articles", data);
  },

  // Update article
  update: async (id: number, data: Partial<Article>) => {
    return strapi.update<Article>("articles", id, data);
  },

  // Delete article
  delete: async (id: number) => {
    return strapi.delete("articles", id);
  },
};
```

**Usage in Components:**

```typescript
import { articleService } from '@/lib/api/services/articleService';

export default async function ArticlePage() {
  const { data: articles } = await articleService.getPublished({
    pageSize: 20
  });

  return (
    <div>
      {articles?.map(article => (
        <article key={article.id}>
          <h2>{article.attributes.title}</h2>
          <p>{article.attributes.content}</p>
        </article>
      ))}
    </div>
  );
}
```

## 📝 TypeScript Types

File `src/types/strapi.ts` berisi type definitions untuk:

- `StrapiResponse<T>` - Generic response type
- `StrapiItem<T>` - Single item dengan id dan attributes
- `StrapiQueryParams` - Query parameters
- `PaginationParams` - Pagination options
- `FilterParams` - Filter options
- `ApiError` - Error type

## 🎯 Best Practices

### 1. Server vs Client Components

**Server Components** (di server actions atau async components):

```typescript
// lib/api/services/articleService.ts
const { data } = await articleService.getAll();
```

**Client Components** (dengan hooks):

```typescript
"use client";
const { data, loading } = useStrapiBList("articles");
```

### 2. Error Handling

```typescript
try {
  const article = await articleService.getById(1);
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to fetch article:", error.message);
  }
}
```

### 3. Type Safety

Selalu define types untuk resource attributes:

```typescript
interface Article {
  title: string;
  content: string;
  author: StrapiItem<Author>;
}

const { data } = await strapi.get<Article>("articles", 1);
```

### 4. Query Optimization

Gunakan `populate` untuk include relations yang diperlukan:

```typescript
// ✅ Good - hanya load author dan category
strapi.get("articles", 1, {
  populate: ["author", "category"],
});

// ❌ Bad - tidak specify populate (tidak include relations)
strapi.get("articles", 1);
```

## 🔒 Security

- API token disimpan di environment variable (tidak di client-side)
- Sensitive operations dapat di-protect dengan permissions di Strapi
- Gunakan `publicationState: 'live'` untuk published content only
- Implement rate limiting di API routes jika diperlukan

## 📚 Strapi Query Syntax

Beberapa contoh query yang umum digunakan:

```typescript
// Filter
filters: {
  title: { $contains: 'test' },
  published: { $eq: true },
  createdAt: { $gte: '2024-01-01' },
  status: { $in: ['draft', 'published'] }
}

// Populate (relations)
populate: 'author,category,comments'

// Populate nested
populate: {
  author: { fields: ['id', 'name'] },
  comments: { populate: 'author' }
}

// Sort
sort: 'createdAt:desc'  // atau 'title:asc'

// Pagination
pagination: {
  page: 1,
  pageSize: 20
}
```

## 📞 Support

Untuk informasi lebih lanjut tentang Strapi API, visit:

- https://docs.strapi.io/developer-docs/latest/api/rest-api.html
- https://strapi.io/blog

---

**Last Updated**: May 2024
