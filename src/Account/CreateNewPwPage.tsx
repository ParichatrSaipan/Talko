import { useState } from 'react'
import type { FormEvent } from 'react'
import AuthCard from './AuthCard.Component'
import './CreateNewPwPage.css'

type CreateNewPwPageProps = {
  onResetPassword?: () => void
}

const passwordRequirementText = 'Your password must be at least 8 characters long and include uppercase and lowercase letters, and a number.'

function isValidPassword(password: string) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
}

function CreateNewPwPage({ onResetPassword }: CreateNewPwPageProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)
  const passwordIsValid = isValidPassword(password)
  const passwordsDoNotMatch = confirmedPassword.length > 0 && password !== confirmedPassword
  const formIsComplete = passwordIsValid && confirmedPassword.length > 0 && password === confirmedPassword

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formIsComplete) return
    onResetPassword?.()
  }

  return (
    <main className="create-new-password-page">
      <AuthCard className="create-new-password-card">
        <h1>Reset the password</h1>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="new-password">New password</label>
          <div className="create-new-password-field">
            <input
              id="new-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="***********"
              autoComplete="new-password"
              value={password}
              aria-describedby={!passwordIsValid ? 'create-new-password-requirements' : undefined}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              className="create-new-password-toggle"
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

          {!passwordIsValid && (
            <p className="create-new-password-requirements" id="create-new-password-requirements">
              {passwordRequirementText}
            </p>
          )}

          <label htmlFor="confirm-new-password">Confirm password</label>
          <div className="create-new-password-field">
            <input
              id="confirm-new-password"
              name="confirmPassword"
              type={showConfirmedPassword ? 'text' : 'password'}
              placeholder="***********"
              autoComplete="new-password"
              value={confirmedPassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
              aria-describedby={passwordsDoNotMatch ? 'create-new-password-error' : undefined}
              aria-invalid={passwordsDoNotMatch}
              required
            />
            <button
              className="create-new-password-toggle"
              type="button"
              onClick={() => setShowConfirmedPassword((visible) => !visible)}
              aria-label={showConfirmedPassword ? 'Hide confirmed password' : 'Show confirmed password'}
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

          <p className={`create-new-password-error${passwordsDoNotMatch ? ' is-visible' : ''}`} id="create-new-password-error" role="alert">
            {passwordsDoNotMatch ? 'Passwords do not match.' : ''}
          </p>

          <button type="submit" disabled={!formIsComplete}>Reset password</button>
        </form>
      </AuthCard>
    </main>
  )
}

export default CreateNewPwPage
