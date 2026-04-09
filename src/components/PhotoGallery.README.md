# PhotoGallery Component

Modern photo gallery/carousel component with Framer Motion animations for showcasing activities and events.

## Features

- **Auto-playing carousel** with 5-second intervals
- **Manual navigation** with arrow buttons and dot indicators
- **Thumbnail grid** for quick navigation
- **Smooth animations** using Framer Motion
- **Responsive design** with Tailwind CSS
- **Glassmorphism effects** and modern styling
- **Category tags** for each photo
- **Auto-play toggle** functionality

## Usage

```tsx
import PhotoGallery from "@/components/PhotoGallery";

// Add to any page
<PhotoGallery />;
```

## Customization

### Adding/Modifying Photos

Edit the `photos` array in `src/components/PhotoGallery.tsx`:

```tsx
const photos: PhotoItem[] = [
  {
    id: 1,
    image: "https://example.com/image.jpg",
    title: "Photo Title",
    description: "Photo description",
    category: "Category",
  },
  // ... more photos
];
```

### Styling

The component uses Tailwind CSS classes and can be customized by:

- Modifying the gradient backgrounds
- Adjusting animation durations
- Changing the glassmorphism effects
- Updating the color scheme to match your theme

### Auto-play Settings

- Default interval: 5 seconds
- Can be paused/resumed by user
- Automatically pauses on manual navigation

## Dependencies

- `framer-motion` - For animations
- `lucide-react` - For navigation icons
- `tailwindcss` - For styling

## Image Recommendations

- Use high-quality images (800x600px minimum)
- Ensure images are optimized for web
- Consider using a CDN for better performance
- Images should be relevant to Islamic education themes
