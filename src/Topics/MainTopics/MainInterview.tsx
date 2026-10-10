import interviewIcon from '../../assets/icon_Interview.svg'
import gettingToKnowYouImage from '../../assets/ImageScene/Getting to know you.svg'
import experienceImage from '../../assets/ImageScene/Experience & Achievements.svg'
import skillsImage from '../../assets/ImageScene/Skills & Strengths.svg'
import challengesImage from '../../assets/ImageScene/Challenges & Weaknesses.svg'
import motivationImage from '../../assets/ImageScene/Motivation & Career Goals.svg'
import askInterviewerImage from '../../assets/ImageScene/Ask the Interviewer.svg'
import { callingPracticeItems } from '../AvatarCall/callingPracticeData'
import MainTopicsComponent from './MainTopics.Component'
import type { TopicCard } from './MainTopics.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type MainInterviewProps = {
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const interviewTopics: TopicCard[] = [
	{ title: 'Getting to Know You', description: '', image: gettingToKnowYouImage, status: '10% done', statusType: 'progress', practiceItems: callingPracticeItems['Getting to Know You'] },
	{ title: 'Experience & Achievements', description: '', image: experienceImage, practiceItems: callingPracticeItems['Experience & Achievements'] },
	{ title: 'Skills & Strengths', description: '', image: skillsImage, practiceItems: callingPracticeItems['Skills & Strengths'] },
	{ title: 'Challenges & Weaknesses', description: '', image: challengesImage, status: 'completed', statusType: 'completed', practiceItems: callingPracticeItems['Challenges & Weaknesses'] },
	{ title: 'Motivation & Career Goals', description: '', image: motivationImage, status: '50% done', statusType: 'working', practiceItems: callingPracticeItems['Motivation & Career Goals'] },
	{ title: 'Ask the Interviewer', description: '', image: askInterviewerImage, practiceItems: callingPracticeItems['Ask the Interviewer'] },
]

function MainInterview({ onTopicSelect, onMenuNavigate }: MainInterviewProps) {
	return <MainTopicsComponent title="Interview" icon={interviewIcon} topics={interviewTopics} onTopicSelect={onTopicSelect} onMenuNavigate={onMenuNavigate} />
}

export default MainInterview
