import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background stars effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-1 h-1 bg-primary rounded-full"></div>
          <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-accent rounded-full"></div>
          <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-primary rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-accent rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-3xl text-center space-y-6 animate-in fade-in duration-1000">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
            <span className="text-primary">ORBIT</span>-Connect
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground text-pretty">
            Connecting humanity through space technology
          </p>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
            <div className="bg-card/50 border border-border rounded-lg p-6 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <h3 className="text-primary font-bold mb-2">The Problem</h3>
              <p className="text-sm text-muted-foreground">
                When disasters strike, ground communication systems often fail, leaving communities isolated and unable
                to coordinate rescue efforts or access critical information.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <h3 className="text-accent font-bold mb-2">The Solution</h3>
              <p className="text-sm text-muted-foreground">
                Satellites provide reliable, global communication infrastructure that works when everything else fails,
                enabling emergency coordination and potentially saving lives.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/satellite-tracker"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
            >
              Launch Tracker
            </Link>
            <Link
              href="/emergency-mode"
              className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors inline-block"
            >
              Simulation
            </Link>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-20 px-4 bg-card/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">Why This Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Reach",
                desc: "Satellites cover 100% of Earth's surface, even remote areas without infrastructure.",
              },
              {
                title: "Reliability",
                desc: "Unlike ground networks, satellites remain operational regardless of natural disasters or damage.",
              },
              {
                title: "Speed",
                desc: "Emergency response times improve dramatically with reliable communication channels.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">Explore Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "3D Satellite Tracker",
                desc: "Real-time visualization of satellite networks with live position tracking",
                link: "/satellite-tracker",
                icon: "🛰️",
              },
              {
                title: "Emergency Simulation",
                desc: "Interactive timeline showing disaster response with satellite communication",
                link: "/emergency-mode",
                icon: "🚨",
              },
              {
                title: "Disaster Case Studies",
                desc: "Real-world examples of how satellites saved lives during actual disasters",
                link: "/disaster-cases",
                icon: "📚",
              },
              {
                title: "Cost-Benefit Calculator",
                desc: "Compare satellite vs. traditional communication infrastructure costs",
                link: "/calculator",
                icon: "💰",
              },
              {
                title: "Educational Quizzes",
                desc: "Learn about satellite technology and earn certification badges",
                link: "/learn",
                icon: "🎓",
              },
              {
                title: "Community Hub",
                desc: "Share and discover stories from satellite technology users worldwide",
                link: "/community",
                icon: "🌐",
              },
              {
                title: "API Dashboard",
                desc: "Real-time satellite data and integration endpoints for developers",
                link: "/api-dashboard",
                icon: "📡",
              },
              {
                title: "Satellite Coverage",
                desc: "Global coverage maps showing satellite constellation reach",
                link: "/satellite-coverage",
                icon: "🗺️",
              },
              {
                title: "Accessibility",
                desc: "Inclusive features for all users - multi-language, high contrast, screen readers",
                link: "/accessibility",
                icon: "♿",
              },
            ].map((feature, i) => (
              <Link
                key={i}
                href={feature.link}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary hover:bg-card/80 transition-all"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
