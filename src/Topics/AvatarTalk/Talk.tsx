import { useState } from 'react'
import './Talk.css'
import character from '../../assets/Character_Orange.svg'
import ButtonFinish from './ButtonFinish.component'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'
import soundIcon from '../../assets/icon_sound.svg'

type TalkProps = {
	onBack: () => void
	onFinish: () => void
	onMenuNavigate?: (destination: MenuDestination) => void
}

type WordInfo = {
	word: string
	pronunciation: string
	translation: string
	example: string
	exampleTranslation: string
}

const words: Record<string, WordInfo> = {
	welcome: { word: 'Welcome', pronunciation: '/ˈwel.kəm/', translation: 'ยินดีต้อนรับ', example: 'Welcome to our English class.', exampleTranslation: 'ยินดีต้อนรับสู่ชั้นเรียนภาษาอังกฤษของเรา' },
	to: { word: 'To', pronunciation: '/tuː/', translation: 'ไปยัง, ถึง', example: 'I am going to school.', exampleTranslation: 'ฉันกำลังไปโรงเรียน' },
	talko: { word: 'Talko', pronunciation: '/ˈtɔːk.oʊ/', translation: 'ทอล์คโก', example: 'Talko is your AI tutor.', exampleTranslation: 'Talko คือครู AI ของคุณ' },
	my: { word: 'My', pronunciation: '/maɪ/', translation: 'ของฉัน', example: 'My name is Alex.', exampleTranslation: 'ฉันชื่ออเล็กซ์' },
	name: { word: 'Name', pronunciation: '/neɪm/', translation: 'ชื่อ', example: 'What is your name?', exampleTranslation: 'คุณชื่ออะไร' },
	is: { word: 'Is', pronunciation: '/ɪz/', translation: 'คือ, เป็น, อยู่', example: 'This is my book.', exampleTranslation: 'นี่คือหนังสือของฉัน' },
	and: { word: 'And', pronunciation: '/ænd/', translation: 'และ', example: 'You and I can practice together.', exampleTranslation: 'คุณและฉันสามารถฝึกด้วยกันได้' },
	im: { word: 'I’m', pronunciation: '/aɪm/', translation: 'ฉันคือ, ฉันเป็น', example: 'I’m ready to practice.', exampleTranslation: 'ฉันพร้อมที่จะฝึกแล้ว' },
	your: { word: 'Your', pronunciation: '/jʊr/', translation: 'ของคุณ', example: 'Your English is getting better.', exampleTranslation: 'ภาษาอังกฤษของคุณกำลังดีขึ้น' },
	personal: { word: 'Personal', pronunciation: '/ˈpɜː.sən.əl/', translation: 'ส่วนตัว', example: 'This is your personal lesson.', exampleTranslation: 'นี่คือบทเรียนส่วนตัวของคุณ' },
	ai: { word: 'AI', pronunciation: '/ˌeɪˈaɪ/', translation: 'ปัญญาประดิษฐ์', example: 'AI can help you practice.', exampleTranslation: 'AI สามารถช่วยคุณฝึกฝนได้' },
	tutor: { word: 'Tutor', pronunciation: '/ˈtuː.tər/', translation: 'ครูสอนพิเศษ', example: 'Can you help me with this task?', exampleTranslation: 'คุณช่วยฉันเกี่ยวกับงานนี้ได้ไหม' },
}

function Talk({ onBack, onFinish, onMenuNavigate }: TalkProps) {
	const [selectedWord, setSelectedWord] = useState<WordInfo | null>(null)
	const [savedWords, setSavedWords] = useState<Set<string>>(new Set())

	function selectWord(key: keyof typeof words) {
		setSelectedWord(words[key])
	}

	function playWord(word: string) {
		if (!('speechSynthesis' in window)) return
		window.speechSynthesis.cancel()
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(word))
	}

	function toggleSavedWord(word: string) {
		setSavedWords((current) => {
			const next = new Set(current)
			if (next.has(word)) next.delete(word)
			else next.add(word)
			return next
		})
	}

	return (
		<main className="talk-page">
			<Header onMenuNavigate={onMenuNavigate} />
			<section className="talk-content">
				<button className="talk-back" type="button" onClick={onBack} aria-label="Go back" />
				<div className="talk-video">
					<img className="talk-avatar" src={character} alt="Talko avatar" />
					<span className="talk-expand" aria-hidden="true">⛶</span>
				</div>
				<div className="talk-bubble">
					<button className="talk-word-token" type="button" onClick={() => selectWord('welcome')}>Welcome</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('to')}>to</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('talko')}>Talko</button>!<br />
					<button className="talk-word-token" type="button" onClick={() => selectWord('my')}>My</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('name')}>name</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('is')}>is</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('talko')}>Talko</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('and')}>and</button><br />
					<button className="talk-word-token" type="button" onClick={() => selectWord('im')}>I’m</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('your')}>your</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('personal')}>personal</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('ai')}>AI</button>{' '}
					<button className="talk-word-token" type="button" onClick={() => selectWord('tutor')}>tutor</button>
					<div className="talk-bubble-tools">
						<button type="button" onClick={() => playWord('Welcome to Talko! My name is Talko and I’m your personal AI tutor.')} aria-label="Play pronunciation"><img src={soundIcon} alt="" /></button>
						<button type="button" onClick={() => selectWord('your')} aria-label="Open translation">文A</button>
					</div>
				</div>
				{selectedWord && (
					<section className="talk-word-sheet" role="dialog" aria-modal="true" aria-label={`${selectedWord.word} vocabulary details`}>
						<button className="talk-word-close" type="button" onClick={() => setSelectedWord(null)} aria-label="Close vocabulary">×</button>
						<div className="talk-word-heading">
							<h2>{selectedWord.word}</h2>
							<div className="talk-word-actions">
								<button className="talk-word-sound" type="button" onClick={() => playWord(selectedWord.word)} aria-label={`Play ${selectedWord.word}`}><img src={soundIcon} alt="" /></button>
								<button className={`talk-bookmark${savedWords.has(selectedWord.word) ? ' is-added' : ''}`} type="button" onClick={() => toggleSavedWord(selectedWord.word)} aria-label="Save word"><span aria-hidden="true" /></button>
							</div>
						</div>
						<p className="talk-word-pronunciation">{selectedWord.pronunciation}</p>
						<p className="talk-word-translation">{selectedWord.translation}</p>
						<p className="talk-word-example">{selectedWord.example}</p>
						<p className="talk-word-example-translation">{selectedWord.exampleTranslation}</p>
					</section>
				)}
				<ButtonFinish onFinish={onFinish} />
			</section>
		</main>
	)
}

export default Talk
