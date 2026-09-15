import QuestionPage from './QuestionPage.Component'
import type { MenuDestination } from '../Hamburger/Menu'

function Work({ onBack, onContinue, onMenuNavigate }: { onBack: () => void; onContinue: () => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
	return (
		<QuestionPage
			title={<>What do you do for work?</>}
			type="text"
			placeholder="Enter your job or role"
			onBack={onBack}
			onContinue={onContinue}
			onMenuNavigate={onMenuNavigate}
		/>
	)
}

export default Work
