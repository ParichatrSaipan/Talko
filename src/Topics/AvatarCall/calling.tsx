import orangeCharacter from '../../assets/Character_Orange.svg'
import crossIcon from '../../assets/icon_cross.svg'
import phoneIcon from '../../assets/icon_Phone.svg'
import './Calling.css'

type CallComponentProps = {
	onDecline: () => void
	onAccept: () => void
}

function CallComponent({ onDecline, onAccept }: CallComponentProps) {
	return (
		<main className="call-page">
			<h1>Talko is calling..</h1>
			<img className="call-character" src={orangeCharacter} alt="" />
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
