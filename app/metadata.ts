import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "PixPrompt - AI Prompts That Actually Work",
  description: "Browse 10K+ tested prompts. Copy instantly. No account needed.",
  keywords: ["AI prompts", "image generation", "DALL-E", "Midjourney", "Stable Diffusion", "AI art"],
  authors: [{ name: "PixPrompt Team" }],
  creator: "PixPrompt",
  publisher: "PixPrompt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixprompt.ai'),
  openGraph: {
    title: "PixPrompt - AI Prompts That Actually Work",
    description: "Browse 10K+ tested prompts. Copy instantly. No account needed.",
    url: "/",
    siteName: "PixPrompt",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPrompt - AI Prompts That Actually Work",
    description: "Browse 10K+ tested prompts. Copy instantly. No account needed.",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#FF7A59",
}
