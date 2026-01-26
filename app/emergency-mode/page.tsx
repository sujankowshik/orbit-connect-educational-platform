'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface TimelineEvent {
  id: string
  time: number
  title: string
  description: string
  status: 'completed' | 'current' | 'pending'
  impact: 'critical' | 'major' | 'minor'
  icon: string
}

export default function EmergencyMode() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const maxTime = 300

  const events: TimelineEvent[] = [
    {
      id: '1',
      time: 0,
      title: 'Earthquake Detected',
      description: '7.2 magnitude earthquake hits coastal city',
      status: 'completed',
      impact: 'critical',
      icon: '🌍',
    },
    {
      id: '2',
      time: 30,
      title: 'Infrastructure Damage',
      description: 'Power grid failure, cellular networks down',
      status: 'completed',
      impact: 'critical',
      icon: '⚡',
    },
    {
      id: '3',
      time: 60,
      title: 'Satellite Connection Established',
      description: 'Emergency teams connect via satellite network',
      status: 'completed',
      impact: 'major',
      icon: '📡',
    },
    {
      id: '4',
      time: 120,
      title: 'Rescue Operations Coordinated',
      description: 'Real-time communication enables rescue coordination',
      status: currentTime >= 120 ? 'completed' : 'pending',
      impact: 'major',
      icon: '🚁',
    },
    {
      id: '5',
      time: 180,
      title: 'Casualties Assessed',
      description: 'Medical teams receive real-time situational data',
      status: currentTime >= 180 ? 'completed' : 'pending',
      impact: 'critical',
      icon: '🏥',
    },
    {
      id: '6',
      time: 240,
      title: 'Relief Distribution',
      description: 'Supply chains optimized via satellite coordination',
      status: currentTime >= 240 ? 'completed' : 'pending',
      impact: 'major',
      icon: '📦',
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && currentTime < maxTime) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= maxTime) {
            setIsRunning(false)
            return maxTime
          }
          return prev + 1
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isRunning, currentTime])

  const activeEvent = events.find((e) => e.time <= currentTime)

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-4 mb-8 animate-slide-in-up">
          <div className="inline-block px-4 py-2 rounded-full glass-effect text-destructive text-sm font-semibold">
            Interactive Simulation
          </div>
          <h1 className="text-5xl font-bold gradient-text">
            Emergency Response Simulation
          </h1>
          <p className="text-lg text-muted-foreground">
            See how satellite communication enables disaster response
          </p>
        </div>

        {activeEvent && (
          <div className="glass-effect border-destructive/50 rounded-2xl p-8 border-2 glow-effect animate-slide-in-up" style={{ boxShadow: '0 0 30px rgba(255, 0, 0, 0.1)' }}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-6xl animate-float">{activeEvent.icon}</span>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-destructive mb-2">
                    {activeEvent.title}
                  </h2>
                  <p className="text-destructive/70 text-lg">
                    {activeEvent.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-destructive/10 rounded-lg p-4 border border-destructive/20">
                <span className="text-sm text-destructive/60 font-semibold">Elapsed Time</span>
                <span className="font-mono font-bold text-destructive text-lg">
                  {Math.floor(currentTime / 60)}m {(currentTime % 60).toString().padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '100ms' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-4 rounded-lg font-semibold gap-2 flex items-center transition-all duration-300 ${
              isRunning
                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50'
                : 'glass-effect text-primary border border-primary/50 hover:border-primary hover:bg-primary/10'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start Simulation
              </>
            )}
          </button>
          <button
            onClick={() => {
              setCurrentTime(0)
              setIsRunning(false)
            }}
            className="px-8 py-4 glass-effect text-foreground rounded-lg font-semibold gap-2 flex items-center transition-all duration-300 hover:border-accent border border-border/50 hover:bg-accent/10"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        <div className="glass-effect rounded-2xl p-8 border border-primary/30 glow-effect animate-slide-in-up" style={{ animationDelay: '150ms' }}>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-muted-foreground">Simulation Progress</span>
              <span className="font-mono text-primary font-bold text-lg">
                {Math.floor((currentTime / maxTime) * 100)}%
              </span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-4 overflow-hidden border border-primary/20">
              <div
                className="bg-gradient-to-r from-primary via-accent to-cyan-400 h-full rounded-full transition-all duration-300 shadow-lg shadow-primary/50"
                style={{ width: `${(currentTime / maxTime) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl font-bold text-foreground">Timeline Events</h2>
          <div className="space-y-3">
            {events.map((event, idx) => {
              const isPast = currentTime >= event.time
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                    isPast
                      ? 'glass-effect border-primary/50 bg-primary/10'
                      : 'glass-effect border-border/50 hover:border-primary'
                  } ${
                    selectedEvent?.id === event.id
                      ? 'ring-2 ring-primary shadow-lg shadow-primary/30'
                      : ''
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl mt-1 ${isPast ? 'animate-float' : ''}`}>{event.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg text-foreground">
                          {event.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            event.impact === 'critical'
                              ? 'bg-destructive/20 text-destructive'
                              : 'bg-accent/20 text-accent'
                          }`}
                        >
                          {event.impact.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      <span className="text-xs text-primary font-mono font-bold">
                        {event.time}s
                      </span>
                    </div>
                    {isPast && (
                      <div className="text-green-400 text-lg font-bold animate-pulse">✓</div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {selectedEvent && (
          <div className="glass-effect rounded-2xl p-8 border border-primary/30 glow-effect animate-slide-in-up space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-6xl animate-float">{selectedEvent.icon}</span>
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {selectedEvent.title}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 border-t border-primary/20 pt-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Impact Level
                </p>
                <div className="flex gap-2">
                  {Array.from({ length: selectedEvent.impact === 'critical' ? 3 : 2 }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg glow-effect"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    )
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Satellite Role
                </p>
                <p className="text-foreground font-semibold leading-relaxed">
                  {selectedEvent.impact === 'critical'
                    ? 'Critical for real-time coordination and emergency response'
                    : 'Provides essential data transmission and monitoring capabilities'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6 animate-slide-in-up" style={{ animationDelay: '250ms' }}>
          <div className="glass-effect border border-primary/30 rounded-2xl p-6 text-center glow-effect">
            <p className="text-4xl font-bold gradient-text mb-3">
              {Math.floor((currentTime / maxTime) * 1000)}
            </p>
            <p className="text-sm font-semibold text-muted-foreground">Lives Potentially Saved</p>
          </div>
          <div className="glass-effect border border-accent/30 rounded-2xl p-6 text-center glow-effect">
            <p className="text-4xl font-bold text-accent mb-3">
              {Math.floor((currentTime / maxTime) * 98)}%
            </p>
            <p className="text-sm font-semibold text-muted-foreground">Coverage Enabled</p>
          </div>
          <div className="glass-effect border border-primary/30 rounded-2xl p-6 text-center glow-effect">
            <p className={`text-4xl font-bold mb-3 ${currentTime < 60 ? 'text-destructive' : 'text-green-400'}`}>
              {currentTime < 60 ? 'Disabled' : 'Active'}
            </p>
            <p className="text-sm font-semibold text-muted-foreground">Communication</p>
          </div>
        </div>
      </div>
    </main>
  )
}
