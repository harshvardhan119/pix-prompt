import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
  {
    question: 'How do I save favorites?',
    answer: 'Click the heart icon on any prompt to add it to your favorites. You\'ll need to create a free account to save favorites.',
  },
  {
    question: 'Can I use these prompts commercially?',
    answer: 'Yes, all prompts are free to use for both personal and commercial projects. No attribution required.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-700">
            Find answers to common questions about PixPrompt
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white mb-4 rounded-lg border border-gray-100"
            >
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
    </div>
  )
}

