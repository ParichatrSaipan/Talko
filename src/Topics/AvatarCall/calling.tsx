import orangeCharacter from '../../assets/Character_Orange.svg'
import purpleCharacter from '../../assets/Character_Purple.svg'
import yellowCharacter from '../../assets/Character_Yellow.svg'
import crossIcon from '../../assets/icon_cross.svg'
import phoneIcon from '../../assets/icon_Phone.svg'
import './Calling.css'

type CallComponentProps = {
	onDecline: () => void
	onAccept: () => void
	title?: string
	practiceItems?: string[]
	characterVariant?: 'work' | 'interview' | 'travel'
}

const defaultPracticeItems = [
	'Understanding the situation',
	'Responding naturally',
	'Asking a follow up question',
]

function CallComponent({
	onDecline,
	onAccept,
	title = 'Introduce Yourself',
	practiceItems = defaultPracticeItems,
	characterVariant = 'work',
}: CallComponentProps) {
	const characterImages = {
		work: orangeCharacter,
		interview: purpleCharacter,
		travel: yellowCharacter,
	}
	const characterImage = characterImages[characterVariant]

	return (
		<main className="call-page">
			<h1>Talko is calling...</h1>

			<section className="call-practice-card">
				<div className="call-practice-copy">
					<h2>{title}</h2>
					<p>You'll practice :</p>
					<ul>
						{practiceItems.map((item) => <li key={item}>{item}</li>)}
					</ul>
				</div>
				<img
					className={`call-character call-character--${characterVariant}`}
					src={characterImage}
					alt=""
				/>
			</section>

			<div className="call-actions">
				<button className="call-action call-action--decline" type="button" onClick={onDecline} aria-label="Decline call">
					<img className="call-icon" src={crossIcon} alt="" />
				</button>
				<button className="call-action call-action--accept" type="button" onClick={onAccept} aria-label="Accept call">
					<img className="call-icon" src={phoneIcon} alt="" />
				</button>
			</div>
		</main>
	)
}

export default CallComponent
