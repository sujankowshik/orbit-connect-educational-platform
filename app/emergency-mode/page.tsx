import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function EmergencyMode() {
  return (
    <main className="min-h-screen pt-16">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 pt-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">When the Internet Goes Down</h1>
          <p className="text-lg text-muted-foreground">
            How satellite technology enables communication during disasters
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Why Networks Fail */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Why Ground Networks Fail</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              During major disasters like earthquakes, hurricanes, tsunamis, or floods, ground-based communication
              infrastructure—cell towers, fiber-optic cables, power lines—often sustains physical damage or power loss.
              This leaves affected communities isolated exactly when they need to communicate most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Earthquakes:</strong> Damage to infrastructure and power loss
                </p>
              </div>
              <div className="bg-destructive/10 border border-destructive/30 rounded p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Floods:</strong> Water damage to equipment and cables
                </p>
              </div>
              <div className="bg-destructive/10 border border-destructive/30 rounded p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Hurricanes:</strong> Widespread infrastructure destruction
                </p>
              </div>
              <div className="bg-destructive/10 border border-destructive/30 rounded p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Wildfires:</strong> Tower destruction and power outages
                </p>
              </div>
            </div>
          </div>

          {/* Satellite Phone */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-accent mb-4">Satellite Phones</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Satellite phones communicate directly with orbiting satellites, bypassing ground infrastructure entirely.
              They work anywhere on Earth—no cell towers needed. During emergencies, relief organizations, first
              responders, and affected communities use satellite phones to:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Coordinate rescue operations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Call for medical assistance</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Request food, water, and supplies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Inform loved ones they're safe</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Report critical infrastructure damage</span>
              </li>
            </ul>
          </div>

          {/* Emergency Radio Signals */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Emergency Radio Signals</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Emergency responders use satellite-based radio systems to communicate when local networks are down. These
              specialized systems transmit emergency signals via satellite, ensuring critical information reaches rescue
              teams and coordination centers.
            </p>
          </div>

          {/* GPS Coordination */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-accent mb-4">GPS-Based Coordination</h2>
            <p className="text-muted-foreground leading-relaxed">
              GPS satellites provide precise location data independent of ground networks. During disasters, GPS helps
              rescue teams navigate damaged areas, locate stranded individuals, track relief supply distribution, and
              coordinate emergency response efforts with accuracy and efficiency.
            </p>
          </div>

          {/* Step-by-Step Guidance */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Emergency Communication Guide</h2>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Assess Your Situation",
                  desc: "If ground networks are unavailable, satellite communication is your lifeline.",
                },
                {
                  step: "2",
                  title: "Locate a Satellite Phone",
                  desc: "Look for emergency shelters, relief organizations, or hospitals that have satellite communication devices.",
                },
                {
                  step: "3",
                  title: "Prioritize Critical Calls",
                  desc: "Make essential calls for medical help, rescue, or to inform loved ones of safety. Keep calls brief.",
                },
                {
                  step: "4",
                  title: "Use Emergency Services",
                  desc: "Contact local authorities, emergency response teams, or international relief organizations.",
                },
                {
                  step: "5",
                  title: "Share Your Location",
                  desc: "Use GPS coordinates if you're stranded to help rescue teams locate you.",
                },
                {
                  step: "6",
                  title: "Stay Calm and Informed",
                  desc: "Listen to satellite radio broadcasts for emergency updates and instructions.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
