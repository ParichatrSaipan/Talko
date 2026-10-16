//หน้าล็อกอิน
import { useState } from 'react'
import type { FormEvent } from 'react'
import './SignInAccountPage.css'
import '../Font/Fonts.css'
import { supabase } from '../lib/supabase'
import AuthCard from './AuthCard.Component'

type SignInAccountPageProps = {
	onCreateAccount: () => void
	onForgotPassword: () => void
	onLogin: () => void
}

function SignInAccountPage({ onCreateAccount, onForgotPassword, onLogin }: SignInAccountPageProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setError('')
		setLoading(true)
		const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
		setLoading(false)
		if (signInError) {
			setError(signInError.message)
			return
		}
		onLogin()
	}

	async function handleGoogle() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: { redirectTo: window.location.origin },
		})
	}

	async function handleFacebook() {
		await supabase.auth.signInWithOAuth({
			provider: 'facebook',
			options: { redirectTo: window.location.origin },
		})
	}

	return (
		<main className="sign-in-page">
			<AuthCard className="sign-in-card">
	

				<h1>Welcome to talko</h1>
				<p>Log in to get started.</p>

				<button className="social-button" type="button" onClick={handleGoogle}>Continue with Google</button>
				<button className="social-button" type="button" onClick={handleFacebook}>Continue with Facebook</button>

				<div className="sign-in-divider"><span>or</span></div>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input id="email" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required />
					<label htmlFor="password">Password</label>
					<input id="password" type="password" placeholder="***********" value={password} onChange={(event) => setPassword(event.target.value)} required />
					<button className="forgot-password-button" type="button" onClick={onForgotPassword}>Forgot your password ?</button>

					{error && <p className="sign-in-error" role="alert">{error}</p>}

					<button className="submit-button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
				</form>

				<button className="create-account-button" type="button" onClick={onCreateAccount}>Create account</button>
			</AuthCard>
		</main>
	)
}

export default SignInAccountPage
