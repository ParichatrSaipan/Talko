import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import locationIcon from '../assets/icon_Location.svg'
import computerIcon from '../assets/icon_Computer.svg'
import './ProfileUser.css'

type ProfileUserProps = {
	onTravelSelect: () => void
	onWorkSelect: () => void
	onPracticeSelect: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const skillProgress = [
	{ label: 'Clarity', score: 47 },
	{ label: 'Conversation Flow', score: 47 },
	{ label: 'Situation', score: 47 },
	{ label: 'Speaking Fluency', score: 47 },
]

function ProfileUser({ onTravelSelect, onWorkSelect, onPracticeSelect, onMenuNavigate }: ProfileUserProps) {
	return (
		<main className="profile-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<div className="profile-content">
				<section className="profile-user" aria-label="User profile">
					<span className="profile-avatar" aria-hidden="true"><i /><i /></span>
					<div>
						<h1>Alex</h1>
						<p>xxxxxxx@gmail.com</p>
					</div>
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
									<span style={{ width: `${score}%` }} />
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="profile-section profile-recent" aria-labelledby="recent-practice-title">
					<div className="profile-section-heading">
						<h2 id="recent-practice-title">Recent practice</h2>
						<button type="button" onClick={onPracticeSelect} aria-label="View all practice"><span aria-hidden="true">›</span></button>
					</div>

					<div className="profile-practice-list">
						<button className="profile-practice-card" type="button" onClick={onTravelSelect}>
							<span className="profile-practice-icon" aria-hidden="true"><img src={locationIcon} alt="" /></span>
							<span className="profile-practice-copy">
								<strong>Hotel Check-in</strong>
								<small>Travel</small>
								<span className="profile-status profile-status--progress"><i aria-hidden="true">●</i> in progress</span>
							</span>
							<span className="profile-practice-arrow" aria-hidden="true">›</span>
						</button>

						<button className="profile-practice-card" type="button" onClick={onTravelSelect}>
							<span className="profile-practice-icon" aria-hidden="true"><img src={locationIcon} alt="" /></span>
							<span className="profile-practice-copy">
								<strong>Ordering Food</strong>
								<small>Travel</small>
								<span className="profile-status profile-status--completed"><i aria-hidden="true">✓</i> completed</span>
							</span>
							<span className="profile-practice-arrow" aria-hidden="true">›</span>
						</button>

						<button className="profile-practice-card" type="button" onClick={onWorkSelect}>
							<span className="profile-practice-icon" aria-hidden="true"><img src={computerIcon} alt="" /></span>
							<span className="profile-practice-copy">
								<strong>Giving a Work Update</strong>
								<small>Work</small>
								<span className="profile-status profile-status--completed"><i aria-hidden="true">✓</i> completed</span>
							</span>
							<span className="profile-practice-arrow" aria-hidden="true">›</span>
						</button>
					</div>
				</section>
			</div>
		</main>
	)
}

export default ProfileUser
