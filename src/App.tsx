import { useState } from 'react'
import Home from './GetStarted/GetStarted'
import SignIn from './SignIn/SignIn'
import Age from './QuestionPage/Age'
import Gender from './QuestionPage/Gender'
import Name from './QuestionPage/Name'
import Job from './QuestionPage/Job'
import RoleInterested from './QuestionPage/RoleInterested'
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
import { MenuSelection } from './Hamburger/MenuSelection'
import MainHome from './Topics/MainHome/MainHome'
import ProfileUser from './Profile/ProfileUser'
import EditJob from './Profile/EditJob'
import Practice from './Practice/Practice'
import Vocab from './Vocab/Vocab'
import CreateAccount from './CreateAccount/CreateAccount'
import type { TopicCard } from './Topics/MainTopics/MainTopics.Component'

type Page = 'home' | 'sign-in' | 'create-account' | 'age' | 'gender' | 'name' | 'work' | 'role-interested' | 'language-level' | 'level-test' | 'level-result' | 'topics' | 'main-home' | 'main-topics' | 'main-work' | 'main-travel' | 'call' | 'talk' | 'avatar-result' | 'profile' | 'edit-profile' | 'practice' | 'vocab'

const jobRoleStorageKey = 'talko.jobRole'
const interviewRoleStorageKey = 'talko.interviewRole'

function getStoredJobRole() {
  try {
    return localStorage.getItem(jobRoleStorageKey)?.trim() ?? ''
  } catch {
    return ''
  }
}

function storeJobRole(role: string) {
  try {
    if (role.trim()) localStorage.setItem(jobRoleStorageKey, role)
    else localStorage.removeItem(jobRoleStorageKey)
  } catch {
    // Keep the role available in the current session when storage is unavailable.
  }
}

function getStoredInterviewRole() {
  try {
    return localStorage.getItem(interviewRoleStorageKey)?.trim() ?? ''
  } catch {
    return ''
  }
}

function storeInterviewRole(role: string) {
  try {
    if (role.trim()) localStorage.setItem(interviewRoleStorageKey, role)
    else localStorage.removeItem(interviewRoleStorageKey)
  } catch {
    // Keep the role available in the current session when storage is unavailable.
  }
}

function getActiveMenuDestination(page: Page, topicReturnPage: 'main-topics' | 'main-work' | 'main-travel'): MenuDestination | null {
  if (page === 'main-home' || page === 'topics') return 'home'
  if (page === 'role-interested' || page === 'main-topics') return 'interview'
  if (page === 'work' || page === 'main-work') return 'work'
  if (page === 'main-travel') return 'travel'
  if (page === 'vocab') return 'vocabulary'
  if (page === 'profile' || page === 'edit-profile' || page === 'practice') return 'profile'
  if (page === 'call' || page === 'talk' || page === 'avatar-result') {
    return topicReturnPage === 'main-work' ? 'work' : topicReturnPage === 'main-travel' ? 'travel' : 'interview'
  }
  return null
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [topicReturnPage, setTopicReturnPage] = useState<'main-topics' | 'main-work' | 'main-travel'>('main-topics')
  const [selectedTopic, setSelectedTopic] = useState<TopicCard | null>(null)
  const [profileName, setProfileName] = useState('Alex')
  const [profileRole, setProfileRole] = useState(getStoredJobRole)
  const [interviewRole, setInterviewRole] = useState(getStoredInterviewRole)

  function startTopic(returnPage: 'main-topics' | 'main-work' | 'main-travel', topic: TopicCard) {
    setTopicReturnPage(returnPage)
    setSelectedTopic(topic)
    setPage('call')
  }

  function openWork() {
    if (profileRole.trim()) {
      setPage('main-work')
      return
    }

    setPage('work')
  }

  function openInterview() {
    if (interviewRole.trim()) {
      setPage('main-topics')
      return
    }

    setPage('role-interested')
  }

  function navigateFromMenu(destination: MenuDestination) {
    if (destination === 'home') setPage('main-home')
    if (destination === 'interview') openInterview()
    if (destination === 'work') openWork()
    if (destination === 'travel') setPage('main-travel')
    if (destination === 'vocabulary') setPage('vocab')
    if (destination === 'profile') setPage('profile')
    if (destination === 'logout') {
      setProfileRole('')
      storeJobRole('')
      setInterviewRole('')
      storeInterviewRole('')
      setPage('home')
    }
  }

  function renderPage() {
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
    return (
      <Name
        onBack={() => setPage('gender')}
        onContinue={(name) => {
          setProfileName(name)
          setPage('language-level')
        }}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'work') {
    return (
      <Job
        onBack={() => setPage('main-home')}
        onContinue={(role) => {
          setProfileRole(role)
          storeJobRole(role)
          setPage('main-work')
        }}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'role-interested') {
    return (
      <RoleInterested
        onBack={() => setPage('main-home')}
        onContinue={(roleInterest) => {
          setInterviewRole(roleInterest)
          storeInterviewRole(roleInterest)
          setPage('main-topics')
        }}
        onMenuNavigate={navigateFromMenu}
      />
    )
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
    return <MainHome username={profileName} onInterviewSelect={openInterview} onWorkSelect={openWork} onTravelSelect={() => setPage('main-travel')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'profile') {
    return <ProfileUser username={profileName} role={profileRole} roleInterest={interviewRole} onPracticeSelect={() => setPage('practice')} onEdit={() => setPage('edit-profile')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'edit-profile') {
    return (
      <EditJob
        username={profileName}
        role={profileRole}
        roleInterest={interviewRole}
        onSave={(username, role, roleInterest) => {
          setProfileName(username)
          setProfileRole(role)
          storeJobRole(role)
          setInterviewRole(roleInterest)
          storeInterviewRole(roleInterest)
          setPage('profile')
        }}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'practice') {
    return <Practice onBack={() => setPage('profile')} onTravelSelect={() => setPage('main-travel')} onWorkSelect={openWork} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'vocab') {
    return <Vocab onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-topics') {
  return <MainInterview onTopicSelect={(topic) => startTopic('main-topics', topic)} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-work') {
    return <MainWork onTopicSelect={(topic) => startTopic('main-work', topic)} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'main-travel') {
    return <MainTravel onTopicSelect={(topic) => startTopic('main-travel', topic)} onMenuNavigate={navigateFromMenu} />
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
        title={selectedTopic?.title}
        practiceItems={selectedTopic?.practiceItems}
        onDecline={() => setPage(topicReturnPage)}
        onAccept={() => setPage('talk')}
      />
    )
  }

  if (page === 'talk') {
    return (
      <Talk
        variant={topicReturnPage === 'main-work' ? 'work' : topicReturnPage === 'main-topics' ? 'interview' : 'default'}
        onBack={() => setPage('call')}
        onFinish={() => setPage('avatar-result')}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'avatar-result') {
    return <AvatarResult onContinue={() => setPage(topicReturnPage)} onMenuNavigate={navigateFromMenu} />
  }

  return <ChooseTopics onInterviewSelect={openInterview} onWorkSelect={openWork} onTravelSelect={() => setPage('main-travel')} onMenuNavigate={navigateFromMenu} />
  }

  return (
    <MenuSelection.Provider value={getActiveMenuDestination(page, topicReturnPage)}>
      {renderPage()}
    </MenuSelection.Provider>
  )
}

export default App
