import characterResult from '../assets/Character_Result.svg'
import '../Font/Fonts.css'
import './CEFRTest.css'

function CEFRResultPage({ onContinue }: { onContinue: () => void }) {
	return (
		<main className="level-result-page">
			<img className="level-result-character" src={characterResult} alt="Talko character" />
			<span className="level-result-level">B1</span>
			<div className="level-result-content">
					<p className="level-result-eyebrow">YOUR ESTIMATED LEVEL</p>
					<h1>Intermediate</h1>

					<button className="level-result-continue" type="button" onClick={onContinue}>Continue</button>
			</div>
		</main>
	)
}

export default CEFRResultPage
