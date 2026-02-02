// Comprehensive form validation utilities

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  getError: (field: string) => ValidationError | undefined
}

// Validation rules
const validators = {
  email: (value: string): ValidationError | null => {
    if (!value) return { field: 'email', message: 'Email is required', code: 'REQUIRED' }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return { field: 'email', message: 'Please enter a valid email address', code: 'INVALID_EMAIL' }
    return null
  },

  password: (value: string): ValidationError | null => {
    if (!value) return { field: 'password', message: 'Password is required', code: 'REQUIRED' }
    if (value.length < 8) return { field: 'password', message: 'Password must be at least 8 characters', code: 'MIN_LENGTH' }
    if (!/[A-Z]/.test(value)) return { field: 'password', message: 'Password must contain at least one uppercase letter', code: 'NO_UPPERCASE' }
    if (!/[0-9]/.test(value)) return { field: 'password', message: 'Password must contain at least one number', code: 'NO_NUMBER' }
    return null
  },

  username: (value: string): ValidationError | null => {
    if (!value) return { field: 'username', message: 'Username is required', code: 'REQUIRED' }
    if (value.length < 3) return { field: 'username', message: 'Username must be at least 3 characters', code: 'MIN_LENGTH' }
    if (value.length > 20) return { field: 'username', message: 'Username must not exceed 20 characters', code: 'MAX_LENGTH' }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) return { field: 'username', message: 'Username can only contain letters, numbers, underscores, and hyphens', code: 'INVALID_CHARACTERS' }
    return null
  },

  url: (value: string): ValidationError | null => {
    if (!value) return { field: 'url', message: 'URL is required', code: 'REQUIRED' }
    try {
      new URL(value)
      return null
    } catch {
      return { field: 'url', message: 'Please enter a valid URL', code: 'INVALID_URL' }
    }
  },

  phone: (value: string): ValidationError | null => {
    if (!value) return { field: 'phone', message: 'Phone number is required', code: 'REQUIRED' }
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (!phoneRegex.test(value.replace(/\s/g, ''))) return { field: 'phone', message: 'Please enter a valid phone number', code: 'INVALID_PHONE' }
    return null
  },

  required: (value: string, fieldName: string = 'This field'): ValidationError | null => {
    if (!value || !value.trim()) return { field: 'field', message: `${fieldName} is required`, code: 'REQUIRED' }
    return null
  },

  minLength: (value: string, min: number, fieldName: string = 'This field'): ValidationError | null => {
    if (value.length < min) return { field: 'field', message: `${fieldName} must be at least ${min} characters`, code: 'MIN_LENGTH' }
    return null
  },

  maxLength: (value: string, max: number, fieldName: string = 'This field'): ValidationError | null => {
    if (value.length > max) return { field: 'field', message: `${fieldName} must not exceed ${max} characters`, code: 'MAX_LENGTH' }
    return null
  },

  minNumber: (value: number, min: number, fieldName: string = 'This value'): ValidationError | null => {
    if (value < min) return { field: 'field', message: `${fieldName} must be at least ${min}`, code: 'MIN_VALUE' }
    return null
  },

  maxNumber: (value: number, max: number, fieldName: string = 'This value'): ValidationError | null => {
    if (value > max) return { field: 'field', message: `${fieldName} must not exceed ${max}`, code: 'MAX_VALUE' }
    return null
  },

  match: (value: string, compareValue: string, fieldName: string = 'Fields'): ValidationError | null => {
    if (value !== compareValue) return { field: 'field', message: `${fieldName} do not match`, code: 'NO_MATCH' }
    return null
  },
}

// Validation schema builder
export interface ValidationSchema {
  [key: string]: ((value: any) => ValidationError | null)[]
}

export function validateForm(data: Record<string, any>, schema: ValidationSchema): ValidationResult {
  const errors: ValidationError[] = []

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field]
    for (const rule of rules) {
      const error = rule(value)
      if (error) {
        error.field = field
        errors.push(error)
        break // Stop at first error for this field
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    getError: (field: string) => errors.find((e) => e.field === field),
  }
}

// Pre-built schemas
export const schemas = {
  storySubmission: {
    title: [(v: string) => validators.required(v, 'Story title'), (v: string) => validators.minLength(v, 5, 'Story title'), (v: string) => validators.maxLength(v, 100, 'Story title')],
    content: [(v: string) => validators.required(v, 'Story content'), (v: string) => validators.minLength(v, 50, 'Story content'), (v: string) => validators.maxLength(v, 5000, 'Story content')],
    author: [(v: string) => validators.required(v, 'Author name'), (v: string) => validators.minLength(v, 2, 'Author name')],
    email: [(v: string) => validators.email(v)],
  },

  courseEnrollment: {
    email: [(v: string) => validators.email(v)],
    fullName: [(v: string) => validators.required(v, 'Full name'), (v: string) => validators.minLength(v, 2, 'Full name')],
    learningGoal: [(v: string) => validators.required(v, 'Learning goal')],
  },

  userSignUp: {
    email: [(v: string) => validators.email(v)],
    username: [(v: string) => validators.username(v)],
    password: [(v: string) => validators.password(v)],
    confirmPassword: [(v: string) => validators.required(v, 'Password confirmation')],
  },

  userLogin: {
    email: [(v: string) => validators.email(v)],
    password: [(v: string) => validators.required(v, 'Password')],
  },

  contactForm: {
    name: [(v: string) => validators.required(v, 'Name'), (v: string) => validators.minLength(v, 2, 'Name')],
    email: [(v: string) => validators.email(v)],
    subject: [(v: string) => validators.required(v, 'Subject'), (v: string) => validators.minLength(v, 5, 'Subject')],
    message: [(v: string) => validators.required(v, 'Message'), (v: string) => validators.minLength(v, 10, 'Message')],
  },
}

// Helper to check if field has error
export function hasError(errors: ValidationError[], field: string): boolean {
  return errors.some((e) => e.field === field)
}

// Helper to get field error message
export function getFieldError(errors: ValidationError[], field: string): string | undefined {
  return errors.find((e) => e.field === field)?.message
}
