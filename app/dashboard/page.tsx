'use client'

import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Users, BookOpen, Zap } from 'lucide-react'

// Mock analytics data
const userGrowth = [
  { month: 'Jan', users: 400, courses: 240, stories: 120 },
  { month: 'Feb', users: 650, courses: 380, stories: 220 },
  { month: 'Mar', users: 920, courses: 550, stories: 380 },
  { month: 'Apr', users: 1200, courses: 780, stories: 560 },
  { month: 'May', users: 1680, courses: 1020, stories: 740 },
  { month: 'Jun', users: 2100, courses: 1340, stories: 960 },
]

const engagementData = [
  { name: 'Courses', value: 45, color: '#10b981' },
  { name: 'Stories', value: 30, color: '#3b82f6' },
  { name: 'Simulations', value: 15, color: '#f59e0b' },
  { name: 'Leaderboard', value: 10, color: '#8b5cf6' },
]

const contentTypes = [
  { type: 'Satellite Tech', count: 12, engagement: 92 },
  { type: 'Disaster Response', count: 18, engagement: 88 },
  { type: 'Community Stories', count: 25, engagement: 76 },
  { type: 'Environmental', count: 16, engagement: 84 },
  { type: 'Education', count: 22, engagement: 80 },
]

const performanceMetrics = [
  { metric: 'Page Load Time', value: '0.8s', status: 'optimal', change: '-12%' },
  { metric: 'User Retention', value: '78%', status: 'optimal', change: '+8%' },
  { metric: 'Avg. Session Time', value: '12m 34s', status: 'good', change: '+22%' },
  { metric: 'Bounce Rate', value: '24%', status: 'good', change: '-5%' },
]

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('6m')

  const statCards = [
    {
      icon: Users,
      label: 'Total Users',
      value: '2,100+',
      change: '+180%',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: BookOpen,
      label: 'Courses Completed',
      value: '1,340+',
      change: '+92%',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Zap,
      label: 'Community Stories',
      value: '960+',
      change: '+700%',
      color: 'from-orange-400 to-orange-600',
    },
    {
      icon: TrendingUp,
      label: 'Platform Points',
      value: '892K+',
      change: '+456%',
      color: 'from-purple-400 to-purple-600',
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Real-time platform performance and user engagement metrics</p>
          </div>
          <div className="flex gap-2">
            {['1m', '3m', '6m', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  dateRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-effect text-foreground hover:border-primary'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`glass-effect border border-primary/30 rounded-2xl p-6 glow-effect bg-gradient-to-br ${stat.color} to-transparent opacity-80 hover:opacity-100 transition-opacity`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-foreground" />
                  <span className="text-sm font-bold text-green-500">{stat.change}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Charts */}
        <Tabs defaultValue="growth" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">User Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="growth">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
                <h3 className="text-lg font-bold text-foreground mb-6">Monthly User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: `1px solid var(--color-border)`,
                        color: 'var(--color-foreground)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5 }} name="Users" />
                    <Line type="monotone" dataKey="courses" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Courses" />
                    <Line type="monotone" dataKey="stories" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} name="Stories" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
                <h3 className="text-lg font-bold text-foreground mb-6">Monthly Activity Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: `1px solid var(--color-border)`,
                        color: 'var(--color-foreground)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="users" fill="#0ea5e9" radius={[8, 8, 0, 0]} name="Users" />
                    <Bar dataKey="courses" fill="#10b981" radius={[8, 8, 0, 0]} name="Courses" />
                    <Bar dataKey="stories" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Stories" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
                <h3 className="text-lg font-bold text-foreground mb-6 text-center">Engagement Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={engagementData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-card)',
                        border: `1px solid var(--color-border)`,
                        color: 'var(--color-foreground)',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="glass-effect border border-primary/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Content Performance</h3>
                  <div className="space-y-4">
                    {contentTypes.map((content) => (
                      <div key={content.type} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-foreground">{content.type}</span>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-bold text-primary">{content.count}</span> items • <span className="text-accent">{content.engagement}%</span> engagement
                          </div>
                        </div>
                        <div className="w-full bg-background/50 rounded-full h-3 overflow-hidden border border-primary/20">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${content.engagement}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
              <h3 className="text-lg font-bold text-foreground mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="bg-background/50 rounded-lg p-6 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-3">{metric.metric}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${metric.status === 'optimal' ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>
                        {metric.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
