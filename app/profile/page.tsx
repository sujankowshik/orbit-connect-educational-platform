'use client'

import { Award, Zap, BookOpen, Share2, Play, Calendar } from 'lucide-react'
import { mockCurrentUser, getPointsProgress, ACHIEVEMENTS } from '@/lib/gamification'

export default function Profile() {
  const progress = getPointsProgress(mockCurrentUser.totalPoints)
  const allAchievements = Object.values(ACHIEVEMENTS)
  const unlockedIds = new Set(mockCurrentUser.achievements.map((a) => a.id))

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-12 glow-effect">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-primary-foreground">
                {mockCurrentUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2">{mockCurrentUser.username}</h1>
              <p className="text-muted-foreground mb-4">
                Member since {new Date(mockCurrentUser.joinedDate).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Level {mockCurrentUser.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-foreground">{mockCurrentUser.achievements.length} Achievements</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Points Progress */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Progress to Level {progress.currentLevel + 1}</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {progress.progressInLevel.toLocaleString()} / {progress.pointsNeeded.toLocaleString()} points
              </span>
              <span className="font-bold text-primary">{Math.floor(progress.progressPercentage)}%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-4 border border-primary/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Total Points: {mockCurrentUser.totalPoints.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, label: 'Courses', value: mockCurrentUser.coursesCompleted, color: 'from-primary' },
            { icon: Share2, label: 'Stories Shared', value: mockCurrentUser.storiesShared, color: 'from-accent' },
            { icon: Play, label: 'Simulations', value: mockCurrentUser.simulationsRun, color: 'from-cyan-400' },
            { icon: Award, label: 'Achievements', value: mockCurrentUser.achievements.length, color: 'from-yellow-400' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`glass-effect border border-primary/30 rounded-xl p-6 text-center glow-effect bg-gradient-to-br ${stat.color} to-transparent opacity-80 hover:opacity-100 transition-opacity`}
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-foreground" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allAchievements.map((achievement) => {
              const isUnlocked = unlockedIds.has(achievement.id)
              const unlockedAchievement = mockCurrentUser.achievements.find((a) => a.id === achievement.id)

              return (
                <div
                  key={achievement.id}
                  className={`rounded-xl p-6 text-center border-2 transition-all duration-300 ${
                    isUnlocked
                      ? 'glass-effect border-primary/80 bg-primary/10 glow-effect'
                      : 'glass-effect border-border/50 opacity-50 grayscale'
                  }`}
                >
                  <div className="text-5xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{achievement.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">{achievement.points}</span>
                  </div>
                  {isUnlocked && unlockedAchievement?.unlockedAt && (
                    <p className="text-xs text-accent mt-3">
                      Unlocked {new Date(unlockedAchievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { activity: 'Earned Scholar Achievement', date: '2 days ago', icon: '🏆' },
              { activity: 'Completed Beginner Course', date: '5 days ago', icon: '✅' },
              { activity: 'Shared Story Teller Achievement', date: '1 week ago', icon: '📖' },
              { activity: 'Reached Level 5', date: '2 weeks ago', icon: '⬆️' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
