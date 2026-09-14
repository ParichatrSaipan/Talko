import '../../Font/Fonts.css'
import './MainTopics.Component.css'
import interviewIcon from '../../assets/icon_Interview.svg'
import mainImage from '../../assets/image_main.svg'

type TopicCard = {
	title: string
	description: string
	status?: string
	statusType?: 'progress' | 'completed'
}

type MainTopicsComponentProps = {
	title?: string
	icon?: string
}

const topicCards: TopicCard[] = [
	{ title: 'topics', description: 'xxxxxx', status: '10% done', statusType: 'progress' },
	{ title: 'topics', description: 'xxxxxx' },
	{ title: 'topics', description: 'xxxxxx' },
	{ title: 'topics', description: 'xxxxxx', status: 'completed', statusType: 'completed' },
	{ title: 'topics', description: 'xxxxxx', status: '50% done', statusType: 'completed' },
	{ title: 'topics', description: 'xxxxxx' },
]

function MainTopicsComponent({ title = 'Interview', icon = interviewIcon }: MainTopicsComponentProps) {
	return (
		<main className="main-topics-page">
			<header className="main-topics-header">
				<div className="main-topics-brand">
					<span className="main-topics-brand-mark" aria-hidden="true"><i /></span>
					<span>Talko</span>
				</div>
				<button className="main-topics-menu" type="button" aria-label="Open menu">
					<span /><span /><span /><span />
				</button>
			</header>

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
						<article className="main-topic-card" key={`${topic.title}-${index}`}>
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