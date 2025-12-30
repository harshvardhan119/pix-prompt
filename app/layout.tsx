import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

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

export const viewport = {
  themeColor: "#FF7A59",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

