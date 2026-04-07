# Assets Icons

Tempat untuk menyimpan SVG icons yang diimport langsung di komponen:

## Penggunaan

Simpan file `.svg`, contoh: `check-mark.svg`

Import di komponen:

```jsx
import CheckIcon from "@/assets/icons/check-mark.svg";

export function MyComponent() {
  return <CheckIcon className="w-6 h-6" />;
}
```

untuk Next.js, install `next-svg`:

```bash
npm install next-svg
```

Atau convert SVG ke React component:

```jsx
// check-mark.tsx
export const CheckIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="..." />
  </svg>
);
```

Kemudian import:

```jsx
import { CheckIcon } from "@/assets/icons/check-mark";
```
