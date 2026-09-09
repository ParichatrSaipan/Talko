import characterResult from '../assets/Character_Result.svg'
import '../Font/Fonts.css'
import './LanguageLevel.css'

function LevelTestResult({ onBack }: { onBack: () => void }) {
	return (
		<main className="level-result-page">
			<img className="level-result-character" src={characterResult} alt="Talko character" />
			<span className="level-result-level">B1</span>
			<div className="level-result-content">
					<p className="level-result-eyebrow">YOUR ESTIMATED LEVEL</p>
					<h1>Intermediate</h1>
					<p className="level-result-description">
						You can communicate in familiar situations and<br />
						express your ideas with reasonable confidence.
					</p>

					<section className="level-result-section">
						<h2>STRENGTHS</h2>
						<ul>
							<li>Everyday vocabulary</li>
							<li>Basic sentence structure</li>
						</ul>
					</section>

					<section className="level-result-section level-result-improve">
						<h2>AREAS TO IMPROVE</h2>
						<ul>
							<li>Speaking fluency</li>
							<li>Complex sentence construction</li>
						</ul>
					</section>

					<button className="level-result-continue" type="button" onClick={onBack}>Continue</button>
			</div>
		</main>
	)
}

export default LevelTestResult
