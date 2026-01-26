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
      <div className="h-screen flex gap-6 p-6">
        {/* 3D Scene */}
        <div className="flex-1 bg-card rounded-lg overflow-hidden border border-border">
          <SatelliteScene
            satellites={satellites}
            selectedSatellite={selectedSatellite}
            onSelectSatellite={setSelectedSatellite}
          />
        </div>

        {/* Info Panel */}
        <div className="w-80 space-y-6 overflow-y-auto">
          {/* Active Satellites */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Active Satellites
            </h2>
            <div className="space-y-3">
              {satellites.map((sat) => (
                <button
                  key={sat.id}
                  onClick={() => setSelectedSatellite(sat)}
                  className={`w-full text-left p-3 rounded-lg transition-all border ${
                    selectedSatellite?.id === sat.id
                      ? 'bg-primary/20 border-primary'
                      : 'bg-background border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sat.color }}
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {sat.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sat.orbitalHeight.toFixed(2)}km
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Satellite Details */}
          {selectedSatellite && (
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">
                {selectedSatellite.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Orbital Height
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    {(selectedSatellite.orbitalHeight * 400).toFixed(0)} km
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Coverage Area
                  </p>
                  <p className="text-lg font-semibold text-accent">
                    {(selectedSatellite.coverage * 1000).toFixed(0)} km²
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Signal Strength
                  </p>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${Math.random() * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This satellite provides global coverage with
                  low-latency connectivity for emergency
                  communications and disaster response.
                </p>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Global Coverage
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Coverage %
                  </span>
                  <span className="text-primary font-semibold">94%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-11/12" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Latency
                  </span>
                  <span className="text-accent font-semibold">
                    45ms
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
