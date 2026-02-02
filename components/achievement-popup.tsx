'use client'

import { useEffect, useState } from 'react'
import { UserAchievement } from '@/lib/gamification'
import { Zap } from 'lucide-react'

interface AchievementPopupProps {
  achievement: UserAchievement
  show?: boolean
}

export function AchievementPopup({ achievement, show = false }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-up">
      <div className="glass-effect border border-primary/80 rounded-2xl p-6 glow-effect max-w-sm space-y-4 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0">{achievement.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-foreground">Achievement Unlocked!</h3>
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <p className="font-bold text-foreground text-lg">{achievement.name}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-primary/20">
          <span className="text-sm text-muted-foreground">Earned:</span>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">+{achievement.points} points</span>
          </div>
        </div>

        <div className="w-full h-1 bg-background/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// Demo component showing achievement notifications
export function AchievementDemoPanel() {
  const [notifications, setNotifications] = useState<UserAchievement[]>([])

  const mockAchievements = [
    {
      id: 'sat-1',
      name: 'Satellite Explorer',
      description: 'View 5 different satellites in the tracker',
      icon: '🛰️',
      points: 50,
    },
    {
      id: 'resp-1',
      name: 'Emergency Responder',
      description: 'Complete the emergency simulation',
      icon: '🚨',
      points: 100,
    },
  ]

  const addNotification = (achievement: UserAchievement) => {
    setNotifications((prev) => [...prev, { ...achievement, unlockedAt: new Date() }])
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3">
      {notifications.map((notif, i) => (
        <AchievementPopup key={i} achievement={notif} show={true} />
      ))}

      {notifications.length === 0 && (
        <div className="glass-effect border border-primary/30 rounded-xl p-4">
          <button
            onClick={() => addNotification(mockAchievements[0])}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors text-sm font-semibold"
          >
            Test Achievement 1
          </button>
          <button
            onClick={() => addNotification(mockAchievements[1])}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-semibold mt-2"
          >
            Test Achievement 2
          </button>
        </div>
      )}
    </div>
  )
}
