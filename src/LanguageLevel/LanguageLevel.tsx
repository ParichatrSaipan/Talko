import characterYellow from '../assets/character_Yellow_Check.svg'
import '../Font/Fonts.css'
import '../QuestionPage/QuestionPage.Coponent.css'
import './LanguageLevel.css'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'

function LanguageLevel({ onBack, onContinue, onMenuNavigate }: { onBack: () => void; onContinue: () => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
  return (
    <main className="question-page language-level-page">
      <Header onMenuNavigate={onMenuNavigate} />

      <section className="language-level-content">
        <button className="question-back-button" type="button" onClick={onBack} aria-label="Go back">
          <span className="question-back-icon" aria-hidden="true" />
        </button>

        <h1>Let&apos;s check your current<br />language level</h1>
        <p>Take a quick test to see where you&apos;re at.<br />It only takes a few minutes.</p>

        <div className="language-level-character">
          <img src={characterYellow} alt="Talko character" />
        </div>

        <button className="language-level-continue" type="button" onClick={onContinue}>Continue</button>
      </section>
    </main>
  )
}

export default LanguageLevel
