import { useEffect, useState } from 'react'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import { practiceItems } from './RecentPracticeData'
import type { PracticeItem, PracticeStatus } from './RecentPracticeData'
import '../Profile/ProfileUserPage.css'
import './RecentPracticePage.css'

type RecentPracticePageProps = {
	onBack: () => void
	onTravelSelect: () => void
	onWorkSelect: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function RecentPracticePage({ onBack, onMenuNavigate }: RecentPracticePageProps) {
	const [activeTab, setActiveTab] = useState<PracticeStatus>('in-progress')
	// TODO: ยังไม่ได้ต่อ backend — ลบแล้วจะกลับมาเมื่อรีเฟรชหน้า
	const [items, setItems] = useState<PracticeItem[]>(practiceItems)
	const [pendingRestart, setPendingRestart] = useState<PracticeItem | null>(null)
	const visiblePractice = items.filter((item) => item.status === activeTab)

	useEffect(() => {
		if (!pendingRestart) return
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') setPendingRestart(null)
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [pendingRestart])

	function confirmRestart() {
		if (!pendingRestart) return
		setItems((current) => current.filter((item) => item.id !== pendingRestart.id))
		setPendingRestart(null)
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
						<button className="profile-practice-card" type="button" key={item.id} onClick={() => setPendingRestart(item)}>
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

			{pendingRestart && (
				<div className="practice-restart-backdrop" onClick={() => setPendingRestart(null)}>
					<section
						className="practice-restart-sheet"
						role="dialog"
						aria-modal="true"
						aria-labelledby="practice-restart-title"
						onClick={(event) => event.stopPropagation()}
					>
						<button className="practice-restart-close" type="button" onClick={() => setPendingRestart(null)} aria-label="Close">
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
						</button>
						<span className="practice-restart-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v5h-5" /></svg>
						</span>
						<h2 id="practice-restart-title">Restart Conversation?</h2>
						<p>Your current conversation progress will be reset. Would you like to start this conversation again?</p>
						<div className="practice-restart-actions">
							<button className="practice-restart-confirm" type="button" onClick={confirmRestart} autoFocus>Restart Conversation</button>
							<button className="practice-restart-cancel" type="button" onClick={() => setPendingRestart(null)}>Cancel</button>
						</div>
					</section>
				</div>
			)}
		</main>
	)
}

export default RecentPracticePage
