# Services Layer

Folder ini berisi service classes yang mengorganisir business logic untuk setiap resource/module di Strapi.

## Struktur

Setiap service file merepresentasikan satu resource type dari Strapi dan mengandung:

- Methods untuk CRUD operations
- Query builders dengan populate/filter yang tepat
- Data transformations/parsing
- Error handling spesifik untuk resource tersebut

## Contoh Usage

```typescript
// Di dalam service file (contoh: articleService.ts)
import { strapi } from "@/lib/api/strapi";

export const articleService = {
  getAll: async (params = {}) => {
    return strapi.list("articles", {
      populate: "author,category",
      ...params,
    });
  },

  getById: async (id: number) => {
    return strapi.get("articles", id, {
      populate: "author,category,comments",
    });
  },

  create: async (data) => {
    return strapi.create("articles", { data });
  },

  update: async (id: number, data) => {
    return strapi.update("articles", id, { data });
  },

  delete: async (id: number) => {
    return strapi.delete("articles", id);
  },
};
```

## Keuntungan Service Layer

1. **Centralized API Logic**: Semua query logic untuk satu resource ada di satu tempat
2. **Reusability**: Dapat dipanggil dari components, pages, atau API routes
3. **Maintainability**: Mudah untuk update query params, populate fields, atau filtering logic
4. **Type Safety**: Dapat menambahkan TypeScript types untuk setiap resource
5. **Testing**: Lebih mudah untuk mock dan test service methods

## Best Practices

- Buat satu file service per resource type
- Gunakan consistent naming conventions
- Export default object dengan semua methods
- Tambahkan JSDoc comments untuk clarity
- Handle errors dengan proper error messages
- Use TypeScript types untuk request/response
