import workIcon from '../../assets/icon_Work.svg'
import MainTopicsComponent from './MainTopics.Component'
import type { TopicCard } from './MainTopics.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type MainWorkProps = {
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function MainWork({ onTopicSelect, onMenuNavigate }: MainWorkProps) {
	return <MainTopicsComponent title="Work" icon={workIcon} onTopicSelect={onTopicSelect} onMenuNavigate={onMenuNavigate} />
}

export default MainWork
