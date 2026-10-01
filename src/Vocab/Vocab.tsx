import { useEffect, useMemo, useRef, useState } from 'react'
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
	const [speakingWord, setSpeakingWord] = useState<string | null>(null)
	const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

	useEffect(() => {
		return () => {
			if ('speechSynthesis' in window) window.speechSynthesis.cancel()
		}
	}, [])

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

		if (speakingWord === word) {
			utteranceRef.current = null
			window.speechSynthesis.cancel()
			setSpeakingWord(null)
			return
		}

		utteranceRef.current = null
		window.speechSynthesis.cancel()

		const utterance = new SpeechSynthesisUtterance(word)
		utteranceRef.current = utterance
		setSpeakingWord(word)

		function finishSpeaking() {
			if (utteranceRef.current !== utterance) return
			utteranceRef.current = null
			setSpeakingWord(null)
		}

		utterance.onend = finishSpeaking
		utterance.onerror = finishSpeaking
		window.speechSynthesis.speak(utterance)
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
							<button
								className={`vocab-sound${speakingWord === item.word ? ' is-playing' : ''}`}
								type="button"
								onClick={() => playWord(item.word)}
								aria-pressed={speakingWord === item.word}
								aria-label={`${speakingWord === item.word ? 'Stop' : 'Play'} ${item.word}`}
							>
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
