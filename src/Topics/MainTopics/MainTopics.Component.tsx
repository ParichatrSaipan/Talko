//หน้าหัวข้อหลักแต่ละหมวดหมู่ interview, work, travel
import '../../Font/Fonts.css'
import './MainTopics.Component.css'
import interviewIcon from '../../assets/icon_Interview.svg'
import mainImage from '../../assets/image_main.svg'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

export type TopicCard = {
	title: string
	description: string
	sceneTitle: string
	practiceItems: string[]
	status?: string
	statusType?: 'progress' | 'completed'
}

type MainTopicsComponentProps = {
	title?: string
	icon?: string
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const topicCards: TopicCard[] = [
	{ title: 'topics', description: 'xxxxxx', sceneTitle: 'Introduce Yourself', practiceItems: ['Understanding the situation', 'Responding naturally', 'Asking a follow-up question'], status: '10% done', statusType: 'progress' },
	{ title: 'topics', description: 'xxxxxx', sceneTitle: 'Talk About Your Experience', practiceItems: ['Explaining your experience', 'Using useful work vocabulary', 'Answering follow-up questions'] },
	{ title: 'topics', description: 'xxxxxx', sceneTitle: 'Describe Your Daily Work', practiceItems: ['Describing your responsibilities', 'Speaking clearly and naturally', 'Giving specific examples'] },
	{ title: 'topics', description: 'xxxxxx', sceneTitle: 'Handle a Work Situation', practiceItems: ['Understanding the situation', 'Responding professionally', 'Asking for clarification'], status: 'completed', statusType: 'completed' },
	{ title: 'topics', description: 'xxxxxx', sceneTitle: 'Share Your Opinion', practiceItems: ['Giving your opinion', 'Supporting your ideas', 'Responding to another opinion'], status: '50% done', statusType: 'completed' },
	{ title: 'topics', description: 'xxxxxx', sceneTitle: 'Ask and Answer Questions', practiceItems: ['Asking clear questions', 'Responding naturally', 'Keeping the conversation going'] },
]

function MainTopicsComponent({ title = 'Interview', icon = interviewIcon, onTopicSelect, onMenuNavigate }: MainTopicsComponentProps) {
	return (
		<main className="main-topics-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<section className="main-topics-hero">
				<span className="main-topics-hero-icon">
					<img src={icon} alt="" />
				</span>
				<h1>{title}</h1>
			</section>
            

			<section className="main-topics-content">
				<p className="main-topics-intro">Choose a real-life scenario to practice.</p>
				<div className="main-topics-grid">
					{topicCards.map((topic, index) => (
						<article
							className="main-topic-card"
							key={`${topic.title}-${index}`}
							onClick={() => onTopicSelect?.(topic)}
							role={onTopicSelect ? 'button' : undefined}
							tabIndex={onTopicSelect ? 0 : undefined}
						>
							<img className="main-topic-card-image" src={mainImage} alt="" />
							<div className="main-topic-card-copy">
								<h2>{topic.title}</h2>
								<p>{topic.description}</p>
							</div>
							{topic.status && <span className={`main-topic-status main-topic-status--${topic.statusType}`}>{topic.status}</span>}
						</article>
					))}
				</div>
			</section>
		</main>
	)
}

export default MainTopicsComponent
