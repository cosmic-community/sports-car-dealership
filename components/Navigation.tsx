'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-secondary/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent hover:scale-105 transition-transform">
              Elite Sports Cars
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/vehicles"
                className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105"
              >
                Inventory
              </Link>
              <Link 
                href="/brands"
                className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105"
              >
                Brands
              </Link>
              <Link 
                href="/locations"
                className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105"
              >
                Locations
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-800 bg-secondary-light/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/vehicles"
              className="block px-3 py-3 text-gray-300 hover:text-white font-medium transition-colors rounded-lg hover:bg-secondary-lighter"
              onClick={() => setIsOpen(false)}
            >
              Inventory
            </Link>
            <Link
              href="/brands"
              className="block px-3 py-3 text-gray-300 hover:text-white font-medium transition-colors rounded-lg hover:bg-secondary-lighter"
              onClick={() => setIsOpen(false)}
            >
              Brands
            </Link>
            <Link
              href="/locations"
              className="block px-3 py-3 text-gray-300 hover:text-white font-medium transition-colors rounded-lg hover:bg-secondary-lighter"
              onClick={() => setIsOpen(false)}
            >
              Locations
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}