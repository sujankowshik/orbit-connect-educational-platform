import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function SatelliteCoverage() {
  return (
    <main className="min-h-screen pt-16">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 pt-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Satellite Coverage</h1>
          <p className="text-lg text-muted-foreground">
            Understanding how satellites orbit Earth and enable global communication
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* What are Satellites */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">What Are Satellites?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Satellites are human-made objects that orbit Earth in space. They transmit and receive signals from ground
              stations, enabling communication across vast distances. Unlike ground-based infrastructure, satellites can
              blanket entire continents and reach areas where building traditional networks is impossible or
              impractical.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, thousands of satellites orbit Earth, serving purposes from weather forecasting and GPS navigation
              to internet connectivity and scientific research.
            </p>
          </div>

          {/* How Orbits Work */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-accent mb-4">How Satellite Orbits Work</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Satellites maintain their position by balancing gravitational pull with their orbital velocity. Different
              altitudes create different orbital characteristics:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold min-w-fit">Low Earth Orbit (LEO):</span>
                <span>
                  200-2000 km altitude. Fast-moving satellites that complete orbits in 90 minutes. Great for detailed
                  observation and low-latency communication.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold min-w-fit">Medium Earth Orbit (MEO):</span>
                <span>2000-35,786 km altitude. GPS satellites operate here, balancing coverage and latency.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold min-w-fit">Geostationary Orbit (GEO):</span>
                <span>
                  35,786 km altitude. Satellites remain fixed above one location. Perfect for continuous coverage of
                  specific regions.
                </span>
              </li>
            </ul>
          </div>

          {/* Communication Beyond Earth */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Communication Beyond Earth</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Satellites communicate by receiving signals from ground stations (transmitters), processing them, and
              retransmitting to other ground stations across the globe. This happens at the speed of light, enabling
              instant global communication.
            </p>
            <div className="bg-background border border-border rounded p-4 mt-4">
              <p className="text-sm text-muted-foreground font-mono">
                Ground Station A → (Radio Signal) → Satellite → (Radio Signal) → Ground Station B
              </p>
            </div>
          </div>

          {/* Global Coverage */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Achieving Global Coverage</h2>
            <p className="text-muted-foreground leading-relaxed">
              To cover the entire planet, satellite systems use constellations—multiple satellites working together in
              coordinated orbits. When one satellite moves out of range, another takes over seamlessly. This ensures
              continuous, reliable coverage across all oceans, mountains, and remote regions where traditional
              infrastructure is unavailable.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
