import { useLayoutEffect, useRef, useState } from 'react'
import '../Font/Fonts.css'
import './CEFRTest.css'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import { ASSESSMENT_BANK } from './USassessment_bank'

const answerLetters = ['A', 'B', 'C', 'D']
const totalQuestions = Math.min(15, ASSESSMENT_BANK.length)
const questions = Array.from({ length: totalQuestions }, (_, index) => {
  const bankIndex = Math.floor(((index + 0.5) * ASSESSMENT_BANK.length) / totalQuestions)
  return ASSESSMENT_BANK[bankIndex]
})

// onMenuNavigate ยังรับไว้ให้ App ส่งมาได้เหมือนเดิม แต่หน้านี้ไม่แสดงปุ่มเมนูแล้ว
function CEFRTestPage({ onBack, onNext }: { onBack: () => void; onNext: () => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    () => questions.map(() => null),
  )

  const question = questions[questionIndex]
  const progress = Math.round((questionIndex / totalQuestions) * 100)
  const questionRef = useRef<HTMLDivElement>(null)

  // วัดจำนวนบรรทัดของคำถามที่ขนาด 20px ถ้าเกิน 3 บรรทัดให้ใส่ class is-long (ตัว 16px)
  useLayoutEffect(() => {
    const element = questionRef.current
    if (!element) return

    function fitQuestion() {
      if (!element) return
      element.classList.remove('is-long')
      const style = getComputedStyle(element)
      const fontSize = parseFloat(style.fontSize)
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.2
      const textHeight = element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
      element.classList.toggle('is-long', Math.round(textHeight / lineHeight) > 3)
    }

    fitQuestion()
    window.addEventListener('resize', fitQuestion)
    return () => window.removeEventListener('resize', fitQuestion)
  }, [question.question])

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
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((currentIndex) => currentIndex + 1)
      return
    }

    onNext()
  }

  return (
    <main className="level-test-page">
      <Header showMenu={false} />

      <section className="level-test-content">
        <div className="level-test-progress-labels">
          <span>Question {questionIndex + 1} of {totalQuestions}</span>
          <span>{progress}%</span>
        </div>
        <div className="level-test-progress-track" aria-label={`${progress} percent complete`}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="level-test-question" aria-live="polite" ref={questionRef}>
          {question.question}
        </div>

        <div className="level-test-answers" role="group" aria-label="Answer choices">
          {question.options.map((answer, answerIndex) => (
            <button
              className={`level-test-answer${selectedAnswers[questionIndex] === answer ? ' is-selected' : ''}`}
              key={`${question.id}-${answer}`}
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

export default CEFRTestPage
