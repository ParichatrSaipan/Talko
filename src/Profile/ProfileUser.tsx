import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import profileIcon from '../assets/icon_Profile.svg'
import editJobIcon from '../assets/icon_EditJob.svg'
import { practiceItems } from '../Practice/practiceData'
import type { PracticeItem } from '../Practice/practiceData'
import './ProfileUser.css'

type ProfileUserProps = {
	username: string
	role: string
	onTravelSelect: () => void
	onWorkSelect: () => void
	onPracticeSelect: () => void
	onEdit: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const skillProgress = [
	{ label: 'Clarity', score: 100 },
	{ label: 'Conversation Flow', score: 47 },
	{ label: 'Situation', score: 47 },
	{ label: 'Speaking Fluency', score: 47 },
]

function ProfileUser({ username, role, onTravelSelect, onWorkSelect, onPracticeSelect, onEdit, onMenuNavigate }: ProfileUserProps) {
	function selectPractice(item: PracticeItem) {
		if (item.category === 'Travel') onTravelSelect()
		else onWorkSelect()
	}

	return (
		<main className="profile-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<div className="profile-content">
				<section className="profile-user" aria-label="User profile">
					<span className="profile-avatar" aria-hidden="true"><img src={profileIcon} alt="" /></span>
					<div>
						<h1>{username}</h1>
						<p>Role: {role}</p>
					</div>
					<button className="profile-edit" type="button" onClick={onEdit} aria-label="Edit profile"><img src={editJobIcon} alt="" /></button>
				</section>

				<section className="profile-section" aria-labelledby="skill-progress-title">
					<h2 id="skill-progress-title">Skill progress</h2>
					<div className="profile-skill-card">
						{skillProgress.map(({ label, score }) => (
							<div className="profile-skill" key={label}>
								<div className="profile-skill-label">
									<strong>{label}</strong>
									<span>{score}%</span>
								</div>
								<div className="profile-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}>
									<span className={score === 100 ? 'is-complete' : undefined} style={{ width: `${score}%` }} />
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="profile-section profile-recent" aria-labelledby="recent-practice-title">
					<div className="profile-section-heading">
						<h2 id="recent-practice-title">Recent practice</h2>
						<button type="button" onClick={onPracticeSelect} aria-label="View all practice"><span aria-hidden="true" /></button>
					</div>

					<div className="profile-practice-list">
						{practiceItems.slice(0, 3).map((item) => (
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
				</section>
			</div>
		</main>
	)
}

export default ProfileUser
