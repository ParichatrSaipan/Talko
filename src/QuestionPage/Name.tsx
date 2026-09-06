import QuestionPage from './QuestionPage'

function Name({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
	return (
		<QuestionPage
			title={<>What name should we<br />call you?</>}
			type="text"
			placeholder="Enter your name"
			onBack={onBack}
			onContinue={onContinue}
		/>
	)
}

export default Name
