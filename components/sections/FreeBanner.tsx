import { ScrollReveal } from '@/components/common/ScrollReveal'

export function FreeBanner() {
  return (
    <section className="py-16 md:py-20 bg-base-surface border-y border-base-border overflow-hidden relative" aria-label="Our commitment — everything is free">
      {/* Gold lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201,168,76,0.04) 60px, rgba(201,168,76,0.04) 61px)',
        }}
      />

      <div className="section-container relative z-10 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-muted border border-gold/20 text-gold text-xs font-semibold font-sans uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" aria-hidden="true" />
            Our Commitment
          </div>

          <h2 className="font-display text-display-lg md:text-display-xl font-bold mb-6 leading-tight">
            Everything Here Is{' '}
            <span className="text-gold-gradient">Free. Always.</span>
          </h2>

          <p className="text-lg text-text-secondary font-sans leading-relaxed max-w-2xl mx-auto mb-6">
            Every course, every community, every insight, every piece of support — completely free.
            No paid memberships. No paid courses. No hidden fees.
          </p>

          <p className="text-base text-text-muted font-sans max-w-xl mx-auto mb-8">
            Aasim&apos;s mission is to make financial education accessible to everyone. Your
            financial freedom starts here, and it starts free.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {[
              'No Paid Courses',
              'No Membership Fees',
              'No Hidden Charges',
              'Forever Free',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-sans font-medium text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
