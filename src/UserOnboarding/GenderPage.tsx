import OnboardingLayout from './OnboardingLayout.Component'
import type { MenuDestination } from '../Hamburger/Menu'

function GenderPage({ onBack, onSelect, onMenuNavigate }: { onBack: () => void; onSelect: (option: string) => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
  return (
    <OnboardingLayout
      title="What is your gender?"
      options={['Male', 'Female', 'Prefer not to say']}
      onBack={onBack}
      onSelect={onSelect}
      onMenuNavigate={onMenuNavigate}
    />
  )
}

export default GenderPage
