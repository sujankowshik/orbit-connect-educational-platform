'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, Download, Share2 } from 'lucide-react'

export default function Calculator() {
  const [region, setRegion] = useState('rural')
  const [populationSize, setPopulationSize] = useState(10000)
  const [disasterFrequency, setDisasterFrequency] = useState(1)
  const [coverage, setCoverage] = useState(75)

  const calculateCosts = () => {
    const traditionalCostPerPerson = region === 'rural' ? 500 : 300
    const satelliteCostPerPerson = region === 'rural' ? 150 : 100
    const maintenanceTraditional = populationSize * traditionalCostPerPerson * 0.1
    const maintenanceSatellite = populationSize * satelliteCostPerPerson * 0.08

    const disasterLosses = populationSize * disasterFrequency * 50000
    const satelliteReduction = (disasterLosses * coverage) / 100

    return {
      traditionalSetup: populationSize * traditionalCostPerPerson,
      satelliteSetup: populationSize * satelliteCostPerPerson,
      annualMaintenanceTraditional: maintenanceTraditional,
      annualMaintenanceSatellite: maintenanceSatellite,
      potentialDisasterLosses: disasterLosses,
      satelliteLossReduction: satelliteReduction,
      roi: (
        ((satelliteReduction - (populationSize * satelliteCostPerPerson + maintenanceSatellite * 5)) /
          (populationSize * satelliteCostPerPerson + maintenanceSatellite * 5)) *
        100
      ).toFixed(1),
    }
  }

  const costs = calculateCosts()

  const chartData = [
    {
      name: 'Initial Setup',
      Traditional: costs.traditionalSetup,
      Satellite: costs.satelliteSetup,
    },
    {
      name: 'Annual Maintenance',
      Traditional: costs.annualMaintenanceTraditional,
      Satellite: costs.annualMaintenanceSatellite,
    },
  ]

  const costBreakdown = [
    { name: 'Traditional Setup', value: costs.traditionalSetup, color: '#888888' },
    { name: 'Satellite Setup', value: costs.satelliteSetup, color: '#0ea5e9' },
  ]

  const lossComparisonData = [
    {
      name: 'No Satellite',
      losses: costs.potentialDisasterLosses,
      reduction: 0,
    },
    {
      name: 'With Satellite',
      losses: costs.potentialDisasterLosses - costs.satelliteLossReduction,
      reduction: costs.satelliteLossReduction,
    },
  ]

  const fiveYearProjection = Array.from({ length: 6 }).map((_, i) => ({
    year: i,
    satelliteCost: (costs.satelliteSetup + costs.annualMaintenanceSatellite * i) * 1000,
    traditionalCost: (costs.traditionalSetup + costs.annualMaintenanceTraditional * i) * 1000,
    savings: (costs.traditionalSetup - costs.satelliteSetup) * 1000 + (costs.annualMaintenanceTraditional - costs.annualMaintenanceSatellite) * i * 1000,
  }))

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-4 mb-10 animate-slide-in-up">
          <div className="inline-block px-4 py-2 rounded-full glass-effect text-accent text-sm font-semibold">
            Financial Planning
          </div>
          <h1 className="text-5xl font-bold gradient-text">
            Cost-Benefit Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Compare traditional vs. satellite communication infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="glass-effect border border-primary/30 rounded-2xl p-8 lg:col-span-1 glow-effect sticky top-24 h-fit animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold text-foreground mb-8">Scenario Setup</h2>

            <div className="space-y-8">
              <div>
                <label className="text-sm font-bold text-foreground mb-4 block uppercase tracking-wider">
                  Region Type
                </label>
                <div className="flex gap-3">
                  {['rural', 'urban', 'developing'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-bold transition-all duration-300 ${
                        region === r
                          ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground border-primary shadow-lg shadow-primary/50'
                          : 'glass-effect border-border/50 text-foreground hover:border-primary'
                      }`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Population Size
                </label>
                <Slider
                  value={[populationSize]}
                  onValueChange={(val) => setPopulationSize(val[0])}
                  min={1000}
                  max={1000000}
                  step={1000}
                  className="w-full"
                />
                <p className="text-lg font-bold text-primary mt-2">
                  {(populationSize / 1000).toFixed(0)}K people
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Disasters Per Year
                </label>
                <Slider
                  value={[disasterFrequency]}
                  onValueChange={(val) => setDisasterFrequency(val[0])}
                  min={0}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
                <p className="text-lg font-bold text-accent mt-2">
                  {disasterFrequency.toFixed(1)}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Satellite Coverage Effectiveness
                </label>
                <Slider
                  value={[coverage]}
                  onValueChange={(val) => setCoverage(val[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-lg font-bold text-foreground mt-2">{coverage}%</p>
              </div>

              <Button className="w-full">Recalculate</Button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* ROI Card */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                5-Year ROI
              </h3>
              <p className="text-5xl font-bold text-primary">{costs.roi}%</p>
              <p className="text-sm text-muted-foreground mt-2">
                Satellite system pays for itself through disaster loss reduction
              </p>
            </Card>

            {/* Cost Comparison */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Cost Comparison
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Traditional Setup</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${costs.traditionalSetup.toLocaleString()}
                  </p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                  <p className="text-sm text-muted-foreground mb-1">Satellite Setup</p>
                  <p className="text-2xl font-bold text-primary">
                    ${costs.satelliteSetup.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-primary/10 rounded-lg border border-green-500/30">
                <p className="text-sm text-green-500/80 mb-1">Savings</p>
                <p className="text-xl font-bold text-green-500">
                  ${(costs.traditionalSetup - costs.satelliteSetup).toLocaleString()}
                </p>
              </div>
            </Card>

            {/* Impact */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Disaster Loss Reduction
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Potential Losses</span>
                    <span className="font-bold text-foreground">
                      ${costs.potentialDisasterLosses.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-destructive h-2 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Loss Reduction</span>
                    <span className="font-bold text-green-500">
                      ${costs.satelliteLossReduction.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${coverage}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Tabs for different visualizations */}
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison">Cost Comparison</TabsTrigger>
              <TabsTrigger value="losses">Loss Reduction</TabsTrigger>
              <TabsTrigger value="projection">5-Year Projection</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison">
              <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
                <h3 className="text-lg font-bold text-foreground mb-6">Setup Cost Comparison</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: `1px solid var(--color-border)`,
                        color: 'var(--color-foreground)',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [`$${(value as number).toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Bar dataKey="Traditional" fill="#888888" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Satellite" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="losses">
              <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
                <h3 className="text-lg font-bold text-foreground mb-6">Disaster Loss Reduction</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={lossComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: `1px solid var(--color-border)`,
                        color: 'var(--color-foreground)',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [`$${(value as number).toLocaleString()}`, '']}
                    />
                    <Area type="monotone" dataKey="losses" stackId="1" stroke="#ef4444" fill="#ef4444" opacity={0.6} />
                    <Area type="monotone" dataKey="reduction" stackId="1" stroke="#22c55e" fill="#22c55e" opacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="projection">
              <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
                <h3 className="text-lg font-bold text-foreground mb-6">5-Year Cost Projection</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={fiveYearProjection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="year" stroke="var(--color-muted-foreground)" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: `1px solid var(--color-border)`,
                        color: 'var(--color-foreground)',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [`$${(value as number).toLocaleString()}`, '']}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="satelliteCost" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} name="Satellite Total Cost" />
                    <Line type="monotone" dataKey="traditionalCost" stroke="#888888" strokeWidth={3} dot={{ r: 4 }} name="Traditional Total Cost" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-6">
          <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Key Findings
                </h3>
                <p className="text-muted-foreground">Analysis for {region.toUpperCase()} region with {(populationSize / 1000).toFixed(0)}K population</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const data = JSON.stringify(
                      {
                        region,
                        populationSize,
                        disasterFrequency,
                        coverage,
                        costs,
                      },
                      null,
                      2
                    )
                    const blob = new Blob([data], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `calculator-analysis-${region}-${Date.now()}.json`
                    a.click()
                  }}
                  className="px-4 py-2 glass-effect text-foreground rounded-lg hover:border-primary transition-all border border-border/50"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 glass-effect text-foreground rounded-lg hover:border-primary transition-all border border-border/50">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Setup Cost Savings</p>
                <p className="text-3xl font-bold gradient-text">
                  {Math.round(((costs.satelliteSetup / costs.traditionalSetup - 1) * 100) * -1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">${(costs.traditionalSetup - costs.satelliteSetup).toLocaleString()} saved</p>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-accent/20">
                <p className="text-sm text-muted-foreground mb-2">Annual Maintenance Savings</p>
                <p className="text-3xl font-bold text-accent">
                  ${((costs.annualMaintenanceTraditional - costs.annualMaintenanceSatellite) / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-muted-foreground mt-1">per year</p>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-green-500/20">
                <p className="text-sm text-muted-foreground mb-2">Loss Reduction</p>
                <p className="text-3xl font-bold text-green-500">
                  ${(costs.satelliteLossReduction / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">5-year potential</p>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">5-Year ROI</p>
                <p className="text-3xl font-bold text-primary">{costs.roi}%</p>
                <p className="text-xs text-muted-foreground mt-1">return on investment</p>
              </div>
            </div>
          </div>

          <div className="glass-effect border border-primary/30 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Recommendations</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="text-primary font-bold text-xl mt-1">✓</span>
                <div>
                  <p className="font-semibold text-foreground">Cost Efficiency</p>
                  <p className="text-sm text-muted-foreground">Satellite systems cost {Math.round(((costs.satelliteSetup / costs.traditionalSetup - 1) * 100) * -1)}% less to set up and maintain</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent font-bold text-xl mt-1">✓</span>
                <div>
                  <p className="font-semibold text-foreground">Disaster Resilience</p>
                  <p className="text-sm text-muted-foreground">Potential disaster loss reduction of ${costs.satelliteLossReduction.toLocaleString()} over 5 years</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-primary font-bold text-xl mt-1">✓</span>
                <div>
                  <p className="font-semibold text-foreground">Strong ROI</p>
                  <p className="text-sm text-muted-foreground">Achieves {costs.roi}% ROI within 5 years through savings and loss prevention</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
