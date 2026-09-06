import { useState } from 'react'
import Home from './Home/Home'
import SignIn from './SignIn/SignIn'
import Age from './QuestionPage/Age'
import Gender from './QuestionPage/Gender'
import Name from './QuestionPage/Name'
import LanguageLevel from './language_level/LanguageLevel'

function App() {
  const [page, setPage] = useState<'home' | 'sign-in' | 'age' | 'gender' | 'name' | 'language-level'>('home')

  if (page === 'home') {
    return <Home onSignIn={() => setPage('sign-in')} />
  }

  if (page === 'sign-in') {
    return <SignIn onCreateAccount={() => setPage('age')} />
  }

  if (page === 'age') {
    return (
      <Age
        onBack={() => setPage('sign-in')}
        onSelect={() => setPage('gender')}
      />
    )
  }

  if (page === 'gender') {
    return (
      <Gender
        onBack={() => setPage('age')}
        onSelect={() => setPage('name')}
      />
    )
  }

  if (page === 'name') {
    return <Name onBack={() => setPage('gender')} onContinue={() => setPage('language-level')} />
  }

  return <LanguageLevel onBack={() => setPage('name')} />
}

export default App
