import { useState } from 'react'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import locationIcon from '../assets/icon_Location.svg'
import computerIcon from '../assets/icon_Computer.svg'
import './Practice.css'

type PracticeProps = {
	onBack: () => void
	onTravelSelect: () => void
	onWorkSelect: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

type PracticeTab = 'in-progress' | 'completed'

function Practice({ onBack, onTravelSelect, onWorkSelect, onMenuNavigate }: PracticeProps) {
	const [activeTab, setActiveTab] = useState<PracticeTab>('in-progress')

	return (
		<main className="practice-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<div className="practice-content">
				<button className="practice-back" type="button" onClick={onBack} aria-label="Back to profile"><span aria-hidden="true">‹</span></button>

				<div className="practice-tabs" role="tablist" aria-label="Practice status">
					<button
						className={activeTab === 'in-progress' ? 'is-active' : ''}
						type="button"
						role="tab"
						aria-selected={activeTab === 'in-progress'}
						onClick={() => setActiveTab('in-progress')}
					>
						In progress
					</button>
					<button
						className={activeTab === 'completed' ? 'is-active' : ''}
						type="button"
						role="tab"
						aria-selected={activeTab === 'completed'}
						onClick={() => setActiveTab('completed')}
					>
						Completed
					</button>
				</div>

				<div className="practice-list" role="tabpanel">
					{activeTab === 'in-progress' ? (
						<button className="practice-card" type="button" onClick={onTravelSelect}>
							<span className="practice-icon" aria-hidden="true"><img src={locationIcon} alt="" /></span>
							<span className="practice-card-copy">
								<strong>Hotel Check-in</strong>
								<small>Travel</small>
								<span className="practice-status practice-status--progress"><i aria-hidden="true">●</i> in progress</span>
							</span>
							<span className="practice-card-arrow" aria-hidden="true">›</span>
						</button>
					) : (
						<>
							<button className="practice-card" type="button" onClick={onTravelSelect}>
								<span className="practice-icon" aria-hidden="true"><img src={locationIcon} alt="" /></span>
								<span className="practice-card-copy">
									<strong>Ordering Food</strong>
									<small>Travel</small>
									<span className="practice-status practice-status--completed"><i aria-hidden="true">✓</i> completed</span>
								</span>
								<span className="practice-card-arrow" aria-hidden="true">›</span>
							</button>

							<button className="practice-card" type="button" onClick={onWorkSelect}>
								<span className="practice-icon" aria-hidden="true"><img src={computerIcon} alt="" /></span>
								<span className="practice-card-copy">
									<strong>Giving a Work Update</strong>
									<small>Work</small>
									<span className="practice-status practice-status--completed"><i aria-hidden="true">✓</i> completed</span>
								</span>
								<span className="practice-card-arrow" aria-hidden="true">›</span>
							</button>
						</>
					)}
				</div>
			</div>
		</main>
	)
}

export default Practice
