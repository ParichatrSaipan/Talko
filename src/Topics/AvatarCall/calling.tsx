import { useState } from 'react'
import orangeCharacter from '../../assets/Character_Orange.svg'
import crossIcon from '../../assets/icon_cross.svg'
import phoneIcon from '../../assets/icon_Phone.svg'
import './Calling.css'

type CallComponentProps = {
	onDecline: () => void
	onAccept: () => void
}

function CallComponent({ onDecline, onAccept }: CallComponentProps) {
	const [isDeclined, setIsDeclined] = useState(false)
	const [isConnected, setIsConnected] = useState(false)

	function handleDecline() {
		setIsDeclined(true)
		window.setTimeout(onDecline, 150)
	}

	return (
		<main className={`call-page ${isConnected ? 'is-connected' : ''}`}>
			<h1>Talko is calling..</h1>
			<img className="call-character" src={orangeCharacter} alt="" />
			<div className="call-actions">
				<button className={`call-action call-action--decline ${isDeclined ? 'is-pressed' : ''}`} type="button" onClick={handleDecline} aria-label="Decline call">
					<img className="call-icon" src={crossIcon} alt="" />
				</button>
				<button className={`call-action call-action--accept ${isConnected ? 'is-pressed' : ''}`} type="button" onClick={() => { setIsConnected(true); onAccept() }} aria-label="Accept call">
					<img className="call-icon" src={phoneIcon} alt="" />
				</button>
			</div>
			{isConnected && <p className="call-status">Connected</p>}
		</main>
	)
}

export default CallComponent
