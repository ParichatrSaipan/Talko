import interviewIcon from '../../assets/icon_Interview.svg'
import gettingToKnowYouImage from '../../assets/ImageScene/Getting to know you.svg'
import experienceImage from '../../assets/ImageScene/Experience & Achievements.svg'
import skillsImage from '../../assets/ImageScene/Skills & Strengths.svg'
import challengesImage from '../../assets/ImageScene/Challenges & Weaknesses.svg'
import motivationImage from '../../assets/ImageScene/Motivation & Career Goals.svg'
import askInterviewerImage from '../../assets/ImageScene/Ask the Interviewer.svg'
import MainTopicsComponent from './MainTopics.Component'
import type { TopicCard } from './MainTopics.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type MainInterviewProps = {
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const interviewTopics: TopicCard[] = [
	{ title: 'Getting to know you', description: '', image: gettingToKnowYouImage, status: '10% done', statusType: 'progress' },
	{ title: 'Experience & Achievements', description: '', image: experienceImage },
	{ title: 'Skills & Strengths', description: '', image: skillsImage },
	{ title: 'Challenges & Weaknesses', description: '', image: challengesImage, status: 'completed', statusType: 'completed' },
	{ title: 'Motivation & Career Goals', description: '', image: motivationImage, status: '50% done', statusType: 'working' },
	{ title: 'Ask the Interviewer', description: '', image: askInterviewerImage },
]

function MainInterview({ onTopicSelect, onMenuNavigate }: MainInterviewProps) {
	return <MainTopicsComponent title="Interview" icon={interviewIcon} topics={interviewTopics} onTopicSelect={onTopicSelect} onMenuNavigate={onMenuNavigate} />
}

export default MainInterview
