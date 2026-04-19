'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

type AuthFormPanelProps = {
  mode: 'login' | 'register'
  actionClassName: string
}

export function AuthFormPanel({ mode, actionClassName }: AuthFormPanelProps) {
  const router = useRouter()
  const { login, signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [interest, setInterest] = useState('')
  const [error, setError] = useState('')

  const isRegister = mode === 'register'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim() || (isRegister && !name.trim())) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      if (isRegister) {
        await signup(name.trim(), email.trim(), password)
      } else {
        await login(email.trim(), password)
      }
      router.push('/')
    } catch {
      setError('Unable to continue right now. Please try again.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      {isRegister ? (
        <input
          className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      ) : null}
      <input
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
      />
      <input
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {isRegister ? (
        <input
          className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
          placeholder="What are you posting? (optional)"
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
        />
      ) : null}
      <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${actionClassName}`} disabled={isLoading}>
        {isLoading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
      </button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  )
}
