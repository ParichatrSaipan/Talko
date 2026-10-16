import OnboardingLayout from './OnboardingLayout.Component'
import type { MenuDestination } from '../Hamburger/Menu'

type RolePageProps = {
	onBack: () => void
	onContinue: (role: string) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function RolePage({ onBack, onContinue, onMenuNavigate }: RolePageProps) {
	return (
		<OnboardingLayout
			title={<>What do you do for work?</>}
			description={<>Tell us your job or role<br />
			so we can create questions tailored to your work.</>}
			type="text"
			placeholder="Enter your job or role"
			onBack={onBack}
			onContinue={onContinue}
			onMenuNavigate={onMenuNavigate}
		/>
	)
}

export default RolePage
