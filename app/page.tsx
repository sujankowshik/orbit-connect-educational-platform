import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '-1s' }}></div>
          <div className="absolute inset-0 animate-shimmer opacity-30"></div>
        </div>

        {/* Animated stars */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/60 animate-pulse-glow"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-3xl text-center space-y-8 animate-slide-in-up">
          <div className="space-y-3">
            <div className="inline-block px-4 py-2 rounded-full glass-effect text-primary text-sm font-semibold">
              Revolutionary Satellite Technology
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              <span className="gradient-text">ORBIT</span>-Connect
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">
              Connecting humanity through space technology
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
            <div className="glass-effect rounded-xl p-8 glow-effect card-hover">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-primary font-bold text-lg mb-3">The Problem</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When disasters strike, ground communication systems often fail, leaving communities isolated and unable to coordinate rescue efforts.
              </p>
            </div>
            <div className="glass-effect rounded-xl p-8 glow-effect card-hover">
              <div className="text-2xl mb-3">📡</div>
              <h3 className="text-accent font-bold text-lg mb-3">The Solution</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Satellites provide reliable, global communication that works when everything else fails, potentially saving lives.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/satellite-tracker"
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              Launch Tracker
            </Link>
            <Link
              href="/emergency-mode"
              className="px-8 py-4 glass-effect text-primary rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 border border-primary/50"
            >
              Run Simulation
            </Link>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Why This Matters</h2>
            <p className="text-lg text-muted-foreground">How satellite technology is transforming emergency response</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌐",
                title: "Global Reach",
                desc: "Satellites cover 100% of Earth's surface, even remote areas without infrastructure.",
                stat: "100%"
              },
              {
                icon: "⚡",
                title: "Reliability",
                desc: "Unlike ground networks, satellites remain operational regardless of natural disasters.",
                stat: "99.9%"
              },
              {
                icon: "🚀",
                title: "Speed",
                desc: "Emergency response times improve dramatically with reliable communication.",
                stat: "24/7"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-effect rounded-xl p-8 card-hover glow-effect group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3">{item.stat}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">Explore Our Platform</h2>
            <p className="text-lg text-muted-foreground">All-in-one educational and simulation tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "3D Satellite Tracker",
                desc: "Real-time visualization of satellite networks with live position tracking",
                link: "/satellite-tracker",
                icon: "🛰️",
                color: "from-primary"
              },
              {
                title: "Emergency Simulation",
                desc: "Interactive timeline showing disaster response with satellite communication",
                link: "/emergency-mode",
                icon: "🚨",
                color: "from-destructive"
              },
              {
                title: "Disaster Case Studies",
                desc: "Real-world examples of how satellites saved lives during actual disasters",
                link: "/disaster-cases",
                icon: "📚",
                color: "from-accent"
              },
              {
                title: "Cost-Benefit Calculator",
                desc: "Compare satellite vs. traditional communication infrastructure costs",
                link: "/calculator",
                icon: "💰",
                color: "from-primary"
              },
              {
                title: "Educational Quizzes",
                desc: "Learn about satellite technology and earn certification badges",
                link: "/learn",
                icon: "🎓",
                color: "from-accent"
              },
              {
                title: "Community Hub",
                desc: "Share and discover stories from satellite technology users worldwide",
                link: "/community",
                icon: "🌐",
                color: "from-primary"
              },
              {
                title: "API Dashboard",
                desc: "Real-time satellite data and integration endpoints for developers",
                link: "/api-dashboard",
                icon: "📡",
                color: "from-accent"
              },
              {
                title: "Satellite Coverage",
                desc: "Global coverage maps showing satellite constellation reach",
                link: "/satellite-coverage",
                icon: "🗺️",
                color: "from-primary"
              },
              {
                title: "Accessibility",
                desc: "Inclusive features for all users - multi-language, high contrast, screen readers",
                link: "/accessibility",
                icon: "♿",
                color: "from-accent"
              },
            ].map((feature, i) => (
              <Link
                key={i}
                href={feature.link}
                className="group relative glass-effect rounded-xl overflow-hidden glow-effect card-hover"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative p-8 space-y-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                    <span className="text-sm text-primary font-semibold">Explore</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
