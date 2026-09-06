import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import './QuestionPage.css'

type QuestionPageProps = {
  title: ReactNode
  onBack: () => void
  type?: 'options' | 'text'
  options?: string[]
  onSelect?: (option: string) => void
  placeholder?: string
  onContinue?: (value: string) => void
}

function QuestionPage({
  title,
  options = [],
  onBack,
  type = 'options',
  onSelect,
  placeholder,
  onContinue,
}: QuestionPageProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [value, setValue] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onContinue?.(value)
  }

  return (
    <main className="question-page">
      <header className="question-header">
        <div className="question-brand">
          <span className="question-brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>Talko</span>
        </div>
      </header>

      <section className="question-content">
        <button className="question-back-button" type="button" onClick={onBack} aria-label="Go back">
          <span className="question-back-icon" aria-hidden="true" />
        </button>

        <h1>{title}</h1>

        {type === 'text' ? (
          <form className="name-form" onSubmit={handleSubmit}>
            <input
              aria-label="Your name"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <button type="submit">Continue</button>
          </form>
        ) : (
          <div className="question-options">
            {options.map((option) => (
              <button
                className={`question-option ${selected === option ? 'is-selected' : ''}`}
                key={option}
                onClick={() => {
                  setSelected(option)
                  onSelect?.(option)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default QuestionPage