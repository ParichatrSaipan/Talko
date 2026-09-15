import { useEffect } from 'react'
import './Menu.css'

export type MenuDestination = 'home' | 'interview' | 'work' | 'travel' | 'vocabulary' | 'profile' | 'logout'

type MenuProps = {
	isOpen: boolean
	onClose: () => void
	onNavigate?: (destination: MenuDestination) => void
}

const practiceItems: Array<{ label: string; destination: MenuDestination }> = [
	{ label: 'Interview', destination: 'interview' },
	{ label: 'Work', destination: 'work' },
	{ label: 'Travel', destination: 'travel' },
]

function Menu({ isOpen, onClose, onNavigate }: MenuProps) {
	useEffect(() => {
		if (!isOpen) return

		function handleEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	if (!isOpen) return null

	function navigate(destination: MenuDestination) {
		onNavigate?.(destination)
		onClose()
	}

	return (
		<div className="menu-overlay" role="presentation" onMouseDown={onClose}>
			<aside className="menu-panel" aria-label="Main menu" onMouseDown={(event) => event.stopPropagation()}>
				<div className="menu-heading">
					<h2>Menu</h2>
					<button className="menu-close" type="button" onClick={onClose} aria-label="Close menu">×</button>
				</div>

				<nav className="menu-navigation" aria-label="Main navigation">
					<button className="menu-link is-active" type="button" onClick={() => navigate('home')}>Home</button>

					<p className="menu-label">Practice</p>
					{practiceItems.map((item) => (
						<button className="menu-link" type="button" key={item.destination} onClick={() => navigate(item.destination)}>
							{item.label}
						</button>
					))}

					<button className="menu-link menu-link--spaced" type="button" onClick={() => navigate('vocabulary')}>Vocabulary</button>
					<button className="menu-link" type="button" onClick={() => navigate('profile')}>Profile</button>
					<button className="menu-link menu-logout" type="button" onClick={() => navigate('logout')}>Log out</button>
				</nav>
			</aside>
		</div>
	)
}

export default Menu
