import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function About() {
  return (
    <main className="min-h-screen pt-16">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 pt-24 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About ORBIT-Connect</h1>
          <p className="text-lg text-muted-foreground">
            An educational platform for understanding space technology and emergency resilience
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hackathon Info */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Student HackPad 2026</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ORBIT-Connect was built for the Student HackPad 2026 hackathon, a platform dedicated to fostering
              innovation and creativity among students. This project directly addresses the hackathon's ORBIT theme by
              exploring how space technology, particularly satellites, connects humanity and enables critical
              communication during times of crisis.
            </p>
          </div>

          {/* ORBIT Theme */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">The ORBIT Theme</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ORBIT stands for connection, movement, and interconnectedness. Satellites literally orbit Earth, and in
              doing so, they connect every corner of our planet. ORBIT-Connect leverages this metaphor to demonstrate
              how orbital infrastructure serves humanity, especially during emergencies when traditional systems fail.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The theme inspired us to focus on the social good aspect of space technology—showing students that careers
              in space science aren't just about exploration, but about solving real-world problems and saving lives.
            </p>
          </div>

          {/* Project Motivation */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-accent mb-4">Project Motivation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We built ORBIT-Connect to bridge the gap between cutting-edge space technology and the general public.
              Many people don't realize how satellites impact their daily lives, and even fewer understand their
              critical role in emergency response.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our goal is to educate students and the public about this vital infrastructure while inspiring the next
              generation of space engineers, programmers, and innovators who will maintain and improve these systems.
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Learning Goals</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Through ORBIT-Connect, we hope visitors will:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Understand the basics of satellite technology and orbital mechanics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Learn how satellites enable emergency communication when other systems fail</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Recognize the importance of space debris mitigation for long-term sustainability</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Explore career opportunities in the space industry</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>Appreciate the global infrastructure that keeps us connected and safe</span>
              </li>
            </ul>
          </div>

          {/* Team Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Team</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Built with passion for space education and emergency resilience at Student HackPad 2026.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded p-4 text-center">
                <p className="text-foreground font-semibold">Your Name Here</p>
                <p className="text-sm text-muted-foreground">Developer</p>
              </div>
              <div className="bg-background border border-border rounded p-4 text-center">
                <p className="text-foreground font-semibold">Your Name Here</p>
                <p className="text-sm text-muted-foreground">Designer</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Ready to Learn More?</h2>
            <p className="text-muted-foreground">
              Explore our pages to dive deeper into satellite technology and emergency communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/satellite-coverage"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                Satellite Coverage
              </a>
              <a
                href="/emergency-mode"
                className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors inline-block"
              >
                Emergency Mode
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
