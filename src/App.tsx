import { useState } from 'react'
import Home from './Home/Home'
import SignIn from './SignIn/SignIn'

function App() {
  const [page, setPage] = useState<'home' | 'sign-in'>('home')

  return page === 'home'
    ? <Home onSignIn={() => setPage('sign-in')} />
    : <SignIn />
}

export default App
