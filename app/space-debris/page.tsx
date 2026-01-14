import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function SpaceDebris() {
  return (
    <main className="min-h-screen pt-16">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 pt-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Space Debris</h1>
          <p className="text-lg text-muted-foreground">The hidden threat to our orbital infrastructure</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* What is Space Debris */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">What is Space Debris?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Space debris consists of defunct satellites, rocket stages, collision fragments, and other discarded
              objects orbiting Earth. It might sound harmless, but at orbital speeds—up to 28,000 km/h—even tiny pieces
              become dangerous projectiles.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently, there are millions of debris pieces in orbit. Most are too small to track with ground-based
              radar, making them invisible threats to active satellites and spacecraft.
            </p>
          </div>

          {/* Why It's Dangerous */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">Why It's Dangerous</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At orbital velocities, even a 1-centimeter piece of debris can destroy a satellite. A collision creates
              more debris, which can hit other satellites, creating even more debris in a cascade effect called Kessler
              Syndrome.
            </p>
            <div className="bg-background border border-border rounded p-4 mt-4">
              <p className="text-sm text-muted-foreground font-mono">
                A 10-cm debris piece = kinetic energy equivalent to a small bomb
              </p>
            </div>
          </div>

          {/* The Cascade Effect */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-accent mb-4">The Kessler Syndrome</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If debris collision cascades spiral out of control, it could make certain orbital altitudes unusable for
              generations. This would devastate emergency communication, weather forecasting, GPS, and countless other
              services humanity depends on.
            </p>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>
                <strong>The Chain Reaction:</strong>
              </p>
              <p className="ml-4">
                Debris hits satellite → creates 100s of pieces → these hit other satellites → creates 1000s of pieces →
                renders entire orbit zones unusable
              </p>
            </div>
          </div>

          {/* How Debris Affects Communication */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Impact on Global Communication</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Satellite damage from debris doesn't just affect space—it impacts Earth. Loss of communication satellites
              means:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-destructive font-bold min-w-fit">Emergency Services:</span>
                <span>Reduced ability to coordinate disaster response</span>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold min-w-fit">Weather Forecasting:</span>
                <span>Worse hurricane and storm predictions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold min-w-fit">GPS Navigation:</span>
                <span>Aircraft, ships, and rescue operations would struggle</span>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold min-w-fit">Remote Connectivity:</span>
                <span>Billions without internet or emergency communication</span>
              </li>
            </ul>
          </div>

          {/* Sustainable Orbits */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Creating Clean and Sustainable Orbits</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The solution requires responsibility from space agencies and companies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded p-4">
                <h3 className="font-semibold text-foreground mb-2">Responsible Launches</h3>
                <p className="text-sm text-muted-foreground">
                  Design satellites to de-orbit at end-of-life, limiting debris creation
                </p>
              </div>
              <div className="bg-background border border-border rounded p-4">
                <h3 className="font-semibold text-foreground mb-2">Debris Tracking</h3>
                <p className="text-sm text-muted-foreground">Improve monitoring and collision avoidance maneuvers</p>
              </div>
              <div className="bg-background border border-border rounded p-4">
                <h3 className="font-semibold text-foreground mb-2">Active Removal</h3>
                <p className="text-sm text-muted-foreground">
                  Develop technology to capture and safely remove large debris
                </p>
              </div>
              <div className="bg-background border border-border rounded p-4">
                <h3 className="font-semibold text-foreground mb-2">International Standards</h3>
                <p className="text-sm text-muted-foreground">Enforce debris mitigation guidelines globally</p>
              </div>
            </div>
          </div>

          {/* Educational Takeaway */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-accent mb-4">Why This Matters for Emergency Communication</h2>
            <p className="text-muted-foreground leading-relaxed">
              Satellites are humanity's backup communication system during emergencies. If we lose them to debris
              cascades, we lose one of our most critical tools for saving lives during disasters. Protecting Earth's
              orbital environment is protecting our future resilience.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
