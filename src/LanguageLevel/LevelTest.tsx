import { useState } from 'react'
import '../Font/Fonts.css'
import './LanguageLevel.css'

const answers = [
  { letter: 'A', text: 'have' },
  { letter: 'B', text: 'had' },
  { letter: 'C', text: 'will have' },
  { letter: 'D', text: 'having' },
]

function LevelTest({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  return (
    <main className="level-test-page">
      <header className="level-test-header">
        <div className="level-test-brand">
          <span className="level-test-brand-mark" aria-hidden="true">
            <i />
          </span>
          <span>Talko</span>
        </div>
      </header>

      <section className="level-test-content">
        <div className="level-test-progress-labels">
          <span>Question 7 of 15</span>
          <span>47%</span>
        </div>
        <div className="level-test-progress-track" aria-label="47 percent complete">
          <span />
        </div>

        <div className="level-test-question">
          &quot;If I <span>______</span> enough money,<br />
          I would travel around Europe.&quot;
        </div>

        <div className="level-test-answers" role="group" aria-label="Answer choices">
          {answers.map((answer) => (
            <button
              className={`level-test-answer${selectedAnswer === answer.letter ? ' is-selected' : ''}`}
              key={answer.letter}
              type="button"
              onClick={() => setSelectedAnswer(answer.letter)}
            >
              <span className="level-test-letter">{answer.letter}</span>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>

        <div className="level-test-navigation">
          <button className="level-test-back" type="button" onClick={onBack}>Back</button>
          <button className="level-test-next" type="button" onClick={onNext}>Next</button>
        </div>
      </section>
    </main>
  )
}

export default LevelTest