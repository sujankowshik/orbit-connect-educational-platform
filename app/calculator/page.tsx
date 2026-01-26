'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Cost-Benefit Calculator
          </h1>
          <p className="text-muted-foreground">
            Compare traditional vs. satellite communication infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <Card className="bg-card border-border p-6 lg:col-span-1">
            <h2 className="text-xl font-bold text-foreground mb-6">Scenario Setup</h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Region Type
                </label>
                <div className="flex gap-2">
                  {['rural', 'urban', 'developing'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`flex-1 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                        region === r
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border text-foreground hover:border-primary'
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
          </Card>

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
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-border)`,
                  color: 'var(--color-foreground)',
                }}
              />
              <Legend />
              <Bar dataKey="Traditional" fill="var(--color-muted)" />
              <Bar dataKey="Satellite" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Key Findings</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">
                Satellite systems cost {Math.round(((costs.satelliteSetup / costs.traditionalSetup - 1) * 100) * -1)}% less to set up
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">
                Annual maintenance savings: ${(costs.annualMaintenanceTraditional - costs.annualMaintenanceSatellite).toLocaleString()}
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">
                Potential disaster loss reduction: ${costs.satelliteLossReduction.toLocaleString()}
              </span>
            </li>
            <li className="flex gap-3 text-sm">
              <span className="text-primary font-bold">✓</span>
              <span className="text-muted-foreground">
                5-year ROI: {costs.roi}%
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </main>
  )
}
