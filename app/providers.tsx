'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: 'bg-base-surface border border-base-border text-text-primary font-sans',
            title: 'text-text-primary',
            description: 'text-text-secondary',
          },
        }}
      />
    </ThemeProvider>
  )
}
