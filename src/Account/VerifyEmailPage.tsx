import AuthCard from './AuthCard.Component'
import './VerifyEmailPage.css'

function VerifyEmailPage() {
  return (
    <main className="verify-email-page">
      <AuthCard className="verify-email-card">
        <h1>Verify the email</h1>

        <section className="verify-email-content">
          <h2>Email sent !</h2>
          <p>
            Please check your email and open the link with instructions we sent to continue.
            Please check your spam folder if you did not receive it.
          </p>
        </section>
      </AuthCard>
    </main>
  )
}

export default VerifyEmailPage
