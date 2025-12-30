# Quick Reference Guide - AI Image Generation

## 🚀 Quick Start

1. **Choose your AI tool:** Midjourney, DALL-E 3, Stable Diffusion, etc.
2. **Select the prompt** from `docs/AI_IMAGE_GENERATION_PROMPTS.md`
3. **Copy the prompt** exactly as written
4. **Generate the image** using your chosen tool
5. **Optimize** the image for web (WebP format, compressed)
6. **Add to project** in appropriate `public/images/` directory

## 📁 File Organization

```
public/
├── images/
│   ├── hero/
│   │   └── hero-section.jpg
│   ├── features/
│   │   ├── feature-1.jpg
│   │   ├── feature-2.jpg
│   │   └── ...
│   ├── gallery/
│   │   └── (prompt preview images)
│   ├── categories/
│   │   ├── portraits.jpg
│   │   ├── landscapes.jpg
│   │   └── ...
│   ├── team/
│   │   └── (team member photos)
│   └── icons/
│       └── (category icons, etc.)
├── icons/
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── favicon.ico
└── manifest.json
```

## 🎨 Color Reference

When generating images, ensure colors match exactly:

- **Primary Orange:** `#FF7A59` (buttons, accents)
- **Dark Orange:** `#FF6A40` (hover states)
- **Light Orange:** `#FFE8DC` (backgrounds)
- **White:** `#FFFFFF` (main backgrounds)
- **Gray-900:** `#111827` (headings)
- **Gray-700:** `#374151` (body text)
- **Gray-100:** `#F3F4F6` (borders)

## 📐 Size Guidelines

### Hero Images
- Desktop: 1920x1080px (16:9)
- Mobile: 1080x1920px (9:16) or square

### Card Images
- Gallery cards: 480x600px (4:5 aspect ratio)
- Feature cards: 400x300px (4:3)
- Thumbnails: 240x240px (1:1)

### Icons
- Large icons: 64x64px
- Medium icons: 32x32px
- Small icons: 16x16px
- Favicon: 32x32px, 16x16px

## 🔧 Optimization Tips

1. **Format:** Use WebP for best compression
2. **Quality:** 80-85% for photos, 90-95% for graphics
3. **Lazy Loading:** Enable for below-fold images
4. **Responsive Images:** Use Next.js Image component
5. **CDN:** Consider using a CDN for production

## 📋 Generation Checklist

Before generating each asset:

- [ ] Read the full prompt description
- [ ] Note the exact dimensions needed
- [ ] Check color palette matches
- [ ] Verify typography specifications
- [ ] Consider responsive variants
- [ ] Plan for hover/active states if needed

## 🎯 Priority Order

Generate assets in this order:

1. **Brand Identity** - Overall aesthetic reference
2. **Hero Section** - Most visible, high impact
3. **Core Components** - Buttons, cards, icons
4. **Page-Specific** - Gallery, detail pages
5. **Supporting** - Empty states, loading, etc.

## 💡 Pro Tips

- **Consistency:** Use the same style across all images
- **Variations:** Generate 2-3 variations, pick the best
- **Iteration:** Refine prompts based on results
- **Testing:** Test images on actual pages before finalizing
- **Accessibility:** Ensure sufficient contrast in all images

## 🔗 Resources

- **Design System:** See `docs/AI_IMAGE_GENERATION_PROMPTS.md`
- **Asset Checklist:** See `docs/DESIGN_ASSETS_CHECKLIST.md`
- **Color Palette:** Defined in `tailwind.config.ts`
- **Typography:** Defined in `app/globals.css`

