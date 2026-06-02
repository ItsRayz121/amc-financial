'use client'

import { useState } from 'react'
import { Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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
        body: JSON.stringify({ email, phone: phone || null }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? 'Thank you for subscribing!')
        setEmail('')
        setPhone('')
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
    <section className="py-16 md:py-20 bg-base-surface border-y border-base-border" aria-label="Newsletter signup">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-muted border border-gold/20 text-gold text-xs font-semibold font-sans uppercase tracking-widest mb-6">
              <Mail size={13} aria-hidden="true" />
              Newsletter
            </div>

            <h2 className="font-display text-display-sm sm:text-display-md font-bold text-text-primary mb-4 leading-tight">
              Stay{' '}
              <span className="text-gold-gradient">Updated</span>
            </h2>

            <p className="text-text-secondary font-sans leading-relaxed mb-8">
              Enter your details below to stay in the loop. No spam, unsubscribe anytime.
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 p-5 rounded-2xl border border-emerald/20 bg-emerald-muted">
                <CheckCircle2 size={20} className="text-emerald shrink-0" aria-hidden="true" />
                <p className="text-sm font-sans font-medium text-emerald">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
                <div>
                  <label htmlFor="email-capture" className="sr-only">Email address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true" />
                    <input
                      id="email-capture"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      disabled={status === 'loading'}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-elevated border border-base-border text-text-primary font-sans text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone-capture" className="sr-only">Phone number (optional)</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true" />
                    <input
                      id="phone-capture"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number (optional)"
                      disabled={status === 'loading'}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-elevated border border-base-border text-text-primary font-sans text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-[#0a0f1e] font-semibold font-sans text-sm hover:bg-gold-light transition-colors duration-250 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting…' : 'Subscribe'}
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
