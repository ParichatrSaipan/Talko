import { useState } from 'react'
import type { FormEvent } from 'react'
import './CreateAccountPage.css'
import '../Font/Fonts.css'
import { supabase } from '../lib/supabase'
import AuthCard from './AuthCard.Component'

type CreateAccountPageProps = {
  onCreateAccount: () => void
}

const passwordRequirementText = 'Your password must be at least 8 characters long and include uppercase and lowercase letters, and a number.'

function meetsPasswordRequirements(value: string) {
  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value)
}

function CreateAccountPage({ onCreateAccount }: CreateAccountPageProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!meetsPasswordRequirements(password)) {
      setError('')
      return
    }

    if (password !== confirmedPassword) {
      setError('')
      return
    }

    setError('')
    setLoading(true)
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    onCreateAccount()
  }

  const passwordMeetsRequirements = meetsPasswordRequirements(password)
  const passwordNeedsRequirements = !passwordMeetsRequirements
  const passwordIsInvalid = password.length > 0 && passwordNeedsRequirements
  const passwordsDoNotMatch = confirmedPassword.length > 0 && password !== confirmedPassword
  const formIsComplete = Boolean(
    username.trim()
    && email.trim()
    && passwordMeetsRequirements
    && confirmedPassword
    && password === confirmedPassword,
  )

  return (
    <main className="create-account-page">
      <AuthCard className="create-account-card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="create-username">Username</label>
          <input
            id="create-username"
            name="username"
            type="text"
            placeholder="Enter your name"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="create-email">E-mail</label>
          <input
            id="create-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="create-password">Password</label>
          <div className="create-password-field">
            <input
              id="create-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="***********"
              autoComplete="new-password"
              value={password}
              aria-describedby={passwordNeedsRequirements ? 'create-password-requirements' : undefined}
              aria-invalid={passwordIsInvalid}
              onChange={(event) => {
                setPassword(event.target.value)
                setError('')
              }}
              required
            />
            <button
              className="create-password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A10.8 10.8 0 0112 4c5.5 0 9 6 9 6a16 16 0 01-2.1 2.8M6.2 6.2C4.2 7.5 3 10 3 10s3.5 6 9 6a9.8 9.8 0 004.1-.9" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              )}
            </button>
          </div>

          {passwordNeedsRequirements && (
            <p className={`create-password-requirements${passwordIsInvalid ? ' is-invalid' : ''}`} id="create-password-requirements">
              {passwordRequirementText}
            </p>
          )}

          <label htmlFor="create-confirm-password">Confirm Password</label>
          <div className="create-password-field">
            <input
              id="create-confirm-password"
              name="confirmPassword"
              type={showConfirmedPassword ? 'text' : 'password'}
              placeholder="***********"
              autoComplete="new-password"
              value={confirmedPassword}
              onChange={(event) => {
                setConfirmedPassword(event.target.value)
                setError('')
              }}
              aria-describedby={passwordsDoNotMatch ? 'create-confirm-password-error' : error ? 'create-account-error' : undefined}
              aria-invalid={passwordsDoNotMatch}
              required
            />
            <button
              className="create-password-toggle"
              type="button"
              onClick={() => setShowConfirmedPassword((visible) => !visible)}
              aria-label={showConfirmedPassword ? 'Hide retyped password' : 'Show retyped password'}
              aria-pressed={showConfirmedPassword}
            >
              {showConfirmedPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 4.2A10.8 10.8 0 0112 4c5.5 0 9 6 9 6a16 16 0 01-2.1 2.8M6.2 6.2C4.2 7.5 3 10 3 10s3.5 6 9 6a9.8 9.8 0 004.1-.9" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              )}
            </button>
          </div>

          {passwordsDoNotMatch && (
            <p className="create-confirm-password-error" id="create-confirm-password-error" role="alert">
              Passwords do not match.
            </p>
          )}

          <p className="create-account-error" id="create-account-error" role="alert">
            {error}
          </p>

          <button type="submit" disabled={!formIsComplete || loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>
      </AuthCard>
    </main>
  )
}

export default CreateAccountPage
