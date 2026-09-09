import characterYellow from '../assets/character_Yellow_Check.svg'
import '../Font/Fonts.css'
import '../QuestionPage/QuestionPage.css'
import './LanguageLevel.css'

function LanguageLevel({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <main className="question-page language-level-page">
      <header className="question-header">
        <div className="question-brand">
          <span className="question-brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>Talko</span>
        </div>
      </header>

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