'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react'

interface Story {
  id: string
  author: string
  title: string
  description: string
  content: string
  category: string
  date: string
  votes: number
  comments: number
  hasVoted?: boolean
  location: string
  impact: 'lives-saved' | 'infrastructure' | 'coordination' | 'awareness'
}

export default function Community() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      author: 'Maria Rodriguez',
      title: 'Satellite Phone Saved Our Lives',
      description:
        'During the 2015 Nepal earthquake, our village was completely cut off. A satellite phone was our only hope.',
      content:
        'When the earthquake hit at 11:56 AM, all communication networks went down immediately. Our village hospital had no way to contact the main city for medical supplies and backup. Within hours, emergency responders arrived with satellite communication equipment. We were able to coordinate the evacuation of injured patients and ensure they received proper medical care. Without satellite communication, at least 20 people in our community would not have survived.',
      category: 'First-Hand Account',
      date: '2 months ago',
      votes: 324,
      comments: 45,
      location: 'Kathmandu, Nepal',
      impact: 'lives-saved',
    },
    {
      id: '2',
      author: 'Dr. James Chen',
      title: 'Satellite Coordination During Hurricane Maria',
      description:
        'As a relief coordinator, satellite networks were essential for our disaster response operations.',
      content:
        'In the aftermath of Hurricane Maria, traditional communication infrastructure was completely destroyed. My team used satellite phones and internet terminals to coordinate relief efforts across Puerto Rico. We mapped affected areas, tracked supply distribution, and communicated with field teams in real-time. The efficiency of our response directly saved hundreds of lives.',
      category: 'Professional Experience',
      date: '1 month ago',
      votes: 287,
      comments: 38,
      location: 'San Juan, Puerto Rico',
      impact: 'coordination',
    },
    {
      id: '3',
      author: 'Global Youth Coalition',
      title: 'Raising Awareness About Satellite Technology',
      description:
        'Our grassroots organization is educating communities about the importance of satellite infrastructure.',
      content:
        'In developing nations, awareness about satellite communication systems is critical. We are training local communities, first responders, and government officials about how satellites can save lives during disasters. By building this knowledge base now, we ensure faster, more effective emergency response when disasters occur.',
      category: 'Awareness Campaign',
      date: '3 weeks ago',
      votes: 156,
      comments: 22,
      location: 'Multiple countries',
      impact: 'awareness',
    },
    {
      id: '4',
      author: 'Infrastructure Team',
      title: 'Building Resilient Communication Networks',
      description:
        'Case study on integrating satellite backup systems into existing infrastructure.',
      content:
        'We designed a resilient communication infrastructure combining ground and satellite networks. This hybrid approach ensures continuous connectivity even during major disasters. Initial deployment in three pilot regions has shown 99.9% uptime and significantly reduced emergency response times.',
      category: 'Infrastructure Project',
      date: '3 weeks ago',
      votes: 198,
      comments: 31,
      location: 'Southeast Asia',
      impact: 'infrastructure',
    },
  ])

  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [showNewStory, setShowNewStory] = useState(false)

  const handleVote = (storyId: string) => {
    setStories(
      stories.map((s) =>
        s.id === storyId
          ? {
              ...s,
              votes: s.hasVoted ? s.votes - 1 : s.votes + 1,
              hasVoted: !s.hasVoted,
            }
          : s
      )
    )
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'lives-saved':
        return 'bg-green-500/20 text-green-600'
      case 'infrastructure':
        return 'bg-blue-500/20 text-blue-600'
      case 'coordination':
        return 'bg-purple-500/20 text-purple-600'
      case 'awareness':
        return 'bg-yellow-500/20 text-yellow-600'
      default:
        return 'bg-primary/20 text-primary'
    }
  }

  const sortedStories = [...stories].sort((a, b) => b.votes - a.votes)

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-4 mb-10 animate-slide-in-up">
          <div className="inline-block px-4 py-2 rounded-full glass-effect text-accent text-sm font-semibold">
            Shared Experiences
          </div>
          <h1 className="text-5xl font-bold gradient-text">
            Community Stories
          </h1>
          <p className="text-lg text-muted-foreground">
            Share and discover real-world experiences with satellite technology
          </p>
        </div>

        {/* New Story Button */}
        <button
          onClick={() => setShowNewStory(true)}
          className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
        >
          Share Your Story
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story List */}
          <div className="lg:col-span-2 space-y-4 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Community Stories</h2>
              <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold">{sortedStories.length} Stories</span>
            </div>
            {sortedStories.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                  selectedStory?.id === story.id
                    ? 'glass-effect border-primary/80 bg-primary/20 glow-effect'
                    : 'glass-effect border-border/50 hover:border-primary'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground">{story.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {story.author} • {story.date}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${getImpactColor(story.impact)}`}>
                      {story.impact
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.description}
                  </p>
                  <div className="flex gap-6 text-sm text-muted-foreground pt-2 border-t border-primary/20">
                    <span className="flex items-center gap-2 font-semibold">
                      <ThumbsUp className="w-4 h-4" />
                      {story.votes}
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                      <MessageCircle className="w-4 h-4" />
                      {story.comments}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Story Details */}
          {selectedStory && (
            <div className="lg:col-span-1 space-y-4 animate-slide-in-up" style={{ animationDelay: '150ms' }}>
              <div className="glass-effect border border-primary/30 rounded-2xl p-8 space-y-6 glow-effect sticky top-24">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {selectedStory.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {selectedStory.author}
                  </p>
                  <Badge variant="outline">{selectedStory.category}</Badge>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Location
                  </p>
                  <p className="text-foreground">{selectedStory.location}</p>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Community Engagement
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleVote(selectedStory.id)}
                      variant={
                        selectedStory.hasVoted ? 'default' : 'outline'
                      }
                      className="flex-1 gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {selectedStory.votes}
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <MessageCircle className="w-4 h-4" />
                      {selectedStory.comments}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <Card className="bg-card border-border p-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedStory.content}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary mb-1">
              {stories.length}
            </p>
            <p className="text-sm text-muted-foreground">Community Stories</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-accent mb-1">
              {stories.reduce((sum, s) => sum + s.votes, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Votes</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-foreground mb-1">
              {stories.reduce((sum, s) => sum + s.comments, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Comments</p>
          </Card>
          <Card className="bg-card border-border p-4 text-center">
            <p className="text-3xl font-bold text-primary mb-1">12</p>
            <p className="text-sm text-muted-foreground">Countries</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
