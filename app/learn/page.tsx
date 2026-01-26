'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle } from 'lucide-react'

interface Quiz {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  questions: number
  duration: number
  completed: boolean
  score?: number
  topic: string
}

interface Question {
  id: string
  text: string
  options: string[]
  correct: number
  explanation: string
}

export default function Learn() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Satellite Basics',
      description: 'Learn the fundamentals of satellite technology and orbital mechanics',
      difficulty: 'beginner',
      questions: 5,
      duration: 10,
      completed: false,
      topic: 'Fundamentals',
    },
    {
      id: '2',
      title: 'Emergency Communication',
      description: 'Understand how satellites enable disaster response communication',
      difficulty: 'intermediate',
      questions: 8,
      duration: 15,
      completed: false,
      topic: 'Emergency Response',
    },
    {
      id: '3',
      title: 'Satellite Constellations',
      description: 'Explore different satellite networks and their capabilities',
      difficulty: 'intermediate',
      questions: 10,
      duration: 20,
      completed: false,
      topic: 'Technology',
    },
    {
      id: '4',
      title: 'Disaster Preparedness',
      description: 'Comprehensive guide to emergency satellite communication systems',
      difficulty: 'advanced',
      questions: 15,
      duration: 30,
      completed: false,
      topic: 'Emergency Response',
    },
  ]

  const quizQuestions: { [key: string]: Question[] } = {
    '1': [
      {
        id: 'q1',
        text: 'What is a geostationary satellite?',
        options: [
          'A satellite that stays in the same position above Earth',
          'A satellite that orbits the Earth once per day',
          'A satellite that moves around the Earth',
          'A satellite used only for navigation',
        ],
        correct: 0,
        explanation: 'Geostationary satellites remain stationary above the same point on Earth by orbiting at the same speed as Earth rotates.',
      },
      {
        id: 'q2',
        text: 'At what altitude do geostationary satellites orbit?',
        options: ['400 km', '1,200 km', '35,786 km', '60,000 km'],
        correct: 2,
        explanation: 'Geostationary satellites orbit at approximately 35,786 km above the equator.',
      },
      {
        id: 'q3',
        text: 'What are LEO satellites primarily used for?',
        options: [
          'Weather forecasting only',
          'Internet connectivity and imaging',
          'Communications only',
          'Navigation only',
        ],
        correct: 1,
        explanation: 'LEO (Low Earth Orbit) satellites at 200-2,000 km altitude are used for various purposes including internet, imaging, and communications.',
      },
      {
        id: 'q4',
        text: 'How long does it take for a signal to reach a geostationary satellite?',
        options: ['25 milliseconds', '250 milliseconds', '1 second', '5 seconds'],
        correct: 1,
        explanation: 'Due to the high altitude, signal latency to geostationary satellites is approximately 250 milliseconds.',
      },
      {
        id: 'q5',
        text: 'What is the main advantage of LEO satellites for emergency communication?',
        options: [
          'Wider coverage area',
          'Lower latency and faster communication',
          'Cheaper to manufacture',
          'Longer operational lifetime',
        ],
        correct: 1,
        explanation: 'LEO satellites offer lower latency due to their proximity to Earth, enabling real-time emergency communication.',
      },
    ],
  }

  const handleQuizStart = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestion(0)
    setAnswers([])
    setQuizCompleted(false)
    setScore(0)
  }

  const handleAnswer = (option: number) => {
    const newAnswers = [...answers, option]
    setAnswers(newAnswers)

    const currentQuiz = quizzes.find((q) => q.id === selectedQuiz?.id)
    const questions = quizQuestions[selectedQuiz?.id || '1'] || []
    const isCorrect = option === questions[currentQuestion].correct

    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < (currentQuiz?.questions || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-600'
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-600'
      case 'advanced':
        return 'bg-red-500/20 text-red-600'
      default:
        return 'bg-primary/20 text-primary'
    }
  }

  const questions = quizQuestions[selectedQuiz?.id || '1'] || []
  const currentQ = questions[currentQuestion]
  const scorePercentage =
    quizCompleted && selectedQuiz ? (score / selectedQuiz.questions) * 100 : 0

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {!selectedQuiz ? (
          <>
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-4xl font-bold text-foreground">
                Educational Platform
              </h1>
              <p className="text-muted-foreground">
                Learn about satellite technology and earn certification badges
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Available Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="bg-card border-border p-6 hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                      </Badge>
                      {quiz.completed && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {quiz.description}
                    </p>

                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <span>{quiz.questions} questions</span>
                      <span>{quiz.duration} minutes</span>
                    </div>

                    <Button
                      onClick={() => handleQuizStart(quiz)}
                      className="w-full"
                    >
                      {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                    </Button>

                    {quiz.score !== undefined && (
                      <p className="text-sm text-primary font-semibold mt-3">
                        Score: {quiz.score}%
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Certification */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Certification Program
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Complete all courses to earn your ORBIT-Connect Satellite Technology
                  Certification badge, recognized globally for satellite education
                </p>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-bold ${
                        i <= 2
                          ? 'bg-primary/30 text-primary'
                          : 'bg-background border-2 border-border text-muted-foreground'
                      }`}
                    >
                      {i <= 2 ? <CheckCircle2 className="w-6 h-6" /> : i}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </>
        ) : quizCompleted ? (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8 text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  Quiz Complete!
                </h2>
                <p className="text-muted-foreground">
                  {selectedQuiz.title}
                </p>
              </div>

              <div className="bg-primary/10 rounded-lg p-8 space-y-2">
                <p className="text-muted-foreground">Your Score</p>
                <p className="text-6xl font-bold text-primary">
                  {Math.round(scorePercentage)}%
                </p>
                <p className="text-muted-foreground">
                  {score} out of {selectedQuiz.questions} correct
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {scorePercentage >= 80
                    ? 'Excellent work! You have mastered this topic.'
                    : scorePercentage >= 60
                      ? 'Good effort! Review the material and try again.'
                      : 'Keep learning! This is an important topic.'}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    setSelectedQuiz(null)
                    setCurrentQuestion(0)
                    setAnswers([])
                  }}
                  variant="outline"
                >
                  Back to Courses
                </Button>
                <Button onClick={() => handleQuizStart(selectedQuiz)}>
                  Retake Quiz
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {selectedQuiz.title}
                </h2>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Question {currentQuestion + 1} of {selectedQuiz.questions}
                  </span>
                  <span>Score: {score}/{selectedQuiz.questions}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 mt-4">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{
                      width: `${((currentQuestion + 1) / selectedQuiz.questions) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {currentQ && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentQ.text}
                  </h3>

                  <div className="space-y-2">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full text-left p-4 rounded-lg border border-border bg-background hover:border-primary hover:bg-card transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border border-border" />
                          <span className="text-foreground">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
