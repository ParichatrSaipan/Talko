import { useState } from 'react'
import Home from './Home/Home'
import SignIn from './SignIn/SignIn'
import Age from './QuestionPage/Age'
import Gender from './QuestionPage/Gender'
import Name from './QuestionPage/Name'
import LanguageLevel from './LanguageLevel/LanguageLevel'
import LevelTest from './LanguageLevel/LevelTest'
import LevelTestResult from './LanguageLevel/LevelTest.Result'
import ChooseTopics from './Topics/ChooseTopics'
import MainInterview from './Topics/MainTopics/MainInterview'
import MainWork from './Topics/MainTopics/MainWork'
import MainTravel from './Topics/MainTopics/MainTravel'

function App() {
  const [page, setPage] = useState<'home' | 'sign-in' | 'age' | 'gender' | 'name' | 'language-level' | 'level-test' | 'level-result' | 'topics' | 'main-topics' | 'main-work' | 'main-travel'>('topics')

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

  if (page === 'level-result') {
    return <LevelTestResult onBack={() => setPage('level-test')} />
  }

  if (page === 'main-topics') {
	return <MainInterview />
  }

  if (page === 'main-work') {
    return <MainWork />
  }

  if (page === 'main-travel') {
    return <MainTravel />
  }

  return <ChooseTopics onInterviewSelect={() => setPage('main-topics')} onWorkSelect={() => setPage('main-work')} onTravelSelect={() => setPage('main-travel')} />
}

export default App
