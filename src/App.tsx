import { useState } from 'react'
import Home from './Home/Home'
import SignIn from './SignIn/SignIn'
import Age from './QuestionPage/Age'
import Gender from './QuestionPage/Gender'
import Name from './QuestionPage/Name'
import LanguageLevel from './LanguageLevel/LanguageLevel'
import LevelTest from './LanguageLevel/LevelTest'
import LevelTestResult from './LanguageLevel/LevelTest.Result'

function App() {
  const [page, setPage] = useState<'home' | 'sign-in' | 'age' | 'gender' | 'name' | 'language-level' | 'level-test' | 'level-result'>('home')

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

  if (page === 'language-level') {
    return <LanguageLevel onBack={() => setPage('name')} onContinue={() => setPage('level-test')} />
  }

  if (page === 'level-test') {
    return <LevelTest onBack={() => setPage('language-level')} onNext={() => setPage('level-result')} />
  }

  return <LevelTestResult onBack={() => setPage('level-test')} />
}

export default App
