'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Zap, Loader2, CheckCircle2, Search, Users } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: BarChart3,
    title: 'Interactive Data Visualizations',
    description: 'Explore real-time charts and analytics with multiple visualization types. Compare costs, analyze trends, and make data-driven decisions.',
    highlights: ['Multi-tab charts', 'Real-time updates', 'Export data', 'Responsive design'],
    links: [
      { label: 'Cost Calculator', href: '/calculator' },
      { label: 'Analytics Dashboard', href: '/dashboard' },
    ],
  },
  {
    icon: Zap,
    title: 'Gamification & Achievements',
    description: 'Earn points, unlock achievements, and climb the global leaderboard. Track your progress with our comprehensive gamification system.',
    highlights: ['8 achievement types', 'Dynamic leveling', 'Global leaderboard', 'Achievement badges'],
    links: [
      { label: 'View Leaderboard', href: '/leaderboard' },
      { label: 'Your Profile', href: '/profile' },
    ],
  },
  {
    icon: Loader2,
    title: 'Smart Loading States',
    description: 'Experience smooth transitions with skeleton loaders and progress indicators. Data loads seamlessly without jarring transitions.',
    highlights: ['Skeleton screens', 'Progress indicators', 'Smooth animations', 'Prevents UI flicker'],
    links: [
      { label: 'Dashboard Example', href: '/dashboard' },
      { label: 'Explorer Example', href: '/explorer' },
    ],
  },
  {
    icon: CheckCircle2,
    title: 'Form Validation',
    description: 'Submit data with confidence. Real-time validation with helpful error messages guide you through every form.',
    highlights: ['Real-time validation', 'Custom error messages', 'Multiple field types', 'Accessibility support'],
    links: [
      { label: 'Share Your Story', href: '/community' },
      { label: 'Newsletter Signup', href: '/' },
    ],
  },
  {
    icon: Search,
    title: 'Advanced Search & Filtering',
    description: 'Discover content easily with powerful search capabilities. Filter by type, category, and more to find exactly what you need.',
    highlights: ['Full-text search', 'Multi-criteria filtering', 'Relevance scoring', 'Active filter display'],
    links: [
      { label: 'Explore Resources', href: '/explorer' },
      { label: 'Try Search', href: '/explorer' },
    ],
  },
  {
    icon: Users,
    title: 'User Profile & Tracking',
    description: 'Comprehensive user dashboards with achievement tracking, progress visualization, and activity timelines.',
    highlights: ['Achievement gallery', 'Progress tracking', 'Activity timeline', 'Stat aggregation'],
    links: [
      { label: 'View Profile', href: '/profile' },
      { label: 'Achievements', href: '/profile' },
    ],
  },
]

export default function Features() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-in-up">
          <div className="inline-block px-4 py-2 rounded-full glass-effect text-primary text-sm font-semibold">
            Platform Features
          </div>
          <h1 className="text-5xl font-bold gradient-text">Enhanced Platform Features</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the comprehensive suite of features that make ORBIT-Connect the ultimate satellite education and community platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect hover:border-primary/50 transition-all duration-300 group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all">{feature.title}</h3>
                </div>

                <p className="text-muted-foreground mb-6">{feature.description}</p>

                {/* Highlights */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    {feature.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {feature.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature Statistics */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-12 glow-effect">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '6+', label: 'Major Features' },
              { number: '20+', label: 'Components' },
              { number: '8', label: 'Achievement Types' },
              { number: '100%', label: 'Responsive' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold gradient-text mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: 'Frontend',
                items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4'],
              },
              {
                category: 'Components & UI',
                items: ['shadcn/ui', 'Recharts', 'Lucide Icons', 'Custom Hooks'],
              },
              {
                category: 'Features',
                items: ['Form Validation', 'Search & Filter', 'Data Visualization', 'State Management'],
              },
            ].map((tech) => (
              <div key={tech.category} className="bg-background/50 rounded-lg p-6 border border-primary/20">
                <h3 className="font-bold text-foreground mb-4">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-12 glow-effect text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Explore?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our new pages to experience all these features in action. From advanced analytics to gamification, discover how ORBIT-Connect has evolved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/explorer">
              <Button size="lg">Explore Resources</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Analytics
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button size="lg" variant="outline">
                Check Rankings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
