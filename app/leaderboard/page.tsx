'use client'

import { useState } from 'react'
import { Trophy, Medal, Zap } from 'lucide-react'
import { mockLeaderboard, mockCurrentUser } from '@/lib/gamification'
import { Card } from '@/components/ui/card'

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('all')

  const currentUserRank = mockLeaderboard.findIndex((u) => u.username === mockCurrentUser.username) + 1

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600'
      case 2:
        return 'from-gray-300 to-gray-500'
      case 3:
        return 'from-orange-400 to-orange-600'
      default:
        return 'from-primary to-accent'
    }
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-4 animate-slide-in-up">
          <div className="inline-block px-4 py-2 rounded-full glass-effect text-primary text-sm font-semibold">
            Global Rankings
          </div>
          <h1 className="text-5xl font-bold gradient-text">Leaderboard</h1>
          <p className="text-lg text-muted-foreground">Compete with users worldwide</p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-3 justify-center">
          {(['week', 'month', 'all'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/50'
                  : 'glass-effect text-foreground hover:border-primary border border-border/50'
              }`}
            >
              {tf === 'week' ? 'This Week' : tf === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}
        </div>

        {/* Your Rank */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">YOUR CURRENT RANK</p>
            <div className="flex items-center justify-center gap-4">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getMedalColor(currentUserRank)} flex items-center justify-center shadow-lg`}>
                <span className="text-3xl font-bold text-white">#{currentUserRank}</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">{mockCurrentUser.username}</h2>
                <p className="text-primary font-bold text-lg">{mockCurrentUser.totalPoints.toLocaleString()} points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Top Players</h2>
          <div className="space-y-3">
            {mockLeaderboard.map((user) => {
              const isCurrentUser = user.username === mockCurrentUser.username
              const medalColor = getMedalColor(user.rank)

              return (
                <div
                  key={user.rank}
                  className={`glass-effect rounded-xl p-6 border-2 transition-all duration-300 ${
                    isCurrentUser ? 'border-primary/80 bg-primary/10 glow-effect' : 'border-border/50 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    {/* Rank & User */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {user.rank <= 3 ? (
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${medalColor} flex items-center justify-center flex-shrink-0`}>
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                          #{user.rank}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className={`font-bold text-lg ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>{user.username}</p>
                        <p className="text-sm text-muted-foreground">Level {user.level}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8 text-right">
                      <div>
                        <p className="text-sm text-muted-foreground">Points</p>
                        <p className="text-2xl font-bold text-primary">{user.points.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Achievements</p>
                        <div className="flex gap-1 justify-end mt-1">
                          {Array.from({ length: user.achievements }).map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-accent rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Seasonal Rankings */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Seasonal Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { place: '1st Place', reward: '500 Bonus Points', color: 'from-yellow-400 to-yellow-600' },
              { place: '2nd Place', reward: '300 Bonus Points', color: 'from-gray-300 to-gray-500' },
              { place: '3rd Place', reward: '150 Bonus Points', color: 'from-orange-400 to-orange-600' },
            ].map((item) => (
              <div key={item.place} className="text-center p-6 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-muted-foreground text-sm mb-2">{item.place}</p>
                <p className="text-2xl font-bold gradient-text">{item.reward}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
