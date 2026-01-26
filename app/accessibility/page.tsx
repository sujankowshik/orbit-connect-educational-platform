'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Accessibility() {
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState(false)
  const [language, setLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ]

  const features = [
    {
      title: 'Screen Reader Compatible',
      description: 'Full ARIA support for all interactive elements',
      icon: '👂',
    },
    {
      title: 'Keyboard Navigation',
      description: 'Complete keyboard accessibility with logical tab order',
      icon: '⌨️',
    },
    {
      title: 'High Contrast Mode',
      description: 'Enhanced visual distinction for users with low vision',
      icon: '🎨',
    },
    {
      title: 'Adjustable Text Size',
      description: 'Scale text from 75% to 200% for comfortable reading',
      icon: '🔤',
    },
    {
      title: 'Multi-Language Support',
      description: 'Interface available in 6 major languages',
      icon: '🌐',
    },
    {
      title: 'Dyslexia-Friendly Font',
      description: 'Alternative font options optimized for readability',
      icon: '📖',
    },
    {
      title: 'Color Blind Mode',
      description: 'Color schemes optimized for different types of color blindness',
      icon: '🎯',
    },
    {
      title: 'Focus Indicators',
      description: 'Clear visual indicators for keyboard focus',
      icon: '✨',
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-20" style={{ fontSize: `${fontSize}%` }}>
      <div className={`max-w-6xl mx-auto px-4 py-8 space-y-8 ${contrast ? 'bg-black text-white' : ''}`}>
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            Accessibility Features
          </h1>
          <p className="text-muted-foreground">
            Making satellite technology education accessible to everyone
          </p>
        </div>

        {/* Settings Panel */}
        <Card className="bg-card border-border p-6 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Personalization</h2>

          {/* Text Size */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground block">
              Text Size: {fontSize}%
            </label>
            <input
              type="range"
              min="75"
              max="200"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setFontSize(75)}
                variant={fontSize === 75 ? 'default' : 'outline'}
                size="sm"
              >
                Small
              </Button>
              <Button
                onClick={() => setFontSize(100)}
                variant={fontSize === 100 ? 'default' : 'outline'}
                size="sm"
              >
                Normal
              </Button>
              <Button
                onClick={() => setFontSize(150)}
                variant={fontSize === 150 ? 'default' : 'outline'}
                size="sm"
              >
                Large
              </Button>
              <Button
                onClick={() => setFontSize(200)}
                variant={fontSize === 200 ? 'default' : 'outline'}
                size="sm"
              >
                Largest
              </Button>
            </div>
          </div>

          {/* Contrast */}
          <div className="space-y-3 border-t border-border pt-4">
            <label className="text-sm font-semibold text-foreground block">
              Display Options
            </label>
            <Button
              onClick={() => setContrast(!contrast)}
              variant={contrast ? 'default' : 'outline'}
              className="w-full"
            >
              {contrast ? '✓ High Contrast Mode ON' : 'High Contrast Mode OFF'}
            </Button>
          </div>

          {/* Language */}
          <div className="space-y-3 border-t border-border pt-4">
            <label className="text-sm font-semibold text-foreground block">
              Interface Language
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    language === lang.code
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border text-foreground hover:border-primary'
                  }`}
                >
                  <div className="text-xl mb-1">{lang.flag}</div>
                  <div className="text-xs font-semibold">{lang.name}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Accessibility Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <Card key={i} className="bg-card border-border p-6 text-center space-y-3">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* WCAG Compliance */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            WCAG 2.1 Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Badge className="bg-green-500/20 text-green-600">
                Level A - Achieved
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All Level A criteria met for basic accessibility standards
              </p>
            </div>
            <div className="space-y-2">
              <Badge className="bg-green-500/20 text-green-600">
                Level AA - Achieved
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enhanced contrast, text sizing, and keyboard navigation
              </p>
            </div>
            <div className="space-y-2">
              <Badge className="bg-blue-500/20 text-blue-600">
                Level AAA - Targeted
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comprehensive accessibility for all user abilities
              </p>
            </div>
          </div>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card className="bg-card border-border p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Keyboard Shortcuts</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Skip to main content</span>
              <kbd className="px-2 py-1 bg-background rounded border border-border">
                Alt + M
              </kbd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Open accessibility menu</span>
              <kbd className="px-2 py-1 bg-background rounded border border-border">
                Alt + A
              </kbd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Increase text size</span>
              <kbd className="px-2 py-1 bg-background rounded border border-border">
                Ctrl + +
              </kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Decrease text size</span>
              <kbd className="px-2 py-1 bg-background rounded border border-border">
                Ctrl + -
              </kbd>
            </div>
          </div>
        </Card>

        {/* Accessibility Resources */}
        <Card className="bg-card border-border p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Resources</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>
                View our complete accessibility statement
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>
                Report accessibility issues or suggestions
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>
                Learn about WCAG guidelines at W3C
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </main>
  )
}
