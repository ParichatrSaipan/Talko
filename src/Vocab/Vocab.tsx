import { useMemo, useState } from 'react'
import Header from '../Header/Header.Component'
import type { MenuDestination } from '../Hamburger/Menu'
import soundIcon from '../assets/icon_sound.svg'
import './Vocab.css'

type VocabProps = {
	onMenuNavigate?: (destination: MenuDestination) => void
}

type VocabularyCategory = 'All' | 'Interview' | 'Work' | 'Travel'

const categories: VocabularyCategory[] = ['All', 'Interview', 'Work', 'Travel']

const vocabulary = [
	{ word: 'reservation', translation: 'การจอง', context: 'Travel · Hotel Check-in', categories: ['Travel'] },
	{ word: 'follow-up', translation: 'คำถามต่อเนื่อง', context: 'Work · Interview', categories: ['Work', 'Interview'] },
	{ word: 'deadline', translation: 'กำหนดเวลา', context: 'Work · Asking for Clarification', categories: ['Work'] },
	{ word: 'passport', translation: 'หนังสือเดินทาง', context: 'Travel · Hotel Check-in', categories: ['Travel'] },
	{ word: 'facilities', translation: 'สิ่งอำนวยความสะดวก', context: 'Travel · Hotel Check-in', categories: ['Travel'] },
]

function Vocab({ onMenuNavigate }: VocabProps) {
	const [query, setQuery] = useState('')
	const [activeCategory, setActiveCategory] = useState<VocabularyCategory>('All')

	const visibleVocabulary = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase()
		return vocabulary.filter((item) => {
			const matchesCategory = activeCategory === 'All' || item.categories.includes(activeCategory)
			const matchesQuery = !normalizedQuery || `${item.word} ${item.translation} ${item.context}`.toLowerCase().includes(normalizedQuery)
			return matchesCategory && matchesQuery
		})
	}, [activeCategory, query])

	function playWord(word: string) {
		if (!('speechSynthesis' in window)) return
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(word))
	}

	return (
		<main className="vocab-page">
			<Header onMenuNavigate={onMenuNavigate} />

			<div className="vocab-content">
				<h1>My <span>Vocabulary</span></h1>

				<label className="vocab-search">
					<span aria-hidden="true" />
					<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search vocabulary..." />
				</label>

				<div className="vocab-filters" role="group" aria-label="Filter vocabulary">
					{categories.map((category) => (
						<button className={activeCategory === category ? 'is-active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>
							{category}
						</button>
					))}
				</div>

				<div className="vocab-list">
					{visibleVocabulary.map((item) => (
						<article className="vocab-card" key={item.word}>
							<div>
								<h2>{item.word}</h2>
								<p>{item.translation}</p>
								<small>{item.context}</small>
							</div>
							<button className="vocab-sound" type="button" onClick={() => playWord(item.word)} aria-label={`Play ${item.word}`}>
								<img src={soundIcon} alt="" />
							</button>
						</article>
					))}
					{visibleVocabulary.length === 0 && <p className="vocab-empty">No vocabulary found.</p>}
				</div>
			</div>
		</main>
	)
}

export default Vocab
