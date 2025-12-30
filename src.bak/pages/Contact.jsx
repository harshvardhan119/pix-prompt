import React, { useState } from 'react'
import Button from '../components/ui/Button'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageType: '',
    message: '',
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Contact Us
          </h1>
          <p className="text-sm text-gray-700">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Message Type
            </label>
            <select
              value={formData.messageType}
              onChange={(e) => setFormData({ ...formData, messageType: e.target.value })}
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
              required
            >
              <option value="">Choose topic...</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your message..."
              rows={6}
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent resize-y"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Send Message
          </Button>
        </form>

        {showSuccess && (
          <div className="fixed top-5 right-5 bg-success text-white px-5 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-slide-in">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">Message sent successfully!</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact

