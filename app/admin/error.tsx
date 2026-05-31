'use client'

import { useEffect } from 'react'

export default function AdminError({
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
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-xl bg-danger-muted flex items-center justify-center">
        <svg className="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
        </svg>
      </div>
      <h2 className="font-display text-xl font-semibold text-text-primary">Admin Error</h2>
      <p className="text-sm text-text-secondary font-sans max-w-sm">
        {error.message || 'An unexpected error occurred in the admin panel.'}
      </p>
      <button
        onClick={reset}
        className="px-5 py-2.5 rounded-xl bg-gold text-[#0a0f1e] text-sm font-semibold font-sans hover:bg-gold-light transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
