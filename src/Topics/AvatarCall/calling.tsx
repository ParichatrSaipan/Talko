import purpleCharacter from '../../assets/Character_Purple.svg'
import yellowCharacter from '../../assets/Character_Yellow.svg'
import OrangeCharacter from '../AvatarTalk/OrangeCharacter'
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
	return (
		<main className="call-page">
			<h1 aria-label="Talko is calling...">
				Talko is calling
				<span className="calling-dots" aria-hidden="true">
					<span>.</span><span>.</span><span>.</span>
				</span>
			</h1>

			<section className="call-practice-card">
				<div className="call-practice-copy">
					<h2>{title}</h2>
					<p>You'll practice :</p>
					<ul>
						{practiceItems.map((item) => <li key={item}>{item}</li>)}
					</ul>
				</div>
				{characterVariant === 'interview' ? (
					<OrangeCharacter className={`call-character call-character--${characterVariant}`} />
				) : (
					<img
						className={`call-character call-character--${characterVariant}`}
						src={characterVariant === 'work' ? purpleCharacter : yellowCharacter}
						alt=""
					/>
				)}
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
