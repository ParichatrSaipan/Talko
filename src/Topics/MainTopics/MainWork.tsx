import workIcon from '../../assets/icon_Work.svg'
import startingNewJobImage from '../../assets/ImageScene/Starting Your New Job.svg'
import workingWithTeamImage from '../../assets/ImageScene/Working with Your Team.svg'
import gettingHelpImage from '../../assets/ImageScene/Getting Help & Solving Problems.svg'
import sharingIdeasImage from '../../assets/ImageScene/Sharing Ideas & Opinions.svg'
import meetingsImage from '../../assets/ImageScene/Meetings & Discussions.svg'
import feedbackImage from '../../assets/ImageScene/Giving & Receiving Feedback.svg'
import { callingPracticeItems } from '../AvatarCall/callingPracticeData'
import MainTopicsComponent from './MainTopics.Component'
import type { TopicCard } from './MainTopics.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type MainWorkProps = {
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

const workTopics: TopicCard[] = [
	{ title: 'Starting Your New Job', description: '', image: startingNewJobImage, status: '10% done', statusType: 'progress', practiceItems: callingPracticeItems['Starting Your New Job'] },
	{ title: 'Working with Your Team', description: '', image: workingWithTeamImage, practiceItems: callingPracticeItems['Working with Your Team'] },
	{ title: 'Getting Help & Solving Problems', description: '', image: gettingHelpImage, practiceItems: callingPracticeItems['Getting Help & Solving Problems'] },
	{ title: 'Sharing Ideas & Opinions', description: '', image: sharingIdeasImage, status: 'completed', statusType: 'completed', practiceItems: callingPracticeItems['Sharing Ideas & Opinions'] },
	{ title: 'Meetings & Discussions', description: '', image: meetingsImage, status: '50% done', statusType: 'working', practiceItems: callingPracticeItems['Meetings & Discussions'] },
	{ title: 'Giving & Receiving Feedback', description: '', image: feedbackImage, practiceItems: callingPracticeItems['Giving & Receiving Feedback'] },
]

function MainWork({ onTopicSelect, onMenuNavigate }: MainWorkProps) {
	return <MainTopicsComponent title="Work" icon={workIcon} topics={workTopics} onTopicSelect={onTopicSelect} onMenuNavigate={onMenuNavigate} />
}

export default MainWork
