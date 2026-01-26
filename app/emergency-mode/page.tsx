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
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Emergency Response Simulation
          </h1>
          <p className="text-muted-foreground">
            See how satellite communication enables disaster response
          </p>
        </div>

        {activeEvent && (
          <Card className="bg-destructive/10 border-destructive p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeEvent.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-destructive">
                    {activeEvent.title}
                  </h2>
                  <p className="text-destructive/80">
                    {activeEvent.description}
                  </p>
                </div>
              </div>
              <div className="text-sm text-destructive/60">
                Elapsed Time:{' '}
                <span className="font-mono font-bold">
                  {Math.floor(currentTime / 60)}m{' '}
                  {(currentTime % 60).toString().padStart(2, '0')}s
                </span>
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="gap-2 px-6"
            variant={isRunning ? 'default' : 'outline'}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Simulation
              </>
            )}
          </Button>
          <Button
            onClick={() => {
              setCurrentTime(0)
              setIsRunning(false)
            }}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Simulation Progress</span>
              <span className="font-mono text-primary font-bold">
                {Math.floor((currentTime / maxTime) * 100)}%
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / maxTime) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Timeline Events</h2>
          <div className="space-y-3">
            {events.map((event) => {
              const isPast = currentTime >= event.time
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isPast
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border hover:border-primary'
                  } ${
                    selectedEvent?.id === event.id
                      ? 'ring-2 ring-primary'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-1">{event.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-foreground">
                          {event.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
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
                      <span className="text-xs text-primary font-mono">
                        {event.time}s
                      </span>
                    </div>
                    {isPast && (
                      <div className="text-green-500 text-sm font-bold">✓</div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {selectedEvent && (
          <Card className="bg-card border-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedEvent.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {selectedEvent.title}
                </h3>
                <p className="text-muted-foreground">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  Impact Level
                </p>
                <div className="flex gap-2">
                  {Array.from({ length: selectedEvent.impact === 'critical' ? 3 : 2 }).map(
                    (_, i) => (
                      <div key={i} className="w-8 h-8 bg-primary/30 rounded" />
                    )
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  Satellite Role
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {selectedEvent.impact === 'critical'
                    ? 'Critical for real-time coordination and emergency response'
                    : 'Provides essential data transmission and monitoring capabilities'}
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary mb-2">
              {Math.floor((currentTime / maxTime) * 1000)}
            </p>
            <p className="text-sm text-muted-foreground">Lives Potentially Saved</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-accent mb-2">
              {Math.floor((currentTime / maxTime) * 98)}%
            </p>
            <p className="text-sm text-muted-foreground">Coverage Enabled</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-foreground mb-2">
              {currentTime < 60 ? 'Disabled' : 'Active'}
            </p>
            <p className="text-sm text-muted-foreground">Communication</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
