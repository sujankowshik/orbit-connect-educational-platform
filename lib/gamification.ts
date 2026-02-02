// Gamification system for ORBIT-Connect

export interface UserAchievement {
  id: string
  name: string
  description: string
  icon: string
  points: number
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

export interface UserProfile {
  id: string
  username: string
  email?: string
  totalPoints: number
  level: number
  achievements: UserAchievement[]
  coursesCompleted: number
  storiesShared: number
  simulationsRun: number
  joinedDate: Date
}

export interface Leaderboard {
  rank: number
  username: string
  points: number
  level: number
  achievements: number
}

// Achievement definitions
export const ACHIEVEMENTS = {
  SATELLITE_EXPLORER: {
    id: 'satellite-explorer',
    name: 'Satellite Explorer',
    description: 'View 5 different satellites in the tracker',
    icon: '🛰️',
    points: 50,
  },
  EMERGENCY_RESPONDER: {
    id: 'emergency-responder',
    name: 'Emergency Responder',
    description: 'Complete the emergency simulation',
    icon: '🚨',
    points: 100,
  },
  SCHOLAR: {
    id: 'scholar',
    name: 'Satellite Scholar',
    description: 'Complete 3 educational courses',
    icon: '🎓',
    points: 200,
  },
  STORY_TELLER: {
    id: 'story-teller',
    name: 'Story Teller',
    description: 'Share 5 community stories',
    icon: '📖',
    points: 150,
  },
  DISASTER_EXPERT: {
    id: 'disaster-expert',
    name: 'Disaster Expert',
    description: 'Read all 6 disaster case studies',
    icon: '📚',
    points: 120,
  },
  TECH_INNOVATOR: {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Explore the API dashboard',
    icon: '💻',
    points: 75,
  },
  ACCESSIBILITY_ADVOCATE: {
    id: 'accessibility-advocate',
    name: 'Accessibility Advocate',
    description: 'Explore accessibility features',
    icon: '♿',
    points: 80,
  },
  CERTIFIED_EXPERT: {
    id: 'certified-expert',
    name: 'Certified Expert',
    description: 'Earn satellite technology certification',
    icon: '🏅',
    points: 500,
  },
} as const

// Calculate user level based on points
export const calculateLevel = (points: number): number => {
  return Math.floor(Math.sqrt(points / 100)) + 1
}

// Calculate next level points requirement
export const getNextLevelPoints = (currentLevel: number): number => {
  return (currentLevel + 1) ** 2 * 100
}

// Calculate points progress to next level
export const getPointsProgress = (points: number) => {
  const currentLevel = calculateLevel(points)
  const currentLevelPoints = (currentLevel - 1) ** 2 * 100
  const nextLevelPoints = getNextLevelPoints(currentLevel)
  const progressInLevel = points - currentLevelPoints
  const pointsNeeded = nextLevelPoints - currentLevelPoints

  return {
    currentLevel,
    currentLevelPoints,
    nextLevelPoints,
    progressInLevel,
    pointsNeeded,
    progressPercentage: (progressInLevel / pointsNeeded) * 100,
  }
}

// Mock user data (in real app, would come from database)
export const mockLeaderboard: Leaderboard[] = [
  { rank: 1, username: 'SatelliteGuru', points: 2450, level: 5, achievements: 7 },
  { rank: 2, username: 'OrbitMaster', points: 2100, level: 4, achievements: 6 },
  { rank: 3, username: 'SpaceTech', points: 1850, level: 4, achievements: 6 },
  { rank: 4, username: 'DisasterResponder', points: 1620, level: 4, achievements: 5 },
  { rank: 5, username: 'CommunityHelper', points: 1450, level: 3, achievements: 5 },
  { rank: 6, username: 'LearnerPro', points: 1230, level: 3, achievements: 4 },
  { rank: 7, username: 'TechExplorer', points: 980, level: 3, achievements: 4 },
  { rank: 8, username: 'NewbieLearner', points: 750, level: 2, achievements: 3 },
]

// Mock current user
export const mockCurrentUser: UserProfile = {
  id: 'user-123',
  username: 'SatelliteGuru',
  email: 'user@example.com',
  totalPoints: 2450,
  level: 5,
  coursesCompleted: 7,
  storiesShared: 3,
  simulationsRun: 12,
  joinedDate: new Date('2024-01-15'),
  achievements: [
    {
      ...ACHIEVEMENTS.SATELLITE_EXPLORER,
      unlockedAt: new Date('2024-01-20'),
    },
    {
      ...ACHIEVEMENTS.EMERGENCY_RESPONDER,
      unlockedAt: new Date('2024-01-25'),
    },
    {
      ...ACHIEVEMENTS.SCHOLAR,
      unlockedAt: new Date('2024-02-01'),
    },
    {
      ...ACHIEVEMENTS.STORY_TELLER,
      unlockedAt: new Date('2024-02-02'),
    },
  ],
}
