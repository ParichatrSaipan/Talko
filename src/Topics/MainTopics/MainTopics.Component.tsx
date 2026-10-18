//หน้าหัวข้อหลักแต่ละหมวดหมู่ interview, work, travel
import { useEffect, useState } from 'react'
import '../../Font/Fonts.css'
import './MainTopics.Component.css'
import interviewIcon from '../../assets/icon_Interview.svg'
import mainImage from '../../assets/image_main.svg'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'
import { getScenarios } from '../../api/talko'

export type TopicCard = {
	id?: number
	title: string
	description: string
	image?: string
	category?: string
	practiceItems?: string[]
	status?: string
	statusType?: 'progress' | 'completed' | 'working'
}

const categoryByVariant: Record<string, string> = {
	interview: 'Interview',
	work: 'Work',
	travel: 'Travel',
}

type MainTopicsProps = {
	title?: string
	icon?: string
	variant?: 'default' | 'work' | 'travel' | 'interview'
	intro?: string
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

function MainTopics({ title = 'Interview', icon = interviewIcon, variant = 'default', intro = 'Pick a Scenario.', categories, topics = topicCards, onTopicSelect, onMenuNavigate }: MainTopicsProps) {
	const [activeCategory, setActiveCategory] = useState(categories?.[0] ?? '')
	const [fetchedTopics, setFetchedTopics] = useState<TopicCard[] | null>(null)

	const fetchCategory = categoryByVariant[variant]

	useEffect(() => {
		if (!fetchCategory) return
		let active = true
		getScenarios()
			.then((scenarios) => {
				if (!active) return
				setFetchedTopics(
					scenarios
						.filter((scenario) => scenario.category === fetchCategory)
						.map((scenario) => ({
							id: scenario.id,
							title: scenario.title,
							description: scenario.description,
						})),
				)
			})
			.catch(() => {})
		return () => {
			active = false
		}
	}, [fetchCategory])

	const sourceTopics = fetchedTopics ?? topics
	const visibleTopics = !categories || activeCategory === 'All'
		? sourceTopics
		: sourceTopics.filter((topic) => topic.category === activeCategory)

	return (
		<main className={`main-topics-page main-topics-page--${variant}`}>
			<Header onMenuNavigate={onMenuNavigate} />

			<section className="main-topics-hero">
				{variant !== 'default' && (
					<div className="work-hero-pattern" aria-hidden="true">
						<span className="work-pattern-circle work-pattern-circle--one" />
						<span className="work-pattern-circle work-pattern-circle--two" />
						<span className="work-pattern-circle work-pattern-circle--three" />
						<span className="work-pattern-circle work-pattern-circle--four" />
						<span className="work-pattern-laptop work-pattern-laptop--one" />
						<span className="work-pattern-laptop work-pattern-laptop--two" />
						<span className="work-pattern-laptop work-pattern-laptop--three" />
						<span className="work-pattern-laptop work-pattern-laptop--four" />
						<span className="work-pattern-laptop work-pattern-laptop--five" />
						<span className="work-pattern-laptop work-pattern-laptop--six" />
					</div>
				)}
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
				<p className="main-topics-intro">{intro}</p>
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

export default MainTopics
