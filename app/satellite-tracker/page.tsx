'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface Satellite {
  id: string
  name: string
  position: [number, number, number]
  orbitalHeight: number
  speed: number
  coverage: number
  color: string
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0001
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#1a3a52"
        emissive="#0a1f2e"
        metalness={0.3}
        roughness={0.8}
      />
    </mesh>
  )
}

function SatelliteObject({
  satellite,
  onHover,
}: {
  satellite: Satellite
  onHover: (sat: Satellite | null) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const orbitRef = useRef<THREE.LineSegments>(null)

  useFrame(() => {
    if (groupRef.current) {
      const angle =
        (Date.now() * 0.0001) % (Math.PI * 2)
      const radius = satellite.orbitalHeight
      groupRef.current.position.x = Math.cos(angle) * radius
      groupRef.current.position.z = Math.sin(angle) * radius
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        onPointerEnter={() => onHover(satellite)}
        onPointerLeave={() => onHover(null)}
        castShadow
      >
        <octahedronGeometry args={[0.08, 2]} />
        <meshStandardMaterial
          color={satellite.color}
          emissive={satellite.color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <pointLight
        color={satellite.color}
        intensity={1}
        distance={0.5}
      />
    </group>
  )
}

function SatelliteScene({
  satellites,
  selectedSatellite,
  onSelectSatellite,
}: {
  satellites: Satellite[]
  selectedSatellite: Satellite | null
  onSelectSatellite: (sat: Satellite) => void
}) {
  const [hoveredSatellite, setHoveredSatellite] =
    useState<Satellite | null>(null)

  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <PerspectiveCamera makeDefault position={[0, 2.5, 3]} />
      <OrbitControls />
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <Earth />

      {satellites.map((satellite) => (
        <SatelliteObject
          key={satellite.id}
          satellite={satellite}
          onHover={setHoveredSatellite}
        />
      ))}

      {hoveredSatellite && (
        <group position={hoveredSatellite.position}>
          <mesh>
            <sphereGeometry args={[hoveredSatellite.coverage, 16, 16]} />
            <meshBasicMaterial
              color={hoveredSatellite.color}
              transparent
              opacity={0.1}
            />
          </mesh>
        </group>
      )}
    </Canvas>
  )
}

export default function SatelliteTracker() {
  const [selectedSatellite, setSelectedSatellite] =
    useState<Satellite | null>(null)

  const satellites: Satellite[] = [
    {
      id: '1',
      name: 'Starlink-1521',
      position: [0.5, 0.2, 0.8],
      orbitalHeight: 1.55,
      speed: 0.001,
      coverage: 0.4,
      color: '#00d9ff',
    },
    {
      id: '2',
      name: 'Kuiper-50',
      position: [-0.6, 0.3, 0.5],
      orbitalHeight: 1.7,
      speed: 0.0015,
      coverage: 0.45,
      color: '#0099ff',
    },
    {
      id: '3',
      name: 'Telesat-45',
      position: [0.4, -0.2, -0.7],
      orbitalHeight: 1.65,
      speed: 0.0012,
      coverage: 0.42,
      color: '#00ffcc',
    },
    {
      id: '4',
      name: 'ISS-001',
      position: [-0.3, 0.4, -0.6],
      orbitalHeight: 1.42,
      speed: 0.002,
      coverage: 0.35,
      color: '#ff00ff',
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="h-[calc(100vh-5rem)] flex gap-6 p-6">
        {/* 3D Scene */}
        <div className="flex-1 glass-effect rounded-2xl overflow-hidden glow-effect border-2 border-primary/30">
          <SatelliteScene
            satellites={satellites}
            selectedSatellite={selectedSatellite}
            onSelectSatellite={setSelectedSatellite}
          />
        </div>

        {/* Info Panel */}
        <div className="w-96 space-y-5 overflow-y-auto pr-2 scrollbar-hide">
          {/* Header */}
          <div className="glass-effect rounded-2xl p-6 border border-primary/30 animate-slide-in-up">
            <h1 className="text-2xl font-bold gradient-text mb-2">Live Satellite Tracker</h1>
            <p className="text-sm text-muted-foreground">Real-time orbital tracking</p>
          </div>

          {/* Active Satellites */}
          <div className="glass-effect rounded-2xl p-6 border border-primary/30 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Active Satellites
            </h2>
            <div className="space-y-3">
              {satellites.map((sat) => (
                <button
                  key={sat.id}
                  onClick={() => setSelectedSatellite(sat)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 border backdrop-blur-sm ${
                    selectedSatellite?.id === sat.id
                      ? 'bg-primary/20 border-primary shadow-lg shadow-primary/30 transform scale-105'
                      : 'glass-effect border-border/50 hover:border-primary hover:bg-primary/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shadow-lg animate-pulse"
                      style={{ backgroundColor: sat.color, boxShadow: `0 0 10px ${sat.color}` }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">
                        {sat.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sat.orbitalHeight.toFixed(2)}km
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">Active</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Satellite Details */}
          {selectedSatellite && (
            <div className="glass-effect rounded-2xl p-6 border border-primary/30 glow-effect animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedSatellite.color, boxShadow: `0 0 15px ${selectedSatellite.color}` }}
                />
                <h3 className="text-lg font-bold text-foreground">
                  {selectedSatellite.name}
                </h3>
              </div>
              <div className="space-y-5">
                <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Orbital Height
                  </p>
                  <p className="text-2xl font-bold gradient-text">
                    {(selectedSatellite.orbitalHeight * 400).toFixed(0)} <span className="text-sm text-muted-foreground">km</span>
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-4 border border-accent/20">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Coverage Area
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {(selectedSatellite.coverage * 1000).toFixed(0)} <span className="text-sm text-muted-foreground">km²</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Signal Strength
                  </p>
                  <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden border border-primary/20">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${80 + Math.sin(Date.now() / 1000) * 20}%`,
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed bg-background/30 rounded-lg p-3 border border-border/50">
                  <span className="font-semibold text-primary">Global Coverage</span><br/>
                  This satellite provides low-latency connectivity for emergency communications and disaster response.
                </p>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="glass-effect rounded-2xl p-6 border border-primary/30 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg font-bold text-foreground mb-6">Global Coverage</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground font-semibold">Coverage</span>
                  <span className="text-primary font-bold">94%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden border border-primary/20">
                  <div className="bg-gradient-to-r from-primary to-cyan-400 h-2 rounded-full w-11/12" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground font-semibold">Latency</span>
                  <span className="text-accent font-bold">45ms</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden border border-accent/20">
                  <div className="bg-gradient-to-r from-accent to-cyan-300 h-2 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
