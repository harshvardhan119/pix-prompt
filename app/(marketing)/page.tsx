'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { StatCard } from '@/components/cards/stat-card'
import { FeatureCard } from '@/components/cards/feature-card'
import { StepCard } from '@/components/cards/step-card'
import { ArrowRight, Zap, Copy, Users, TrendingUp, Search, Star, Smartphone, RefreshCw } from 'lucide-react'

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const stats = [
    { number: '10K+', label: 'Tested Prompts' },
    { number: '50K+', label: 'Monthly Users' },
    { number: '4.8', label: 'Average Rating' },
    { number: '99%', label: 'Success Rate' },
  ]

  const steps = [
    {
      number: '1',
      title: 'Browse Prompts',
      description: 'Explore thousands of tested AI prompts across all categories',
    },
    {
      number: '2',
      title: 'Copy & Use',
      description: 'One-click copy to clipboard. No account needed to get started',
    },
    {
      number: '3',
      title: 'Create Magic',
      description: 'Paste into your AI tool and watch it generate amazing results',
    },
  ]

  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Instant access to all prompts', badge: '⚡ Best performance' },
    { icon: '💚', title: 'Free Forever', description: 'No credit card required', badge: '💚 Best for casual users' },
    { icon: '🔍', title: 'Smart Search', description: 'Find exactly what you need', badge: '' },
    { icon: '⭐', title: 'Curated Quality', description: 'Every prompt is tested and verified', badge: '' },
    { icon: '📱', title: 'Mobile Ready', description: 'Works perfectly on all devices', badge: '' },
    { icon: '🔄', title: 'Regular Updates', description: 'New prompts added daily', badge: '' },
  ]

  const faqs = [
    {
      question: 'What is PixPrompt?',
      answer: 'PixPrompt is a curated library of 10,000+ tested AI prompts that actually work. Browse, copy, and use prompts instantly without creating an account.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No! You can browse and copy prompts without signing up. Accounts are optional and let you save favorites and create collections.',
    },
    {
      question: 'Are the prompts free to use?',
      answer: 'Yes, all prompts are completely free to use. No credit card required, no hidden fees.',
    },
    {
      question: 'Which AI tools work with these prompts?',
      answer: 'Our prompts work with DALL-E, Midjourney, Stable Diffusion, and most other popular AI image generators. Each prompt shows compatibility badges.',
    },
    {
      question: 'How often are new prompts added?',
      answer: 'We add new prompts daily. Check the Trending page to see the latest additions.',
    },
    {
      question: 'Can I submit my own prompts?',
      answer: 'Yes! We welcome community submissions. Contact us through the Contact page to learn more.',
    },
  ]

  const prompts = [
    { id: 1, category: 'Portrait', views: '2.4K', prompt: 'A professional headshot of a business executive, corporate style, high quality' },
    { id: 2, category: 'Landscape', views: '1.8K', prompt: 'Serene mountain landscape at sunset, cinematic lighting, 4K quality' },
    { id: 3, category: 'Abstract', views: '3.2K', prompt: 'Colorful abstract art with geometric patterns, modern design, vibrant colors' },
    { id: 4, category: 'Product', views: '1.5K', prompt: 'Product photography of a luxury watch, studio lighting, white background' },
  ]

  return (
    <div className="min-h-screen">
      {/* SECTION 1.1: HERO */}
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-100 to-white"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-4 leading-tight tracking-tight">
            Discover AI Prompts That Actually Work
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-8 leading-relaxed">
            Browse 10K+ tested prompts. Copy instantly. No account needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <Button variant="primary" size="lg">
                Browse Gallery
              </Button>
            </Link>
            <Link href="/trending">
              <Button variant="secondary" size="lg">
                View Trending
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 1.2: SOCIAL PROOF / STATISTICS */}
      <section className="bg-orange-light py-12 md:py-15 lg:py-15 px-4 md:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.3: HOW IT WORKS */}
      <section className="py-16 md:py-20 lg:py-20 px-4 md:px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-10 md:mb-10 text-left">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-10">
            {steps.map((step, index) => (
              <StepCard key={index} number={step.number} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.4: FEATURE HIGHLIGHTS */}
      <section className="bg-orange-light py-16 md:py-20 lg:py-20 px-4 md:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 md:mb-12 text-center">
            Why Choose PixPrompt?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
            {features.map((feature, index) => {
              const icons = {
                '⚡': <Zap size={24} />,
                '💚': <Copy size={24} />,
                '🔍': <Search size={24} />,
                '⭐': <Star size={24} />,
                '📱': <Smartphone size={24} />,
                '🔄': <RefreshCw size={24} />,
              }
              return (
                <FeatureCard
                  key={index}
                  icon={icons[feature.icon as keyof typeof icons] || feature.icon}
                  title={feature.title}
                  description={feature.description}
                  badge={feature.badge}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 1.5: FEATURED PROMPTS CAROUSEL */}
      <section className="py-16 md:py-20 lg:py-20 px-4 md:px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Featured Prompts
          </h2>
          <p className="text-sm md:text-sm text-gray-700 mb-10 md:mb-10">
            Hand-picked prompts that are trending this week
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
            {prompts.map((prompt) => (
              <Card key={prompt.id} hover className="overflow-hidden">
                <div className="relative h-48 bg-gray-100 group">
                  <div className="absolute top-2 left-2 bg-white/90 text-orange-primary text-xs font-bold px-2 py-1 rounded">
                    {prompt.category}
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded">
                    {prompt.views} views
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="primary" size="sm" className="opacity-100">
                      Copy Prompt
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs font-mono text-gray-700 line-clamp-2 leading-snug">
                    {prompt.prompt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.6: MAIN CTA SECTION */}
      <section className="py-16 md:py-20 lg:py-20 px-4 md:px-6 lg:px-10 bg-gradient-to-r from-orange-primary to-orange-dark text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 md:mb-5">
            Ready to Create Amazing AI Art?
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 md:mb-8">
            Join thousands of creators using PixPrompt to generate stunning visuals
          </p>
          <Link href="/gallery">
            <Button variant="primary" size="lg" className="bg-white text-orange-primary hover:bg-gray-50">
              Start Browsing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* SECTION 1.7: FAQ ACCORDION */}
      <section className="bg-orange-light py-16 md:py-20 lg:py-20 px-4 md:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-10 md:mb-10">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white mb-4 rounded-lg border border-gray-100">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <span className="text-base md:text-lg font-bold text-gray-900 text-left pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-sm md:text-base text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}

