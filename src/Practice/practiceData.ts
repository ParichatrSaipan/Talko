import locationIcon from '../assets/icon_Location.svg'
import computerIcon from '../assets/icon_Computer.svg'
import timeIcon from '../assets/icon_Time.svg'
import tickIcon from '../assets/icon_Tik.svg'

export type PracticeStatus = 'in-progress' | 'completed'
export type PracticeCategory = 'Travel' | 'Work'

export type PracticeItem = {
	id: string
	title: string
	category: PracticeCategory
	status: PracticeStatus
	statusLabel: string
	icon: string
	statusIcon: string
}

export const practiceItems: PracticeItem[] = [
	{
		id: 'hotel-check-in',
		title: 'Hotel Check-in',
		category: 'Travel',
		status: 'in-progress',
		statusLabel: 'in progress',
		icon: locationIcon,
		statusIcon: timeIcon,
	},
	{
		id: 'ordering-food',
		title: 'Ordering Food',
		category: 'Travel',
		status: 'completed',
		statusLabel: 'completed',
		icon: locationIcon,
		statusIcon: tickIcon,
	},
	{
		id: 'giving-a-work-update',
		title: 'Giving a Work Update',
		category: 'Work',
		status: 'completed',
		statusLabel: 'completed',
		icon: computerIcon,
		statusIcon: tickIcon,
	},
]
