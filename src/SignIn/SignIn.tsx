import './SignIn.css'
import '../Font/Fonts.css'
function SignIn() {
	return (
		<main className="sign-in-page">
			<section className="sign-in-card">
				<div className="sign-in-brand">
					<span className="brand-mark" aria-hidden="true">
						<i />
					</span>
					<span>Talko</span>
				</div>

				<h1>Welcome back</h1>
				<p>Log in to continue your practice.</p>

				<button className="social-button" type="button">Continue with Google</button>
				<button className="social-button" type="button">Continue with Apple</button>

				<div className="sign-in-divider"><span>or</span></div>

				<form>
					<label htmlFor="email">Email</label>
					<input id="email" type="email" placeholder="Enter your name" />

					<label htmlFor="password">Password</label>
					<input id="password" type="password" placeholder="***********" />

					<button className="submit-button" type="submit">Log in</button>
				</form>

				<button className="create-account-button" type="button">Create account</button>
			</section>
		</main>
	)
}

export default SignIn
