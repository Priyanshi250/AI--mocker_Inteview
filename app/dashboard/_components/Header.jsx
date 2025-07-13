import React from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <header className="bg-black border-b border-red-500 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/dashboard">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Navigation in center */}
        <nav className="flex items-center space-x-6">
          <Link href="/dashboard" className="text-white hover:text-red-400 flex flex-col items-center">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </Link>
          
          <Link href="/questions" className="text-white hover:text-red-400 flex flex-col items-center">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">Questions</span>
          </Link>
          
          <Link href="/upgrade" className="text-white hover:text-red-400 flex flex-col items-center">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs">Upgrade</span>
          </Link>
          
          <Link href="/how-it-works" className="text-white hover:text-red-400 flex flex-col items-center">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">How it works</span>
          </Link>
        </nav>

        {/* User button on the right */}
        <div className="flex items-center">
          <UserButton />
        </div>
        
      </div>
    </header>
  )
}

export default Header