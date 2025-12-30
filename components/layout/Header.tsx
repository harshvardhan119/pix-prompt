'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HorizontalAd from '../ads/horizontal-ad'


export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">PixPrompt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition ${isActive('/') ? 'text-orange-primary' : 'text-gray-700 hover:text-orange-primary'
                }`}
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className={`text-sm font-medium transition ${isActive('/gallery') ? 'text-orange-primary' : 'text-gray-700 hover:text-orange-primary'
                }`}
            >
              Gallery
            </Link>
            <Link
              href="/trending"
              className={`text-sm font-medium transition ${isActive('/trending') ? 'text-orange-primary' : 'text-gray-700 hover:text-orange-primary'
                }`}
            >
              Trending
            </Link>
            <Link
              href="/favorites"
              className={`text-sm font-medium transition ${isActive('/favorites') ? 'text-orange-primary' : 'text-gray-700 hover:text-orange-primary'
                }`}
            >
              Favorites
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-orange-primary transition"
            >
              Sign In
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm" className="hidden md:block">
                Sign Up
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className={`text-sm font-medium px-2 py-1 ${isActive('/') ? 'text-orange-primary' : 'text-gray-700'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className={`text-sm font-medium px-2 py-1 ${isActive('/gallery') ? 'text-orange-primary' : 'text-gray-700'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/trending"
                className={`text-sm font-medium px-2 py-1 ${isActive('/trending') ? 'text-orange-primary' : 'text-gray-700'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                href="/favorites"
                className={`text-sm font-medium px-2 py-1 ${isActive('/favorites') ? 'text-orange-primary' : 'text-gray-700'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/signin"
                  className="text-sm font-medium text-gray-700 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

    </header>
  )
}

