import { useState } from 'react'
import type { ReactNode } from 'react'
import Menu from '../Hamburger/Menu'
import type { MenuDestination } from '../Hamburger/Menu'
import './Header.Component.css'

type HeaderProps = {
	action?: ReactNode
	onMenuNavigate?: (destination: MenuDestination) => void
}

function Header({ action, onMenuNavigate }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			<header className="app-header">
				<div className="app-header-brand">
					<span className="app-header-mark" aria-hidden="true"><i /><i /></span>
					<span>Talko</span>
				</div>

				{action ?? (
					<button className="app-header-menu" type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
						<span /><span /><span /><span />
					</button>
				)}
			</header>

			{!action && (
				<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={onMenuNavigate} />
			)}
		</>
	)
}

export default Header
