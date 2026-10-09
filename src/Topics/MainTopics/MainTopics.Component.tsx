//หน้าหัวข้อหลักแต่ละหมวดหมู่ interview, work, travel
import { useState } from 'react'
import '../../Font/Fonts.css'
import './MainTopics.Component.css'
import interviewIcon from '../../assets/icon_Interview.svg'
import mainImage from '../../assets/image_main.svg'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

export type TopicCard = {
	title: string
	description: string
	image?: string
	category?: string
	status?: string
	statusType?: 'progress' | 'completed' | 'working'
}

type MainTopicsComponentProps = {
	title?: string
	icon?: string
	categories?: string[]
	topics?: TopicCard[]
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const topicCards: TopicCard[] = [
	{ title: 'topics', description: 'xxxxxx', status: '10% done', statusType: 'progress' },
	{ title: 'topics', description: 'xxxxxx' },
	{ title: 'topics', description: 'xxxxxx' },
	{ title: 'topics', description: 'xxxxxx', status: 'completed', statusType: 'completed' },
	{ title: 'topics', description: 'xxxxxx', status: '50% done', statusType: 'working' },
	{ title: 'topics', description: 'xxxxxx' },
]

function MainTopicsComponent({ title = 'Interview', icon = interviewIcon, categories, topics = topicCards, onTopicSelect, onMenuNavigate }: MainTopicsComponentProps) {
	const [activeCategory, setActiveCategory] = useState(categories?.[0] ?? '')
	const visibleTopics = !categories || activeCategory === 'All'
		? topics
		: topics.filter((topic) => topic.category === activeCategory)

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
				{categories && (
					<div className="main-topics-filters" aria-label={`${title} categories`}>
						{categories.map((category) => (
							<button
								className={`main-topics-filter${activeCategory === category ? ' is-active' : ''}`}
								type="button"
								key={category}
								aria-pressed={activeCategory === category}
								onClick={() => setActiveCategory(category)}
							>
								{category}
							</button>
						))}
					</div>
				)}
				<p className="main-topics-intro">Choose a real-life scenario to practice.</p>
				<div className="main-topics-grid">
					{visibleTopics.map((topic, index) => (
						<article
							className="main-topic-card"
							key={`${topic.title}-${index}`}
							onClick={() => onTopicSelect?.(topic)}
							role={onTopicSelect ? 'button' : undefined}
							tabIndex={onTopicSelect ? 0 : undefined}
						>
							<img className="main-topic-card-image" src={topic.image ?? mainImage} alt="" />
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
