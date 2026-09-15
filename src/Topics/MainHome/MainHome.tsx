import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'
import travelIcon from '../../assets/icon_Travel.svg'
import workIcon from '../../assets/icon_Work.svg'
import locationIcon from '../../assets/icon_Location.svg'
import computerIcon from '../../assets/icon_Computer.svg'
import './MainHome.css'

type MainHomeProps = {
	onInterviewSelect: () => void
	onWorkSelect: () => void
	onTravelSelect: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const practiceLinks = [
	{ label: 'Interview', icon: 'chat', image: null, destination: 'interview' as const },
	{ label: 'Work', icon: 'computer', image: computerIcon, destination: 'work' as const },
	{ label: 'Travel', icon: 'location', image: locationIcon, destination: 'travel' as const },
]

function MainHome({ onInterviewSelect, onWorkSelect, onTravelSelect, onMenuNavigate }: MainHomeProps) {
	const destinations = {
		interview: onInterviewSelect,
		work: onWorkSelect,
		travel: onTravelSelect,
	}

	return (
		<main className="main-home-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<div className="main-home-content">
				<h1>Welcome back, <span>Alex</span></h1>

				<section className="main-home-section" aria-labelledby="progress-title">
					<h2 id="progress-title">Your progress</h2>
					<div className="main-home-progress-grid">
						<div className="main-home-stat">
							<strong>12</strong>
							<span>Conversations</span>
						</div>
						<div className="main-home-stat">
							<strong>1h 24m</strong>
							<span>Practice time</span>
						</div>
					</div>
				</section>

				<section className="main-home-section main-home-featured" aria-labelledby="continue-title">
					<h2 id="continue-title">Continue practice</h2>
					<article className="main-home-practice-card">
						<span className="main-home-card-art"><img src={travelIcon} alt="" /></span>
						<span className="main-home-card-copy">
							<small>Travel</small>
							<strong>Hotel Check-in</strong>
							<button className="main-home-card-action" type="button" onClick={onTravelSelect}>
								Continue <i aria-hidden="true">›</i>
							</button>
						</span>
					</article>
				</section>

				<section className="main-home-section main-home-recommended" aria-labelledby="recommended-title">
					<h2 id="recommended-title">Recommended for you</h2>
					<button className="main-home-practice-card" type="button" onClick={onWorkSelect}>
						<span className="main-home-card-art"><img src={workIcon} alt="" /></span>
						<span className="main-home-card-copy">
							<small>Work</small>
							<strong>Ask for<br />Clarification</strong>
							<span className="main-home-card-action">Start <i aria-hidden="true">›</i></span>
						</span>
					</button>
				</section>

				<section className="main-home-section main-home-explore" aria-labelledby="explore-title">
					<h2 id="explore-title">Explore practice</h2>
					<div className="main-home-practice-links">
						{practiceLinks.map((item) => (
							<button type="button" key={item.label} onClick={destinations[item.destination]}>
								<span className={`main-home-link-icon main-home-link-icon--${item.icon}`} aria-hidden="true">
									{item.image ? <img src={item.image} alt="" /> : <i />}
								</span>
								<strong>{item.label}</strong>
								<span className="main-home-link-arrow" aria-hidden="true">›</span>
							</button>
						))}
					</div>
				</section>
			</div>
		</main>
	)
}

export default MainHome
