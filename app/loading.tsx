export default function Loading() {
  return (
    <div className="min-h-screen bg-base animate-pulse">
      {/* Hero skeleton */}
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <div className="h-6 w-48 rounded-full bg-base-elevated" />
        <div className="h-14 w-[600px] max-w-full rounded-2xl bg-base-elevated" />
        <div className="h-8 w-[400px] max-w-full rounded-xl bg-base-elevated" />
        <div className="flex gap-3">
          <div className="h-12 w-48 rounded-xl bg-base-elevated" />
          <div className="h-12 w-40 rounded-xl bg-base-elevated" />
        </div>
      </div>
      {/* Stats skeleton */}
      <div className="border-y border-base-border bg-base-surface py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 py-4">
              <div className="h-10 w-24 rounded-xl bg-base-elevated" />
              <div className="h-4 w-32 rounded bg-base-elevated" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
