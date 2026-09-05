import './Home.css'
import characterGroup from '../assets/Character_Group.svg'
import '../Font/Fonts.css'


function Home({ onSignIn }: { onSignIn: () => void }) {
  return (
    <main className="home-page">
      <header className="home-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>Talko</span>
        </div>
        <button className="login-button" type="button" onClick={onSignIn}>Log In</button>
      </header>

      
        <div className="hero-copy">
          <h1>Speak with <strong>confidence.</strong></h1>
          <p>Practice English for the moments<br />that matter.</p>
        </div>
        <div className="characters">
          <img src={characterGroup} alt="Talko characters" />
        </div>
        <div className="welcome-panel">
          <h2>Welcome to Talko!</h2>
          <p>Let&apos;s talk your way to confidence.</p>
          <button className="primary-button" type="button" onClick={onSignIn}>Get Started</button>
          <button className="secondary-button" type="button">Explore</button>
        </div>
    
    </main>
  )
}

export default Home