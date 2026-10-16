import { useState } from 'react'
import AuthCard from './AuthCard.Component'
import './ForgotPasswordPage.css'

type ForgotPasswordPageProps = {
  onCreateAccount: () => void
  onSubmitEmail: () => void
}

function ForgotPasswordPage({ onCreateAccount, onSubmitEmail }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('')

  return (
    <main className="reset-password-page">
      <AuthCard className="reset-password-card">
        <h1>Reset the password</h1>
        <p>Enter your email and we&apos;ll send you a link to reset your password</p>

        <div className="reset-password-form">
          <label htmlFor="reset-email">Email</label>
          <input
            id="reset-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="reset-password-notice" role="status">
            <span className="reset-password-notice-icon" aria-hidden="true">!</span>
            <p>
              <span>Oops, we can&apos;t find your email in the system.</span>
              Please{' '}
              <button type="button" onClick={onCreateAccount}>create new account.</button>
            </p>
          </div>

          <button className="reset-password-submit" type="button" onClick={onSubmitEmail}>Submit email address</button>
        </div>
      </AuthCard>
    </main>
  )
}

export default ForgotPasswordPage
