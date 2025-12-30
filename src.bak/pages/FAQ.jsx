import React, { useState } from 'react'

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null)

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

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition"
              >
                <span className="text-base md:text-lg font-bold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-orange-primary transition-transform flex-shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 py-4 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ

