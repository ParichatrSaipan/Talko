import travelIcon from '../../assets/icon_Travel.svg'
import airportCheckInImage from '../../assets/ImageScene/Airport Check-in.webp'
import flightDelayImage from '../../assets/ImageScene/Flight Delay.webp'
import hotelCheckInImage from '../../assets/ImageScene/Hotel Check-in.webp'
import roomProblemsImage from '../../assets/ImageScene/Room Problems.webp'
import orderingFoodImage from '../../assets/ImageScene/Ordering Food.webp'
import askingForBillImage from '../../assets/ImageScene/Asking for the Bill.webp'
import findingItemImage from '../../assets/ImageScene/Finding an Item.webp'
import askingPriceImage from '../../assets/ImageScene/Asking About the Price.webp'
import askingDirectionsImage from '../../assets/ImageScene/Asking for Directions.webp'
import publicTransportationImage from '../../assets/ImageScene/Using Public Transportation.webp'
import { callingPracticeItems } from '../AvatarCall/CallingIntroduceData'
import MainTopics from './MainTopics.Component'
import type { TopicCard } from './MainTopics.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

const travelCategories = ['All', 'Airport', 'Hotel', 'Food & Drinks', 'Shopping', 'Getting Around']

const travelTopics: TopicCard[] = [
	{ title: 'Airport Check-in', description: '', image: airportCheckInImage, category: 'Airport', status: '10% done', statusType: 'progress', practiceItems: callingPracticeItems['Airport Check-in'] },
	{ title: 'Flight Delay', description: '', image: flightDelayImage, category: 'Airport', practiceItems: callingPracticeItems['Flight Delay'] },
	{ title: 'Hotel Check-in', description: '', image: hotelCheckInImage, category: 'Hotel', practiceItems: callingPracticeItems['Hotel Check-in'] },
	{ title: 'Room Problems', description: '', image: roomProblemsImage, category: 'Hotel', status: 'completed', statusType: 'completed', practiceItems: callingPracticeItems['Room Problems'] },
	{ title: 'Ordering Food', description: '', image: orderingFoodImage, category: 'Food & Drinks', status: '50% done', statusType: 'working', practiceItems: callingPracticeItems['Ordering Food'] },
	{ title: 'Asking for the Bill', description: '', image: askingForBillImage, category: 'Food & Drinks', practiceItems: callingPracticeItems['Asking for the Bill'] },
	{ title: 'Finding an Item', description: '', image: findingItemImage, category: 'Shopping', practiceItems: callingPracticeItems['Finding an Item'] },
	{ title: 'Asking About the Price', description: '', image: askingPriceImage, category: 'Shopping', practiceItems: callingPracticeItems['Asking About the Price'] },
	{ title: 'Asking for Directions', description: '', image: askingDirectionsImage, category: 'Getting Around', practiceItems: callingPracticeItems['Asking for Directions'] },
	{ title: 'Using Public Transportation', description: '', image: publicTransportationImage, category: 'Getting Around', practiceItems: callingPracticeItems['Using Public Transportation'] },
]

type MainTravelProps = {
	onTopicSelect?: (topic: TopicCard) => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function MainTravel({ onTopicSelect, onMenuNavigate }: MainTravelProps) {
	return (
		<MainTopics
			title="Travel"
			icon={travelIcon}
			variant="travel"
			categories={travelCategories}
			topics={travelTopics}
			onTopicSelect={onTopicSelect}
			onMenuNavigate={onMenuNavigate}
		/>
	)
}

export default MainTravel
