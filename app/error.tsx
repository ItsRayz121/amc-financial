'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-danger-muted flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
        </svg>
      </div>
      <h1 className="font-display text-3xl font-bold text-text-primary mb-3">Something went wrong</h1>
      <p className="text-text-secondary font-sans max-w-md mb-8">
        An unexpected error occurred. Please try again — if the problem persists, contact support.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gold text-[#0a0f1e] font-semibold font-sans text-sm hover:bg-gold-light transition-colors duration-250"
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-base-border text-text-secondary font-sans text-sm hover:text-text-primary hover:border-gold/40 transition-colors duration-250"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
