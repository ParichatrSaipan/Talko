//หน้าล็อกอิน
import type { FormEvent } from 'react'
import './SignIn.css'
import '../Font/Fonts.css'
import { supabase } from '../lib/supabase'

type SignInProps = {
	onCreateAccount: () => void
	onLogin: () => void
}

function SignIn({ onCreateAccount, onLogin }: SignInProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
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
			<section className="sign-in-card">
	

				<h1>Welcome back</h1>
				<p>Log in to continue your practice.</p>

				<button className="social-button" type="button" onClick={handleGoogle}>Continue with Google</button>
				<button className="social-button" type="button" onClick={handleFacebook}>Continue with Facebook</button>

				<div className="sign-in-divider"><span>or</span></div>

				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input id="email" type="email" placeholder="Enter your name" />
					<label htmlFor="password">Password</label>
					<input id="password" type="password" placeholder="***********" />

					<button className="submit-button" type="submit">Log in</button>
				</form>

				<button className="create-account-button" type="button" onClick={onCreateAccount}>Create account</button>
			</section>
		</main>
	)
}

export default SignIn
