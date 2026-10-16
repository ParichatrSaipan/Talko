import OnboardingLayout from './OnboardingLayout.Component'
import type { MenuDestination } from '../Hamburger/Menu'

type RoleInterestedPageProps = {
	onBack: () => void
	onContinue: (roleInterest: string) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function RoleInterestedPage({ onBack, onContinue, onMenuNavigate }: RoleInterestedPageProps) {
	return (
		<OnboardingLayout
			title={<>What role are you<br />interested in?</>}
			description={<>Tell us what you&apos;re aiming for, so we can tailor your<br />interview practice.</>}
			type="text"
			placeholder="Enter your role or goal"
			onBack={onBack}
			onContinue={onContinue}
			onMenuNavigate={onMenuNavigate}
		/>
	)
}

export default RoleInterestedPage
