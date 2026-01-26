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
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Real Disaster Case Studies
          </h1>
          <p className="text-muted-foreground">
            How satellite communication saved lives during actual disasters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-lg font-bold text-foreground mb-4">Cases</h2>
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedCase?.id === c.id
                    ? 'bg-primary/20 border-primary'
                    : 'bg-card border-border hover:border-primary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {c.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{c.type}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Case Details */}
          {selectedCase && (
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-card border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedCase.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {selectedCase.title}
                      </h2>
                      <Badge variant="outline" className="mt-2">
                        {selectedCase.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {selectedCase.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {selectedCase.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      Impact Level: {selectedCase.impact}/10
                    </span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-border pt-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Event Description
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedCase.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      Satellite Communication Role
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedCase.satelliteRole}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-accent mb-2">
                      Outcome & Impact
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedCase.outcome}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Lives Impacted Positively
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {selectedCase.lives.toLocaleString()}+
                    </p>
                  </div>
                </div>
              </Card>
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
