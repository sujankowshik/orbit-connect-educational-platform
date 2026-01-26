'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Users, TrendingUp } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  date: string
  location: string
  type: string
  impact: number
  description: string
  satelliteRole: string
  outcome: string
  lives: number
  icon: string
}

export default function DisasterCases() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)

  const cases: CaseStudy[] = [
    {
      id: '1',
      title: '2015 Nepal Earthquake',
      date: 'April 25, 2015',
      location: 'Kathmandu, Nepal',
      type: 'Earthquake',
      impact: 8,
      description:
        'A devastating 7.8 magnitude earthquake destroyed infrastructure across Nepal.',
      satelliteRole:
        'Satellite phones provided the only communication after ground networks collapsed. Relief organizations coordinated rescue operations across remote villages.',
      outcome:
        'Enabled coordination of rescue efforts that saved thousands of lives in isolated regions.',
      lives: 8800,
      icon: '🌍',
    },
    {
      id: '2',
      title: '2017 Hurricane Maria',
      date: 'September 20, 2017',
      location: 'Puerto Rico',
      type: 'Hurricane',
      impact: 9,
      description:
        'Category 5 hurricane caused widespread infrastructure destruction across Puerto Rico.',
      satelliteRole:
        'Satellite internet and phones were critical when 99% of cell towers were destroyed. First responders used satellite communication to coordinate relief efforts.',
      outcome:
        'Enabled emergency response teams to coordinate rescue and medical operations.',
      lives: 3000,
      icon: '🌪️',
    },
    {
      id: '3',
      title: '2004 Indian Ocean Tsunami',
      date: 'December 26, 2004',
      location: 'Southeast Asia',
      type: 'Tsunami',
      impact: 10,
      description:
        'Massive tsunami devastated coastal communities across 14 countries.',
      satelliteRole:
        'Satellite communications were vital for coordinating international relief efforts across multiple affected nations and remote island communities.',
      outcome:
        'Facilitated unprecedented international coordination of disaster relief.',
      lives: 35000,
      icon: '🌊',
    },
    {
      id: '4',
      title: '2018 Indonesia Earthquake & Tsunami',
      date: 'September 28, 2018',
      location: 'Sulawesi, Indonesia',
      type: 'Earthquake & Tsunami',
      impact: 8,
      description:
        '7.5 magnitude earthquake triggered tsunami affecting coastal towns.',
      satelliteRole:
        'Satellite networks provided communication for NGOs, medical teams, and affected communities in remote areas.',
      outcome:
        'Enabled rapid medical response and supply distribution to affected areas.',
      lives: 4000,
      icon: '⛰️',
    },
    {
      id: '5',
      title: '2019 Mozambique Cyclone Idai',
      date: 'March 15, 2019',
      location: 'Mozambique, Zimbabwe, Malawi',
      type: 'Cyclone',
      impact: 8,
      description:
        'Severe cyclone caused flooding across three southern African countries.',
      satelliteRole:
        'Satellite communication allowed NGOs to coordinate relief distribution and communicate status updates across the region.',
      outcome:
        'Coordinated relief efforts that prevented disease outbreaks and provided humanitarian aid.',
      lives: 2000,
      icon: '💨',
    },
    {
      id: '6',
      title: '2020 Australia Bushfires',
      date: 'January 2020',
      location: 'Eastern Australia',
      type: 'Wildfire',
      impact: 9,
      description:
        'Massive bushfires burned millions of acres, destroying towns and infrastructure.',
      satelliteRole:
        'Satellite networks provided communication in remote fire-affected areas where ground infrastructure was destroyed.',
      outcome:
        'Enabled evacuation coordination and real-time fire monitoring.',
      lives: 1500,
      icon: '🔥',
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-4 mb-10 animate-slide-in-up">
          <div className="inline-block px-4 py-2 rounded-full glass-effect text-primary text-sm font-semibold">
            Real-World Impact
          </div>
          <h1 className="text-5xl font-bold gradient-text">
            Disaster Case Studies
          </h1>
          <p className="text-lg text-muted-foreground">
            How satellite communication saved lives during actual disasters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Case List */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 border border-primary/30 space-y-4 sticky top-24 max-h-[calc(100vh-200px)] overflow-y-auto">
              <h2 className="text-xl font-bold text-foreground">Case Studies</h2>
              {cases.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 animate-slide-in-up ${
                    selectedCase?.id === c.id
                      ? 'glass-effect border-primary/80 bg-primary/20 glow-effect'
                      : 'glass-effect border-border/50 hover:border-primary'
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{c.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm text-foreground">
                        {c.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{c.type}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: Math.ceil(c.impact / 3) }).map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-primary rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Case Details */}
          {selectedCase && (
            <div className="lg:col-span-2 space-y-6 animate-slide-in-up">
              <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
                <div className="flex items-start gap-6 mb-8">
                  <span className="text-7xl">{selectedCase.icon}</span>
                  <div>
                    <h2 className="text-4xl font-bold text-foreground mb-3">
                      {selectedCase.title}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold">
                        {selectedCase.type}
                      </span>
                      <span className="px-4 py-2 rounded-full bg-destructive/20 text-destructive text-sm font-bold">
                        Impact: {selectedCase.impact}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-primary/20">
                  <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                    <Calendar className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground font-semibold">Date</p>
                    <p className="text-sm text-foreground font-bold mt-1">{selectedCase.date}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                    <MapPin className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground font-semibold">Location</p>
                    <p className="text-sm text-foreground font-bold mt-1">{selectedCase.location}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-accent/20">
                    <Users className="w-5 h-5 text-accent mb-2" />
                    <p className="text-xs text-muted-foreground font-semibold">Lives Saved</p>
                    <p className="text-sm text-accent font-bold mt-1">{selectedCase.lives.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-3">Event Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCase.description}
                    </p>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                    <h3 className="font-bold text-lg text-primary mb-3">Satellite Communication Role</h3>
                    <p className="text-foreground leading-relaxed">
                      {selectedCase.satelliteRole}
                    </p>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
                    <h3 className="font-bold text-lg text-accent mb-3">Outcome & Impact</h3>
                    <p className="text-foreground leading-relaxed">
                      {selectedCase.outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-effect border border-accent/30 rounded-2xl p-8 glow-effect bg-gradient-to-r from-accent/10 to-primary/10">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center glow-effect">
                    <Users className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                      Lives Positively Impacted
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {selectedCase.lives.toLocaleString()}+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No Selection Message */}
          {!selectedCase && (
            <div className="lg:col-span-2 flex items-center justify-center bg-card border border-border rounded-lg p-12 text-center">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">
                  Select a case study to view details
                </p>
                <p className="text-sm text-muted-foreground/60">
                  Learn how satellite technology saved lives during real disasters
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary mb-1">
              {cases.length}
            </p>
            <p className="text-sm text-muted-foreground">Documented Cases</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-accent mb-1">
              {cases.reduce((sum, c) => sum + c.lives, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Lives Positively Impacted</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-foreground mb-1">
              {Math.round(cases.reduce((sum, c) => sum + c.impact, 0) / cases.length)}
              /10
            </p>
            <p className="text-sm text-muted-foreground">Average Impact Level</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary mb-1">6</p>
            <p className="text-sm text-muted-foreground">Global Continents</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
