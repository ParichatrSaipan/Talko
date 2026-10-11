import { useState } from 'react'
import type { FormEvent } from 'react'
import './CreateAccount.css'
import '../Font/Fonts.css'
import { supabase } from '../lib/supabase'

type CreateAccountProps = {
  onCreateAccount: () => void
}

function CreateAccount({ onCreateAccount }: CreateAccountProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password !== confirmedPassword) {
      setError('Passwords do not match.')
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

  return (
    <main className="create-account-page">
      <section className="create-account-card">
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
          <input
            id="create-password"
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

          <label htmlFor="create-confirm-password">Retype password</label>
          <input
            id="create-confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="***********"
            autoComplete="new-password"
            value={confirmedPassword}
            onChange={(event) => {
              setConfirmedPassword(event.target.value)
              setError('')
            }}
            aria-describedby={error ? 'create-account-error' : undefined}
            required
          />

          <p className="create-account-error" id="create-account-error" role="alert">
            {error}
          </p>

          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>
      </section>
    </main>
  )
}

export default CreateAccount
