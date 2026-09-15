import travelIcon from '../../assets/icon_Travel.svg'
import MainTopicsComponent from './MainTopics.Component'
import type { TopicCard } from './MainTopics.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type MainTravelProps = {
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function MainTravel({ onTopicSelect, onMenuNavigate }: MainTravelProps) {
	return <MainTopicsComponent title="Travel" icon={travelIcon} onTopicSelect={onTopicSelect} onMenuNavigate={onMenuNavigate} />
}

export default MainTravel
