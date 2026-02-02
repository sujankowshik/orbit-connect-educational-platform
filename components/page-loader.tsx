'use client'

import { Spinner } from '@/components/ui/spinner'

export function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect">
            <Spinner className="w-8 h-8" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Loading...</p>
          <p className="text-sm text-muted-foreground">Please wait while we fetch your data</p>
        </div>
      </div>
    </div>
  )
}

export function DataLoadingState() {
  return (
    <div className="space-y-4">
      <div className="glass-effect border border-primary/30 rounded-2xl p-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-primary/10 rounded-lg w-1/3"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-4 bg-primary/10 rounded w-5/6"></div>
        </div>
      </div>
      <div className="glass-effect border border-primary/30 rounded-2xl p-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-primary/10 rounded-lg w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-primary/10 rounded"></div>
            <div className="h-24 bg-primary/10 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatsLoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass-effect border border-primary/30 rounded-2xl p-6 animate-pulse">
          <div className="space-y-4">
            <div className="h-10 bg-primary/10 rounded-lg w-full"></div>
            <div className="h-4 bg-primary/10 rounded w-3/4"></div>
            <div className="h-6 bg-primary/10 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChartLoadingState() {
  return (
    <div className="glass-effect border border-primary/30 rounded-2xl p-8 animate-pulse">
      <div className="space-y-6">
        <div className="h-6 bg-primary/10 rounded w-1/4"></div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-primary/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-primary/10 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
