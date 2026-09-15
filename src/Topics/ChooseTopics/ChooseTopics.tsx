//หน้าซีนย่อย ของแต่ละหัวข้อย่อย
import '../../Font/Fonts.css'
import './ChooseTopics.css'
import interviewIcon from '../../assets/icon_Interview.svg'
import workIcon from '../../assets/icon_Work.svg'
import travelIcon from '../../assets/icon_Travel.svg'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

const topics = [
	{ title: 'Interview', description: 'Prepare for real interview conversations.', icon: interviewIcon },
	{ title: 'Work', description: 'Improve communication in workplace situations.', icon: workIcon },
	{ title: 'Travel', description: 'Practice everyday travel situations.', icon: travelIcon },
]

type ChooseTopicsProps = {
	onInterviewSelect?: () => void
	onWorkSelect?: () => void
	onTravelSelect?: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function ChooseTopics({ onInterviewSelect, onWorkSelect, onTravelSelect, onMenuNavigate }: ChooseTopicsProps) {
	return (
		<main className="topics-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<section className="topics-content">
				<h1>What do you want to<br /><span>practice?</span></h1>
				<div className="topic-list">
					{topics.map((topic) => (
						<article className="topic-card" key={topic.title}>
							<div className="topic-illustration">
								<img src={topic.icon} alt="" />
							</div>
							<div className="topic-card-content">
								<h2>{topic.title}</h2>
								<p>{topic.description}</p>
							</div>
							<button
								type="button"
								onClick={topic.title === 'Interview' ? onInterviewSelect : topic.title === 'Work' ? onWorkSelect : onTravelSelect}
							>
								Explore
							</button>
						</article>
					))}
				</div>
			</section>
		</main>
	)
}

export default ChooseTopics
