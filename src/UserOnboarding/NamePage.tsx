import OnboardingLayout from './OnboardingLayout.Component'
import type { MenuDestination } from '../Hamburger/Menu'

function NamePage({ onBack, onContinue, onMenuNavigate }: { onBack: () => void; onContinue: (name: string) => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
	return (
		<OnboardingLayout
			title={<>What name should we<br />call you?</>}
			type="text"
			placeholder="Enter your name"
			onBack={onBack}
			onContinue={onContinue}
			onMenuNavigate={onMenuNavigate}
		/>
	)
}

export default NamePage
