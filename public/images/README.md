# Public Images

Tempat untuk menyimpan static images yang tidak perlu preprocessing:

- Logo website
- Hero images
- OG images (Open Graph)
- Brand images
- Background images

## Penggunaan

Akses dari komponen dengan path `/images/filename`:

```jsx
<img src="/images/logo.png" alt="Logo" />
```

atau menggunakan Next.js Image component (recommended):

```jsx
import Image from "next/image";

<Image src="/images/hero.jpg" alt="Hero" width={1200} height={600} />;
```
