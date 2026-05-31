import { SignIn } from '@clerk/nextjs'

export const metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base p-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold">
          <span className="text-gold">AMC</span>
          <span className="text-text-primary text-2xl ml-1">Admin</span>
        </h1>
        <p className="text-sm text-text-muted font-sans mt-2">
          Sign in to manage your website
        </p>
      </div>

      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full max-w-sm',
            card: 'bg-base-surface border border-base-border rounded-2xl shadow-card-hover',
            headerTitle: 'font-display text-text-primary',
            headerSubtitle: 'text-text-secondary font-sans',
            formFieldLabel: 'text-text-secondary font-sans text-sm',
            formFieldInput:
              'bg-base-elevated border-base-border text-text-primary font-sans rounded-xl focus:border-gold focus:ring-gold',
            formButtonPrimary:
              'bg-gold hover:bg-gold-light text-base font-sans font-semibold rounded-xl',
            footerActionLink: 'text-gold hover:text-gold-light',
            identityPreviewText: 'text-text-secondary font-sans',
            identityPreviewEditButtonIcon: 'text-gold',
          },
        }}
      />
    </div>
  )
}
