//ซีนย่อย
import './Scene.component.css'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'

type SceneComponentProps = {
	title: string
	practiceItems: string[]
	onBack: () => void
	onPractice: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

function SceneComponent({ title, practiceItems, onBack, onPractice, onMenuNavigate }: SceneComponentProps) {
	return (
		<main className="scene-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<section className="scene-content">
				<button className="scene-back" type="button" onClick={onBack} aria-label="Go back" />
				<article className="scene-card">
					<div className="scene-card-body">
						<h1>{title}</h1>
						<p>You'll practice :</p>
						<ul>
							{practiceItems.map((item) => <li key={item}>{item}</li>)}
						</ul>
					</div>
					<button className="scene-practice" type="button" onClick={onPractice}>Practice</button>
				</article>
			</section>
		</main>
	)
}

export default SceneComponent
