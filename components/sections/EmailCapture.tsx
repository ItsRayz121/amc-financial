'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? 'Check your email for your free Starter Kit!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Connection error. Please try again.')
    }
  }

  return (
    <section className="py-16 md:py-20 bg-base-surface border-y border-base-border" aria-label="Free Trading Starter Kit">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-muted border border-gold/20 text-gold text-xs font-semibold font-sans uppercase tracking-widest mb-6">
              <Mail size={13} aria-hidden="true" />
              Free Resource
            </div>

            <h2 className="font-display text-display-sm sm:text-display-md font-bold text-text-primary mb-4 leading-tight">
              Get Your Free{' '}
              <span className="text-gold-gradient">Trading Starter Kit</span>
            </h2>

            <p className="text-text-secondary font-sans leading-relaxed mb-2">
              A 5-page guide covering the top 3 mistakes beginners make, Aasim&apos;s recommended platform setup, and your first-week action plan.
            </p>
            <p className="text-sm text-text-muted font-sans mb-8">
              Delivered free to your inbox — no spam, unsubscribe anytime.
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 p-5 rounded-2xl border border-emerald/20 bg-emerald-muted">
                <CheckCircle2 size={20} className="text-emerald shrink-0" aria-hidden="true" />
                <p className="text-sm font-sans font-medium text-emerald">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1">
                  <label htmlFor="email-capture" className="sr-only">Email address</label>
                  <input
                    id="email-capture"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl bg-base-elevated border border-base-border text-text-primary font-sans text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-[#0a0f1e] font-semibold font-sans text-sm hover:bg-gold-light transition-colors duration-250 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {status === 'loading' ? 'Sending…' : 'Get Free Kit'}
                  {status !== 'loading' && <ArrowRight size={15} aria-hidden="true" />}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-xs text-danger font-sans mt-3">{message}</p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
