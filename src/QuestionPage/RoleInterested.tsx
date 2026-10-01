import QuestionPage from './QuestionPage.Component'
import type { MenuDestination } from '../Hamburger/Menu'

type RoleInterestedProps = {
	onBack: () => void
	onContinue: (roleInterest: string) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function RoleInterested({ onBack, onContinue, onMenuNavigate }: RoleInterestedProps) {
	return (
		<QuestionPage
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

export default RoleInterested
