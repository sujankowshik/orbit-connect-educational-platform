'use client'

import React from "react"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { validateForm, schemas, getFieldError } from '@/lib/form-validation'

interface FormData {
  title: string
  content: string
  author: string
  email: string
}

export function StorySubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: '',
    email: '',
  })

  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([])
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    setErrors((prev) => prev.filter((err) => err.field !== name))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => new Set([...prev, name]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validation = validateForm(formData, schemas.storySubmission)

    if (!validation.isValid) {
      setErrors(validation.errors)
      setTouched(new Set(['title', 'content', 'author', 'email']))
      return
    }

    // Simulate submission
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus('success')
      setSubmitMessage('Your story has been submitted successfully! Thank you for sharing.')
      setFormData({ title: '', content: '', author: '', email: '' })
      setErrors([])
      setTouched(new Set())

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Failed to submit story. Please try again.')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVisibleError = (field: string) => {
    return touched.has(field) ? getFieldError(errors, field) : undefined
  }

  return (
    <div className="space-y-6">
      <Card className="glass-effect border border-primary/30 rounded-2xl p-8 glow-effect">
        <div className="mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">Share Your Story</h2>
          <p className="text-muted-foreground">Tell us how satellites made a difference in your community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-semibold text-foreground">
              Story Title *
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Give your story a compelling title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className={`bg-background/50 border-primary/30 placeholder-muted-foreground/50 text-foreground focus:border-primary ${
                getVisibleError('title') ? 'border-destructive focus:border-destructive' : ''
              }`}
            />
            {getVisibleError('title') && (
              <div className="flex gap-2 items-center text-sm text-destructive">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{getVisibleError('title')}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-semibold text-foreground">
              Your Story *
            </label>
            <Textarea
              id="content"
              name="content"
              placeholder="Tell your story here... (minimum 50 characters)"
              value={formData.content}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              rows={8}
              className={`bg-background/50 border-primary/30 placeholder-muted-foreground/50 text-foreground focus:border-primary resize-none ${
                getVisibleError('content') ? 'border-destructive focus:border-destructive' : ''
              }`}
            />
            <div className="flex justify-between items-end">
              <div>
                {getVisibleError('content') && (
                  <div className="flex gap-2 items-center text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{getVisibleError('content')}</span>
                  </div>
                )}
              </div>
              <span className={`text-xs ${formData.content.length > 5000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {formData.content.length} / 5000
              </span>
            </div>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label htmlFor="author" className="block text-sm font-semibold text-foreground">
              Your Name *
            </label>
            <Input
              id="author"
              name="author"
              placeholder="Enter your name"
              value={formData.author}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className={`bg-background/50 border-primary/30 placeholder-muted-foreground/50 text-foreground focus:border-primary ${
                getVisibleError('author') ? 'border-destructive focus:border-destructive' : ''
              }`}
            />
            {getVisibleError('author') && (
              <div className="flex gap-2 items-center text-sm text-destructive">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{getVisibleError('author')}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-foreground">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className={`bg-background/50 border-primary/30 placeholder-muted-foreground/50 text-foreground focus:border-primary ${
                getVisibleError('email') ? 'border-destructive focus:border-destructive' : ''
              }`}
            />
            {getVisibleError('email') && (
              <div className="flex gap-2 items-center text-sm text-destructive">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{getVisibleError('email')}</span>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="flex gap-3 items-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-green-500">{submitMessage}</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex gap-3 items-center p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <span className="text-sm text-destructive">{submitMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-base font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Your Story'
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree that your story may be shared and featured on our platform.
          </p>
        </form>
      </Card>
    </div>
  )
}
