# Public Fonts

Tempat untuk menyimpan custom fonts (woff2, ttf, dll):

## Penggunaan

Import font di `src/styles/globals.css`:

```css
@font-face {
  font-family: "CustomFont";
  src: url("/fonts/custom-font.woff2") format("woff2");
  font-weight: normal;
}

body {
  font-family: "CustomFont", sans-serif;
}
```

atau konfigurasi di `tailwind.config.ts`:

```ts
theme: {
  fontFamily: {
    custom: ['CustomFont', 'sans-serif'],
  }
}
```
