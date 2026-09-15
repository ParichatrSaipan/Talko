import interviewIcon from '../../assets/icon_Interview.svg'
import MainTopicsComponent from './MainTopics.Component'
import type { TopicCard } from './MainTopics.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type MainInterviewProps = {
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function MainInterview({ onTopicSelect, onMenuNavigate }: MainInterviewProps) {
	return <MainTopicsComponent title="Interview" icon={interviewIcon} onTopicSelect={onTopicSelect} onMenuNavigate={onMenuNavigate} />
}

export default MainInterview
