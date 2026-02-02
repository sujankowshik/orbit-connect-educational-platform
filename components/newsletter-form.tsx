'use client'

import React from "react"

import { useState } from 'react'
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>({ status: 'idle', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!email.trim()) {
      setFormState({ status: 'error', message: 'Please enter your email address' })
      return
    }

    if (!validateEmail(email)) {
      setFormState({ status: 'error', message: 'Please enter a valid email address' })
      return
    }

    setFormState({ status: 'loading', message: '' })

    // Simulate API call
    setTimeout(() => {
      setFormState({ status: 'success', message: 'Thank you for subscribing!' })
      setEmail('')
      setTimeout(() => setFormState({ status: 'idle', message: '' }), 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={formState.status === 'loading'}
            className="pl-10 bg-background/50 border-primary/30 placeholder-muted-foreground/50 text-foreground focus:border-primary"
          />
        </div>
        <Button type="submit" disabled={formState.status === 'loading'} className="whitespace-nowrap">
          {formState.status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>

      {formState.status === 'success' && (
        <div className="flex gap-2 items-center text-sm text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{formState.message}</span>
        </div>
      )}

      {formState.status === 'error' && (
        <div className="flex gap-2 items-center text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{formState.message}</span>
        </div>
      )}
    </form>
  )
}
