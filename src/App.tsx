import { useState } from 'react'
import Home from './GetStarted/GetStarted'
import SignIn from './SignIn/SignIn'
import Age from './QuestionPage/Age'
import Gender from './QuestionPage/Gender'
import Name from './QuestionPage/Name'
import Work from './QuestionPage/Work'
import LanguageLevel from './LanguageLevel/LanguageLevel'
import LevelTest from './LanguageLevel/LevelTest'
import LevelTestResult from './LanguageLevel/LevelTest.Result'
import ChooseTopics from './Topics/ChooseTopics/ChooseTopics'
import MainInterview from './Topics/MainTopics/MainInterview'
import MainWork from './Topics/MainTopics/MainWork'
import MainTravel from './Topics/MainTopics/MainTravel'
import SceneComponent from './Topics/Scene/Scene.component'
import type { TopicCard } from './Topics/MainTopics/MainTopics.Component'
import CallComponent from './Topics/AvatarCall/calling'
import Talk from './Topics/AvatarTalk/Talk'
import AvatarResult from './Topics/AvatarResult/AvatarResult'
import type { MenuDestination } from './Hamburger/Menu'
import MainHome from './Topics/MainHome/MainHome'
import ProfileUser from './Profile/ProfileUser'
import Practice from './Practice/Practice'
import Vocab from './Vocab/Vocab'

function App() {
  const [page, setPage] = useState<'home' | 'sign-in' | 'age' | 'gender' | 'name' | 'work' | 'language-level' | 'level-test' | 'level-result' | 'topics' | 'main-home' | 'main-topics' | 'main-work' | 'main-travel' | 'scene' | 'call' | 'talk' | 'avatar-result' | 'profile' | 'practice' | 'vocab'>('home')
  const [sceneTitle, setSceneTitle] = useState('Introduce Yourself')
  const [scenePracticeItems, setScenePracticeItems] = useState<string[]>([])
  const [sceneBackPage, setSceneBackPage] = useState<'main-topics' | 'main-work' | 'main-travel'>('main-topics')

  function openScene(backPage: 'main-topics' | 'main-work' | 'main-travel', topic: TopicCard) {
    setSceneBackPage(backPage)
    setSceneTitle(topic.sceneTitle)
    setScenePracticeItems(topic.practiceItems)
    setPage('scene')
  }

  function navigateFromMenu(destination: MenuDestination) {
    if (destination === 'home') setPage('main-home')
    if (destination === 'interview') setPage('main-topics')
    if (destination === 'work') setPage('main-work')
    if (destination === 'travel') setPage('main-travel')
    if (destination === 'vocabulary') setPage('vocab')
    if (destination === 'profile') setPage('profile')
    if (destination === 'logout') setPage('home')
  }

  if (page === 'home') {
    return <Home onSignIn={() => setPage('sign-in')} />
  }

  if (page === 'sign-in') {
    return <SignIn onCreateAccount={() => setPage('age')} onLogin={() => setPage('main-home')} />
  }

  if (page === 'age') {
    return (
      <Age
        onBack={() => setPage('sign-in')}
        onSelect={() => setPage('gender')}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'gender') {
    return (
      <Gender
        onBack={() => setPage('age')}
        onSelect={() => setPage('name')}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'name') {
    return <Name onBack={() => setPage('gender')} onContinue={() => setPage('language-level')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'work') {
    return <Work onBack={() => setPage('topics')} onContinue={() => setPage('main-work')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'language-level') {
    return <LanguageLevel onBack={() => setPage('name')} onContinue={() => setPage('level-test')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'level-test') {
    return <LevelTest onBack={() => setPage('language-level')} onNext={() => setPage('level-result')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'level-result') {
    return <LevelTestResult onContinue={() => setPage('topics')} />
  }

  if (page === 'main-home') {
    return <MainHome onInterviewSelect={() => setPage('main-topics')} onWorkSelect={() => setPage('main-work')} onTravelSelect={() => setPage('main-travel')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'profile') {
    return <ProfileUser onTravelSelect={() => setPage('main-travel')} onWorkSelect={() => setPage('main-work')} onPracticeSelect={() => setPage('practice')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'practice') {
    return <Practice onBack={() => setPage('profile')} onTravelSelect={() => setPage('main-travel')} onWorkSelect={() => setPage('main-work')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'vocab') {
    return <Vocab onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-topics') {
  return <MainInterview onTopicSelect={(topic) => openScene('main-topics', topic)} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-work') {
    return <MainWork onTopicSelect={(topic) => openScene('main-work', topic)} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-travel') {
    return <MainTravel onTopicSelect={(topic) => openScene('main-travel', topic)} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'scene') {
    return <SceneComponent title={sceneTitle} practiceItems={scenePracticeItems} onBack={() => setPage(sceneBackPage)} onPractice={() => setPage('call')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'call') {
    return <CallComponent onDecline={() => setPage('scene')} onAccept={() => setPage('talk')} />
  }

  if (page === 'talk') {
    return <Talk onBack={() => setPage('call')} onFinish={() => setPage('avatar-result')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'avatar-result') {
    return <AvatarResult onContinue={() => setPage('scene')} onMenuNavigate={navigateFromMenu} />
  }

  return <ChooseTopics onInterviewSelect={() => setPage('main-topics')} onWorkSelect={() => setPage('work')} onTravelSelect={() => setPage('main-travel')} onMenuNavigate={navigateFromMenu} />
}

export default App
