import { useState } from 'react'
import '../Font/Fonts.css'
import './LanguageLevelTest.css'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'

const questions = [
  {
    beforeBlank: 'If I ',
    afterBlank: ' enough money,',
    nextLine: 'I would travel around Europe.',
    answers: ['have', 'had', 'will have', 'having'],
  },
  {
    beforeBlank: 'She ',
    afterBlank: ' English every day.',
    nextLine: '',
    answers: ['study', 'studies', 'studied', 'studying'],
  },
]

const answerLetters = ['A', 'B', 'C', 'D']
const totalQuestions = 15

function LevelTest({ onBack, onNext, onMenuNavigate }: { onBack: () => void; onNext: () => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    () => questions.map(() => null),
  )

  const question = questions[questionIndex]
  const progress = Math.round((questionIndex / totalQuestions) * 100)

  function selectAnswer(answer: string) {
    setSelectedAnswers((currentAnswers) => {
      const nextAnswers = [...currentAnswers]
      nextAnswers[questionIndex] = answer
      return nextAnswers
    })
  }

  function goBack() {
    if (questionIndex === 0) {
      onBack()
      return
    }

    setQuestionIndex((currentIndex) => currentIndex - 1)
  }

  function goNext() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((currentIndex) => currentIndex + 1)
      return
    }

    onNext()
  }

  return (
    <main className="level-test-page">
      <Header onMenuNavigate={onMenuNavigate} />

      <section className="level-test-content">
        <div className="level-test-progress-labels">
          <span>Question {questionIndex + 1} of {totalQuestions}</span>
          <span>{progress}%</span>
        </div>
        <div className="level-test-progress-track" aria-label={`${progress} percent complete`}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="level-test-question" aria-live="polite">
          &quot;{question.beforeBlank}<span>______</span>{question.afterBlank}
          {question.nextLine && <><br />{question.nextLine}</>}&quot;
        </div>

        <div className="level-test-answers" role="group" aria-label="Answer choices">
          {question.answers.map((answer, answerIndex) => (
            <button
              className={`level-test-answer${selectedAnswers[questionIndex] === answer ? ' is-selected' : ''}`}
              key={answer}
              type="button"
              onClick={() => selectAnswer(answer)}
            >
              <span className="level-test-letter">{answerLetters[answerIndex]}</span>
              <span>{answer}</span>
            </button>
          ))}
        </div>

        <div className="level-test-navigation">
          {questionIndex > 0 && (
            <button className="level-test-back" type="button" onClick={goBack}>Back</button>
          )}
          <button className="level-test-next" type="button" onClick={goNext}>Next</button>
        </div>
      </section>
    </main>
  )
}

export default LevelTest
