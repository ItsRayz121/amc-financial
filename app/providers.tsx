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
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(220 40% 13%)',
            border: '1px solid hsl(220 40% 20%)',
            color: 'hsl(214 32% 91%)',
          },
        }}
      />
    </ThemeProvider>
  )
}
