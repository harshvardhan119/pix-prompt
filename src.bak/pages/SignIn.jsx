import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signin logic here
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 md:px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Sign In
          </h1>
          <p className="text-sm text-gray-700">
            Welcome back! Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 border-gray-300 rounded text-orange-primary focus:ring-orange-primary"
              />
              <span className="text-xs text-gray-700">Remember me</span>
            </label>
            <Link to="#" className="text-xs text-orange-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-gray-700 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn

