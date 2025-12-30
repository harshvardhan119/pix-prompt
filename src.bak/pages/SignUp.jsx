import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 md:px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-700">
            Sign up to save favorites and create collections
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-3 py-3 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="w-4 h-4 border-gray-300 rounded text-orange-primary focus:ring-orange-primary"
              required
            />
            <label htmlFor="terms" className="text-xs text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-orange-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-orange-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-xs text-gray-700 mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-orange-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp

