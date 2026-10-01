import QuestionPage from './QuestionPage.Component'
import type { MenuDestination } from '../Hamburger/Menu'

type JobProps = {
	onBack: () => void
	onContinue: (role: string) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function Job({ onBack, onContinue, onMenuNavigate }: JobProps) {
	return (
		<QuestionPage
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

export default Job
