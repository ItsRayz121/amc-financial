import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <span className="font-display text-8xl font-bold text-gold opacity-20 select-none">404</span>
      </div>
      <h1 className="font-display text-3xl font-bold text-text-primary mb-3">Page Not Found</h1>
      <p className="text-text-secondary font-sans max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved or the link may be incorrect.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gold text-[#0a0f1e] font-semibold font-sans text-sm hover:bg-gold-light transition-colors duration-250"
        >
          Back to Home
        </Link>
        <Link
          href="/#communities"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-base-border text-text-secondary font-sans text-sm hover:text-text-primary hover:border-gold/40 transition-colors duration-250"
        >
          Join Community
        </Link>
      </div>
    </div>
  )
}
