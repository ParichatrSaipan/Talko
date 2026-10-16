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
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isValidPassword(password)) {
      setError(passwordRequirementText)
      return
    }

    if (password !== confirmedPassword) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    onResetPassword?.()
  }

  return (
    <main className="create-new-password-page">
      <AuthCard className="create-new-password-card">
        <h1>Reset the password</h1>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            name="password"
            type="password"
            placeholder="***********"
            autoComplete="new-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            required
          />

          <p className="create-new-password-requirements">
            {passwordRequirementText}
          </p>

          <label htmlFor="confirm-new-password">Confirm password</label>
          <input
            id="confirm-new-password"
            name="confirmPassword"
            type="password"
            placeholder="***********"
            autoComplete="new-password"
            value={confirmedPassword}
            onChange={(event) => {
              setConfirmedPassword(event.target.value)
              setError('')
            }}
            aria-describedby={error ? 'create-new-password-error' : undefined}
            aria-invalid={Boolean(error)}
            required
          />

          <p className="create-new-password-error" id="create-new-password-error" role="alert">
            {error}
          </p>

          <button type="submit">Reset password</button>
        </form>
      </AuthCard>
    </main>
  )
}

export default CreateNewPwPage
