import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import GetStartedPage from './GetStarted/GetStartedPage'
import SignInAccountPage from './Account/SignInAccountPage'
import AgePage from './UserOnboarding/AgePage'
import GenderPage from './UserOnboarding/GenderPage'
import NamePage from './UserOnboarding/NamePage'
import RolePage from './UserOnboarding/RolePage'
import RoleInterestedPage from './UserOnboarding/RoleInterestedPage'
import CEFRLandingPage from './CEFRTest/CEFRLandingPage'
import CEFRTestPage from './CEFRTest/CEFRTestPage'
import CEFRResultPage from './CEFRTest/CEFRResultPage'
import ChooseTopics from './Topics/ChooseTopics/ChooseTopics'
import MainInterview from './Topics/MainTopics/MainInterview'
import MainWork from './Topics/MainTopics/MainWork'
import MainTravel from './Topics/MainTopics/MainTravel'
import AvatarCallingPage from './Topics/AvatarCall/AvatarCallingPage'
import Talk from './Topics/AvatarTalk/Talk'
import AvatarResultPage from './Topics/AvatarResult/AvatarResultPage'
import type { MenuDestination } from './Hamburger/Menu'
import { MenuSelection } from './Hamburger/MenuSelection'
import MainHome from './Topics/MainHome/MainHome'
import ProfileUserPage from './Profile/ProfileUserPage'
import EditJobPage from './Profile/EditJobPage'
import RecentPracticePage from './RecentPractice/RecentPracticePage'
import VocabPage from './Vocab/VocabPage'
import CreateAccountPage from './Account/CreateAccountPage'
import ForgotPasswordPage from './Account/ForgotPasswordPage'
import VerifyEmailPage from './Account/VerifyEmailPage'
import CreateNewPwPage from './Account/CreateNewPwPage'
import type { TopicCard } from './Topics/MainTopics/MainTopics.Component'

type Page = 'home' | 'sign-in' | 'create-account' | 'reset-password' | 'verify-email' | 'create-new-password' | 'age' | 'gender' | 'name' | 'work' | 'role-interested' | 'language-level' | 'level-test' | 'level-result' | 'topics' | 'main-home' | 'main-topics' | 'main-work' | 'main-travel' | 'call' | 'talk' | 'avatar-result' | 'profile' | 'edit-profile' | 'practice' | 'vocab'

const pagePaths: Record<Page, string> = {
  home: '/get-started',
  'sign-in': '/sign-in',
  'create-account': '/create-account',
  'reset-password': '/reset-password',
  'verify-email': '/verify-email',
  'create-new-password': '/create-new-password',
  age: '/onboarding/age',
  gender: '/onboarding/gender',
  name: '/onboarding/name',
  work: '/work/setup',
  'role-interested': '/interview/role',
  'language-level': '/level',
  'level-test': '/level/test',
  'level-result': '/level/result',
  topics: '/topics',
  'main-home': '/home',
  'main-topics': '/interview',
  'main-work': '/work',
  'main-travel': '/travel',
  call: '/call',
  talk: '/talk',
  'avatar-result': '/result',
  profile: '/profile',
  'edit-profile': '/profile/edit',
  practice: '/practice',
  vocab: '/vocabulary',
}

const pagesByPath = Object.fromEntries(
  Object.entries(pagePaths).map(([page, path]) => [path, page as Page]),
) as Record<string, Page>

function getPageFromPath(pathname = window.location.pathname): Page {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return pagesByPath[normalizedPath] ?? 'home'
}

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
  const [page, setPage] = useState<Page>(getPageFromPath)
  const [topicReturnPage, setTopicReturnPage] = useState<'main-topics' | 'main-work' | 'main-travel'>('main-topics')
  const [selectedTopic, setSelectedTopic] = useState<TopicCard | null>(null)
  const [profileName, setProfileName] = useState('Alex')
  const [profileRole, setProfileRole] = useState(getStoredJobRole)
  const [interviewRole, setInterviewRole] = useState(getStoredInterviewRole)

  useEffect(() => {
    function handlePopState() {
      setPage(getPageFromPath())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const nextPath = pagePaths[page]
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page }, '', nextPath)
    }
  }, [page])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setPage((current) => (current === 'home' || current === 'sign-in' ? 'main-home' : current))
      }
    })
    const { data: sub } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession) {
        setPage((current) => (current === 'home' || current === 'sign-in' ? 'main-home' : current))
      } else if (event === 'SIGNED_OUT') {
        setPage('home')
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [])

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
      supabase.auth.signOut()
      setPage('home')
    }
  }

  function renderPage() {
  if (page === 'home') {
    return <GetStartedPage onSignIn={() => setPage('sign-in')} />
  }

  if (page === 'sign-in') {
    return <SignInAccountPage onCreateAccount={() => setPage('create-account')} onForgotPassword={() => setPage('reset-password')} onLogin={() => setPage('main-home')} />
  }

  if (page === 'create-account') {
    return <CreateAccountPage onCreateAccount={() => setPage('age')} />
  }

  if (page === 'reset-password') {
    return <ForgotPasswordPage onCreateAccount={() => setPage('create-account')} onSubmitEmail={() => setPage('verify-email')} />
  }

  if (page === 'verify-email') {
    return <VerifyEmailPage />
  }

  if (page === 'create-new-password') {
    return <CreateNewPwPage onResetPassword={() => setPage('sign-in')} />
  }

  if (page === 'age') {
    return (
      <AgePage
        onBack={() => setPage('sign-in')}
        onSelect={() => setPage('gender')}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'gender') {
    return (
      <GenderPage
        onBack={() => setPage('age')}
        onSelect={() => setPage('name')}
        onMenuNavigate={navigateFromMenu}
      />
    )
  }

  if (page === 'name') {
    return (
      <NamePage
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
      <RolePage
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
      <RoleInterestedPage
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
    return <CEFRLandingPage onBack={() => setPage('name')} onContinue={() => setPage('level-test')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'level-test') {
    return <CEFRTestPage onBack={() => setPage('language-level')} onNext={() => setPage('level-result')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'level-result') {
    return <CEFRResultPage onContinue={() => setPage('topics')} />
  }

  if (page === 'main-home') {
    return <MainHome username={profileName} onInterviewSelect={openInterview} onWorkSelect={openWork} onTravelSelect={() => setPage('main-travel')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'profile') {
    return <ProfileUserPage username={profileName} role={profileRole} roleInterest={interviewRole} onPracticeSelect={() => setPage('practice')} onEdit={() => setPage('edit-profile')} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'edit-profile') {
    return (
      <EditJobPage
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
    return <RecentPracticePage onBack={() => setPage('profile')} onTravelSelect={() => setPage('main-travel')} onWorkSelect={openWork} onMenuNavigate={navigateFromMenu} />
  }

  if (page === 'vocab') {
    return <VocabPage onMenuNavigate={navigateFromMenu} />
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
      <AvatarCallingPage
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
    return <AvatarResultPage onContinue={() => setPage(topicReturnPage)} onMenuNavigate={navigateFromMenu} />
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
