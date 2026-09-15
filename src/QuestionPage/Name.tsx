import QuestionPage from './QuestionPage.Component'
import type { MenuDestination } from '../Hamburger/Menu'

function Name({ onBack, onContinue, onMenuNavigate }: { onBack: () => void; onContinue: () => void; onMenuNavigate?: (destination: MenuDestination) => void }) {
	return (
		<QuestionPage
			title={<>What name should we<br />call you?</>}
			type="text"
			placeholder="Enter your name"
			onBack={onBack}
			onContinue={onContinue}
			onMenuNavigate={onMenuNavigate}
		/>
	)
}

export default Name
