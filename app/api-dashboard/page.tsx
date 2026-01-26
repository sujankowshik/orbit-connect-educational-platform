'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Radio, Satellite, MapPin } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface SatelliteData {
  id: string
  name: string
  altitude: number
  latitude: number
  longitude: number
  velocity: number
  status: 'active' | 'inactive'
  lastUpdate: string
}

interface HistoricalData {
  time: string
  coverage: number
  latency: number
  signalStrength: number
}

export default function ApiDashboard() {
  const [satellites, setSatellites] = useState<SatelliteData[]>([])
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [selectedSat, setSelectedSat] = useState<SatelliteData | null>(null)

  useEffect(() => {
    // Simulate real-time satellite data
    const mockSatellites: SatelliteData[] = [
      {
        id: 'starlink-1521',
        name: 'Starlink-1521',
        altitude: 550,
        latitude: 45.2,
        longitude: -122.6,
        velocity: 27600,
        status: 'active',
        lastUpdate: new Date().toISOString(),
      },
      {
        id: 'kuiper-50',
        name: 'Kuiper-50',
        altitude: 630,
        latitude: -33.9,
        longitude: 18.4,
        velocity: 27300,
        status: 'active',
        lastUpdate: new Date().toISOString(),
      },
      {
        id: 'iss-001',
        name: 'ISS-001',
        altitude: 408,
        latitude: 51.6,
        longitude: 0.0,
        velocity: 27600,
        status: 'active',
        lastUpdate: new Date().toISOString(),
      },
      {
        id: 'telesat-45',
        name: 'Telesat-45',
        altitude: 1200,
        latitude: 0.0,
        longitude: 0.0,
        velocity: 26000,
        status: 'active',
        lastUpdate: new Date().toISOString(),
      },
    ]

    setSatellites(mockSatellites)
    setSelectedSat(mockSatellites[0])

    // Historical data
    const mockHistorical: HistoricalData[] = [
      { time: '00:00', coverage: 85, latency: 45, signalStrength: 88 },
      { time: '04:00', coverage: 89, latency: 42, signalStrength: 91 },
      { time: '08:00', coverage: 92, latency: 38, signalStrength: 94 },
      { time: '12:00', coverage: 94, latency: 35, signalStrength: 96 },
      { time: '16:00', coverage: 91, latency: 40, signalStrength: 93 },
      { time: '20:00', coverage: 87, latency: 44, signalStrength: 89 },
      { time: '24:00', coverage: 85, latency: 45, signalStrength: 88 },
    ]

    setHistoricalData(mockHistorical)
  }, [])

  const activeSatellites = satellites.filter((s) => s.status === 'active').length
  const avgCoverage = historicalData.length
    ? (
        historicalData.reduce((sum, d) => sum + d.coverage, 0) /
        historicalData.length
      ).toFixed(1)
    : 0
  const avgLatency = historicalData.length
    ? (
        historicalData.reduce((sum, d) => sum + d.latency, 0) /
        historicalData.length
      ).toFixed(0)
    : 0

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Real-Time Satellite API Dashboard
          </h1>
          <p className="text-muted-foreground">
            Live tracking and monitoring of satellite networks
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Active Satellites
                </p>
                <p className="text-3xl font-bold text-primary">
                  {activeSatellites}/{satellites.length}
                </p>
              </div>
              <Satellite className="w-8 h-8 text-primary/50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Global Coverage
                </p>
                <p className="text-3xl font-bold text-accent">
                  {avgCoverage}%
                </p>
              </div>
              <Activity className="w-8 h-8 text-accent/50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Avg Latency
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {avgLatency}ms
                </p>
              </div>
              <Radio className="w-8 h-8 text-foreground/50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  System Status
                </p>
                <p className="text-3xl font-bold text-green-500">Operational</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </Card>
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Historical Data Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                24-Hour Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: `1px solid var(--color-border)`,
                      color: 'var(--color-foreground)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="coverage"
                    stroke="var(--color-primary)"
                    dot={false}
                    name="Coverage %"
                  />
                  <Line
                    type="monotone"
                    dataKey="signalStrength"
                    stroke="var(--color-accent)"
                    dot={false}
                    name="Signal %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Satellite List */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              Active Satellites
            </h2>
            {satellites.map((sat) => (
              <button
                key={sat.id}
                onClick={() => setSelectedSat(sat)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedSat?.id === sat.id
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-foreground">
                    {sat.name}
                  </span>
                  <Badge
                    className={
                      sat.status === 'active'
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-red-500/20 text-red-600'
                    }
                  >
                    {sat.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {sat.altitude} km altitude
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Satellite Details */}
        {selectedSat && (
          <Card className="bg-card border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {selectedSat.name} - Detailed Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Orbital Altitude
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {selectedSat.altitude.toLocaleString()} km
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Velocity
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {selectedSat.velocity.toLocaleString()} m/s
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Current Location
                  </p>
                  <div className="flex items-center gap-2 text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>
                      {selectedSat.latitude.toFixed(2)}°,{' '}
                      {selectedSat.longitude.toFixed(2)}°
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Status
                  </p>
                  <Badge
                    className={
                      selectedSat.status === 'active'
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-red-500/20 text-red-600'
                    }
                  >
                    {selectedSat.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Last Update
                  </p>
                  <p className="text-foreground">
                    {new Date(selectedSat.lastUpdate).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Connection Quality
                  </p>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* API Documentation */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            API Integration
          </h2>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Use these endpoints to integrate real-time satellite data into your
              applications:
            </p>
            <div className="bg-background rounded-lg p-4 font-mono text-foreground">
              <p>GET /api/satellites - Get all active satellites</p>
              <p>GET /api/satellites/{'{id}'} - Get satellite details</p>
              <p>GET /api/coverage - Get global coverage data</p>
              <p>GET /api/analytics - Get performance metrics</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
