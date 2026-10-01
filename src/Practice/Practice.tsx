import { useState } from 'react'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import { practiceItems } from './practiceData'
import type { PracticeItem, PracticeStatus } from './practiceData'
import '../Profile/ProfileUser.css'
import './Practice.css'

type PracticeProps = {
	onBack: () => void
	onTravelSelect: () => void
	onWorkSelect: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function Practice({ onBack, onTravelSelect, onWorkSelect, onMenuNavigate }: PracticeProps) {
	const [activeTab, setActiveTab] = useState<PracticeStatus>('in-progress')
	const visiblePractice = practiceItems.filter((item) => item.status === activeTab)

	function selectPractice(item: PracticeItem) {
		if (item.category === 'Travel') onTravelSelect()
		else onWorkSelect()
	}

	return (
		<main className="practice-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<div className="practice-content">
				<button className="practice-back" type="button" onClick={onBack} aria-label="Back to profile"><span aria-hidden="true" /></button>

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
					{visiblePractice.map((item) => (
						<button className="profile-practice-card" type="button" key={item.id} onClick={() => selectPractice(item)}>
							<span className="profile-practice-icon" aria-hidden="true"><img src={item.icon} alt="" /></span>
							<span className="profile-practice-copy">
								<strong>{item.title}</strong>
								<small>{item.category}</small>
								<span className={`profile-status profile-status--${item.status === 'in-progress' ? 'progress' : 'completed'}`}>
									<i aria-hidden="true"><img src={item.statusIcon} alt="" /></i> {item.statusLabel}
								</span>
							</span>
							<span className="profile-practice-arrow" aria-hidden="true">›</span>
						</button>
					))}
				</div>
			</div>
		</main>
	)
}

export default Practice
