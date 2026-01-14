export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">ORBIT-Connect</h3>
            <p className="text-sm text-muted-foreground">
              Connecting humanity through space technology during emergencies.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/satellite-coverage" className="hover:text-primary transition-colors">
                  Satellite Coverage
                </a>
              </li>
              <li>
                <a href="/emergency-mode" className="hover:text-primary transition-colors">
                  Emergency Mode
                </a>
              </li>
              <li>
                <a href="/space-debris" className="hover:text-primary transition-colors">
                  Space Debris
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">About</h4>
            <p className="text-sm text-muted-foreground">
              Built for Student HackPad 2026 with the ORBIT theme, focusing on how satellite technology helps humanity
              during emergencies.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 ORBIT-Connect. All rights reserved. Built with passion for space education.
          </p>
        </div>
      </div>
    </footer>
  )
}
