//หน้าล็อกอิน
import { useState } from 'react'
import type { FormEvent } from 'react'
import './SignInAccountPage.css'
import '../Font/Fonts.css'
import AuthCard from './AuthCard.Component'

type SignInAccountPageProps = {
	onCreateAccount: () => void
	onForgotPassword: () => void
	onLogin: () => void
}

function SignInAccountPage({ onCreateAccount, onForgotPassword, onLogin }: SignInAccountPageProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// TODO: ต่อ backend login ภายหลัง — ตอนนี้กด Log in แล้วไปหน้าถัดไปเลย
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		onLogin()
	}

	return (
		<main className="sign-in-page">
			<AuthCard className="sign-in-card">


				<h1>Welcome to talko</h1>
				<p>Log in to get started.</p>

				<button className="social-button" type="button" disabled>Continue with Google</button>
				<button className="social-button" type="button" disabled>Continue with Facebook</button>

				<div className="sign-in-divider"><span>or</span></div>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input id="email" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required />
					<label htmlFor="password">Password</label>
					<input id="password" type="password" placeholder="***********" value={password} onChange={(event) => setPassword(event.target.value)} required />
					<button className="forgot-password-button" type="button" onClick={onForgotPassword}>Forgot your password ?</button>

					<button className="submit-button" type="submit">Log in</button>
				</form>

				<button className="create-account-button" type="button" onClick={onCreateAccount}>Create account</button>
			</AuthCard>
		</main>
	)
}

export default SignInAccountPage
