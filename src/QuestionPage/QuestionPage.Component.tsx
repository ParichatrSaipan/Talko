import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import './QuestionPage.Coponent.css'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'

type QuestionPageProps = {
  title: ReactNode
  description?: ReactNode
  onBack: () => void
  type?: 'options' | 'text'
  options?: string[]
  onSelect?: (option: string) => void
  placeholder?: string
  onContinue?: (value: string) => void
  onMenuNavigate?: (destination: MenuDestination) => void
  showMenu?: boolean
}


function QuestionPage({
  title,
  description,
  options = [],
  onBack,
  type = 'options',
  onSelect,
  placeholder,
  onContinue,
  onMenuNavigate,
  showMenu = false,
}: QuestionPageProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [value, setValue] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedValue = value.trim()

    if (!normalizedValue) return

    onContinue?.(normalizedValue)
  }

  return (
    <main className={`question-page${description ? ' question-page--with-description' : ''}`}>
      <Header onMenuNavigate={onMenuNavigate} showMenu={showMenu} />

      <section className="question-content">
        <button className="question-back-button" type="button" onClick={onBack} aria-label="Go back">
          <span className="question-back-icon" aria-hidden="true" />
        </button>

        <h1>{title}</h1>

        {description && <p className="question-description">{description}</p>}

        {type === 'text' ? (
          <form className="name-form" onSubmit={handleSubmit}>
            <input
              aria-label="Your name"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            />
            <button type="submit" disabled={!value.trim()}>Continue</button>
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
