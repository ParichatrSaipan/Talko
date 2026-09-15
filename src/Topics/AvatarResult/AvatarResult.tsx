import { useState } from 'react'
import './AvatarResult.css'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type AvatarResultProps = {
	onContinue: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const feedbackScores = [
	{ label: 'Clarity', score: 47 },
	{ label: 'Context', score: 47 },
	{ label: 'Continuity', score: 47 },
]

function AvatarResult({ onContinue, onMenuNavigate }: AvatarResultProps) {
	const [isRepeatedWordsOpen, setIsRepeatedWordsOpen] = useState(true)

	return (
		<main className="avatar-result-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<section className="avatar-result-content">
				<h1>Speaking Feedback</h1>

				<div className="avatar-result-score" aria-label="Speaking score: 85, Good">
					<strong>85</strong>
					<span>Good</span>
				</div>

				<p className="avatar-result-summary">
					Your answers were clear and relevant<br />to the situation.
				</p>

				<section className="avatar-result-section" aria-labelledby="communication-title">
					<h2 id="communication-title">Communication</h2>
					<div className="avatar-result-card avatar-result-metrics">
						{feedbackScores.map(({ label, score }) => (
							<div className="avatar-result-metric" key={label}>
								<div className="avatar-result-metric-label">
									<strong>{label}</strong>
									<span>{score}%</span>
								</div>
								<div className="avatar-result-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}>
									<span style={{ width: `${score}%` }} />
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="avatar-result-section" aria-labelledby="improvement-title">
					<h2 id="improvement-title">Needs Improvement</h2>
					<div className="avatar-result-card avatar-result-improvements">
						<div className="avatar-result-improvement">
							<span className="avatar-result-alert" aria-hidden="true">!</span>
							<strong>Long pauses</strong>
							<span>3 times</span>
						</div>
						<button
							className="avatar-result-improvement avatar-result-improvement-toggle"
							type="button"
							onClick={() => setIsRepeatedWordsOpen(!isRepeatedWordsOpen)}
							aria-expanded={isRepeatedWordsOpen}
							aria-controls="repeated-words-feedback"
						>
							<span className="avatar-result-alert" aria-hidden="true">!</span>
							<strong>Repeated words</strong>
							<span>{isRepeatedWordsOpen ? '1 word' : '3 words'}</span>
						</button>
						{isRepeatedWordsOpen && (
							<div className="avatar-result-word-feedback" id="repeated-words-feedback">
								<div className="avatar-result-word-heading">
									<strong>Think</strong>
									<button
										className="avatar-result-word-toggle"
										type="button"
										onClick={() => setIsRepeatedWordsOpen(false)}
										aria-label="Close repeated words feedback"
									>
										<span aria-hidden="true">⌄</span>
									</button>
								</div>
								<p>Try this :</p>
								<ul>
									<li>believe</li>
									<li>consider</li>
								</ul>
							</div>
						)}
					</div>
				</section>

				<button className="avatar-result-continue" type="button" onClick={onContinue}>
					Continue
				</button>
			</section>
		</main>
	)
}

export default AvatarResult
