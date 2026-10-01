import { useState } from 'react'
import Home from './GetStarted/GetStarted'
import SignIn from './SignIn/SignIn'
import Age from './QuestionPage/Age'
import Gender from './QuestionPage/Gender'
import Name from './QuestionPage/Name'
import Work from './QuestionPage/Work'
import LanguageLevel from './LanguageLevelTest/LanguageLevelStart'
import LevelTest from './LanguageLevelTest/LevelTest'
import LevelTestResult from './LanguageLevelTest/LevelTest.Result'
import ChooseTopics from './Topics/ChooseTopics/ChooseTopics'
import MainInterview from './Topics/MainTopics/MainInterview'
import MainWork from './Topics/MainTopics/MainWork'
import MainTravel from './Topics/MainTopics/MainTravel'
import CallComponent from './Topics/AvatarCall/Calling'
import Talk from './Topics/AvatarTalk/Talk'
import AvatarResult from './Topics/AvatarResult/AvatarResult'
import type { MenuDestination } from './Hamburger/Menu'
import MainHome from './Topics/MainHome/MainHome'
import ProfileUser from './Profile/ProfileUser'
import EditJob from './Profile/EditJob'
import Practice from './Practice/Practice'
import Vocab from './Vocab/Vocab'
import CreateAccount from './CreateAccount/CreateAccount'

function App() {
  const [page, setPage] = useState<'home' | 'sign-in' | 'create-account' | 'age' | 'gender' | 'name' | 'work' | 'language-level' | 'level-test' | 'level-result' | 'topics' | 'main-home' | 'main-topics' | 'main-work' | 'main-travel' | 'call' | 'talk' | 'avatar-result' | 'profile' | 'edit-profile' | 'practice' | 'vocab'>('home')
  const [topicReturnPage, setTopicReturnPage] = useState<'main-topics' | 'main-work' | 'main-travel'>('main-topics')
  const [profileName, setProfileName] = useState('Alex')
  const [profileRole, setProfileRole] = useState('Engineering')

  function startTopic(returnPage: 'main-topics' | 'main-work' | 'main-travel') {
    setTopicReturnPage(returnPage)
    setPage('call')
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
    return <SignIn onCreateAccount={() => setPage('create-account')} onLogin={() => setPage('main-home')} />
  }

  if (page === 'create-account') {
    return <CreateAccount onCreateAccount={() => setPage('age')} />
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
    return <ProfileUser username={profileName} role={profileRole} onEdit={() => setPage('edit-profile')} onTravelSelect={() => setPage('main-travel')} onWorkSelect={() => setPage('main-work')} onPracticeSelect={() => setPage('practice')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'edit-profile') {
    return (
      <EditJob
        username={profileName}
        role={profileRole}
        onSave={(username, role) => {
          setProfileName(username)
          setProfileRole(role)
          setPage('profile')
        }}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'practice') {
    return <Practice onBack={() => setPage('profile')} onTravelSelect={() => setPage('main-travel')} onWorkSelect={() => setPage('main-work')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'vocab') {
    return <Vocab onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-topics') {
  return <MainInterview onTopicSelect={() => startTopic('main-topics')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-work') {
    return <MainWork onTopicSelect={() => startTopic('main-work')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-travel') {
    return <MainTravel onTopicSelect={() => startTopic('main-travel')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'call') {
    const characterVariant = topicReturnPage === 'main-work'
      ? 'work'
      : topicReturnPage === 'main-travel'
        ? 'travel'
        : 'interview'

    return (
      <CallComponent
        characterVariant={characterVariant}
        onDecline={() => setPage(topicReturnPage)}
        onAccept={() => setPage('talk')}
      />
    )
  }

  if (page === 'talk') {
    return <Talk onBack={() => setPage('call')} onFinish={() => setPage('avatar-result')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'avatar-result') {
    return <AvatarResult onContinue={() => setPage(topicReturnPage)} onMenuNavigate={navigateFromMenu} />
  }

  return <ChooseTopics onInterviewSelect={() => setPage('main-topics')} onWorkSelect={() => setPage('work')} onTravelSelect={() => setPage('main-travel')} onMenuNavigate={navigateFromMenu} />
}

export default App
