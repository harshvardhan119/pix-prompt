import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - PixPrompt',
  description: 'Privacy Policy for PixPrompt AI',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-700">
            Last updated: December 17, 2025
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              1. Information We Collect
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, such as when you create an account, 
              subscribe to our newsletter, or contact us for support. This may include your name, email 
              address, and any other information you choose to provide.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              2. How We Use Your Information
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2 text-sm text-gray-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              3. Information Sharing
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share information in 
              certain limited circumstances, such as to comply with legal obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              4. Data Security
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              5. Your Rights
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              You have the right to access, update, or delete your personal information at any time. 
              You can do this by contacting us through our{' '}
              <Link href="/contact" className="text-orange-500 hover:underline">Contact page</Link> or by accessing your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              6. Contact Us
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us through our{' '}
              <Link href="/contact" className="text-orange-500 hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

