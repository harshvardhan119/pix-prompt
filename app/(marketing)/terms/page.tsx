export const metadata = {
  title: 'Terms of Service - PixPrompt',
  description: 'Terms of Service for PixPrompt AI',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Terms of Service
          </h1>
          <p className="text-xs text-gray-700">
            Last updated: December 17, 2025
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              By accessing and using PixPrompt, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not 
              use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              2. Use License
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on PixPrompt's 
              website for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2 text-sm text-gray-700">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on PixPrompt's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              3. Disclaimer
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              The materials on PixPrompt's website are provided on an 'as is' basis. PixPrompt makes 
              no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including without limitation, implied warranties or conditions of merchantability, fitness 
              for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              4. Limitations
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              In no event shall PixPrompt or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising 
              out of the use or inability to use the materials on PixPrompt's website, even if PixPrompt 
              or a PixPrompt authorized representative has been notified orally or in writing of the 
              possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mt-8">
              5. Revisions
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              PixPrompt may revise these terms of service for its website at any time without notice. 
              By using this website you are agreeing to be bound by the then current version of these 
              terms of service.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

