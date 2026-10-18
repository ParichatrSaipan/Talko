import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { flushSync } from 'react-dom'
import './Talk.css'
import ButtonFinish from './ButtonFinish.component'
import Header from '../../Header/Header.Component'
import type { MenuDestination } from '../../Hamburger/Menu'
import TalkAvatar from './TalkAvatar'
import type { TalkState } from './TalkState'
import soundIcon from '../../assets/icon_sound.svg'
import typingIcon from '../../assets/icon_Typing.svg'
import voiceIcon from '../../assets/icon_Voice.svg'
import hintIcon from '../../assets/icon_Hit.svg'
import saveIcon from '../../assets/icon_Save.svg'
import sendIcon from '../../assets/icon_Send.svg'
import { getWord, sendChat } from '../../api/talko'
import type { Turn, WordInfo } from '../../api/talko'
import { getSavedVocabulary, removeVocabularyItem, saveVocabularyItem } from '../../Vocab/vocabularyStorage'
import type { SavedVocabularyCategory } from '../../Vocab/vocabularyStorage'

type TalkProps = {
	onBack: () => void
	onFinish: () => void
	isConversationFinished?: boolean
	onMenuNavigate?: (destination: MenuDestination) => void
	variant?: 'default' | 'work' | 'interview'
	scenarioId?: number
	level?: string
}

const WELCOME_MESSAGE = 'Welcome to Talko! Say hello to start our conversation.'

function Talk({ onBack, onFinish, isConversationFinished = false, onMenuNavigate, variant = 'default', scenarioId, level = 'B1' }: TalkProps) {
	const [selectedWord, setSelectedWord] = useState<WordInfo | null>(null)
	const [savedWords, setSavedWords] = useState<Set<string>>(
		() => new Set(getSavedVocabulary().map((item) => item.word)),
	)
	const [reply, setReply] = useState(WELCOME_MESSAGE)
	const [history, setHistory] = useState<Turn[]>([])
	const [isSentencePlaybackActive, setIsSentencePlaybackActive] = useState(false)
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [isAwaitingReply, setIsAwaitingReply] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const [typedMessage, setTypedMessage] = useState('')
	const [sentMessages, setSentMessages] = useState<string[]>([])
	const [isFinishedByMessage, setIsFinishedByMessage] = useState(false)
	const [isWordSoundPlayed, setIsWordSoundPlayed] = useState(false)
	const [showHelpPrompt, setShowHelpPrompt] = useState(true)
	const [isHelpVisible, setIsHelpVisible] = useState(false)
	const typingInputRef = useRef<HTMLInputElement>(null)
	const sentencePlaybackButtonRef = useRef<HTMLButtonElement>(null)
	const speechRequestRef = useRef(0)
	const avatarState: TalkState = isSentencePlaybackActive
		? 'speaking'
		: isAwaitingReply
			? 'thinking'
			: isSpeaking
				? 'listening'
				: 'idle'

	function playWord(word: string, onEnd?: () => void) {
		const requestId = ++speechRequestRef.current
		if (!('speechSynthesis' in window)) {
			onEnd?.()
			return
		}
		window.speechSynthesis.cancel()
		const utterance = new SpeechSynthesisUtterance(word)
		const finish = () => {
			if (speechRequestRef.current === requestId) onEnd?.()
		}
		utterance.onend = finish
		utterance.onerror = finish
		window.speechSynthesis.speak(utterance)
	}

	async function lookupWord(raw: string) {
		const clean = raw.toLowerCase().replace(/[^a-z'’-]/g, '')
		if (!clean) return
		setIsSpeaking(false)
		setIsTyping(false)
		setSelectedWord({ word: clean, pronunciation: '', translation: '...', example: '', exampleTranslation: '' })
		setIsWordSoundPlayed(false)
		try {
			const info = await getWord(clean)
			setSelectedWord(info)
		} catch {
			setSelectedWord({ word: clean, pronunciation: '', translation: 'ดึงข้อมูลไม่สำเร็จ', example: '', exampleTranslation: '' })
		}
	}

	function toggleSavedWord(wordInfo: WordInfo) {
		setSavedWords((current) => {
			const next = new Set(current)
			if (next.has(wordInfo.word)) {
				next.delete(wordInfo.word)
				removeVocabularyItem(wordInfo.word)
			} else {
				const category: SavedVocabularyCategory = variant === 'work'
					? 'Work'
					: variant === 'interview'
						? 'Interview'
						: 'Travel'
				next.add(wordInfo.word)
				saveVocabularyItem({
					word: wordInfo.word,
					translation: wordInfo.translation,
					context: `${category} · Conversation`,
					categories: [category],
				})
			}
			return next
		})
	}

	function toggleSentencePlayback() {
		if (isSentencePlaybackActive) {
			speechRequestRef.current += 1
			window.speechSynthesis?.cancel()
			setIsSentencePlaybackActive(false)
			sentencePlaybackButtonRef.current?.blur()
			return
		}
		setIsSentencePlaybackActive(true)
		playWord(reply, () => setIsSentencePlaybackActive(false))
	}

	async function handleTypedMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const message = typedMessage.trim()
		if (!message || isAwaitingReply) return
		setSentMessages((current) => [...current, message])
		setTypedMessage('')
		setIsTyping(false)
		const priorHistory = history
		setHistory((current) => [...current, { role: 'user', content: message }])
		setIsAwaitingReply(true)
		try {
			const result = await sendChat({
				mode: scenarioId ? 'scenario' : 'free',
				scenario_id: scenarioId ?? null,
				message,
				history: priorHistory,
				level,
			})
			setReply(result.reply)
			setHistory((current) => [...current, { role: 'model', content: result.reply }])
			playWord(result.reply)
			if (result.finished) setIsFinishedByMessage(true)
		} catch {
			setReply('Sorry, I had trouble responding. Please try again.')
		} finally {
			setIsAwaitingReply(false)
		}
	}

	function openKeyboard() {
		flushSync(() => setIsTyping(true))
		typingInputRef.current?.focus()
	}

	return (
		<main className="talk-page">
			<Header onMenuNavigate={onMenuNavigate} />
			<section className="talk-content">
				<div className="talk-stage">
					<button className="talk-back" type="button" onClick={onBack} aria-label="Go back" />
					<TalkAvatar state={avatarState} variant={variant} />
				</div>
				<div className="talk-bubble" aria-label={reply}>
					{reply.split(' ').map((token, index) => (
						<span key={`${token}-${index}`}>
							<button className="talk-word-token" type="button" onClick={() => lookupWord(token)}>{token}</button>{' '}
						</span>
					))}
					<div className="talk-bubble-tools">
						<button
							ref={sentencePlaybackButtonRef}
							type="button"
							onClick={toggleSentencePlayback}
							aria-pressed={isSentencePlaybackActive}
							aria-label={isSentencePlaybackActive ? 'Stop pronunciation' : 'Play pronunciation'}
						>
							<img src={soundIcon} alt="" />
						</button>
					</div>
				</div>
				{sentMessages.length > 0 && (
					<div className="talk-user-messages" aria-live="polite">
						{sentMessages.map((message, index) => (
							<p key={`${message}-${index}`}>{message}</p>
						))}
					</div>
				)}
				{isHelpVisible && (
					<div className="talk-help-messages" role="status" aria-label="Conversation suggestions">
						<div className="talk-help-card">
							<p>Think in Thai first, then try to say it in English.</p>
						</div>
					</div>
				)}
				{selectedWord && (
					<section className="talk-word-sheet" role="dialog" aria-modal="true" aria-label={`${selectedWord.word} vocabulary details`}>
						<button className="talk-word-close" type="button" onClick={() => setSelectedWord(null)} aria-label="Close vocabulary">×</button>
						<div className="talk-word-heading">
							<h2>{selectedWord.word}</h2>
							<div className="talk-word-actions">
								<button className={`talk-word-sound${isWordSoundPlayed ? ' is-played' : ''}`} type="button" onClick={() => { setIsWordSoundPlayed(true); playWord(selectedWord.word, () => setIsWordSoundPlayed(false)) }} aria-label={`Play ${selectedWord.word}`}><img src={soundIcon} alt="" /></button>
								<button
									className={`talk-bookmark${savedWords.has(selectedWord.word) ? ' is-added' : ''}`}
									type="button"
									onClick={() => toggleSavedWord(selectedWord)}
									aria-pressed={savedWords.has(selectedWord.word)}
									aria-label={savedWords.has(selectedWord.word) ? 'Remove saved word' : 'Save word'}
								>
									<img src={saveIcon} alt="" />
								</button>
							</div>
						</div>
						<p className="talk-word-pronunciation">{selectedWord.pronunciation}</p>
						<p className="talk-word-translation" lang="th">{selectedWord.translation}</p>
						<p className="talk-word-example">{selectedWord.example}</p>
						<p className="talk-word-example-translation" lang="th">{selectedWord.exampleTranslation}</p>
					</section>
				)}
				{!selectedWord && (isConversationFinished || isFinishedByMessage ? (
					<ButtonFinish onFinish={onFinish} />
				) : isTyping ? (
					<form className="talk-typing" onSubmit={handleTypedMessage}>
						<input
							type="text"
							value={typedMessage}
							onChange={(event) => setTypedMessage(event.target.value)}
							placeholder="Type your answer"
							aria-label="Type your response"
							inputMode="text"
							enterKeyHint="send"
							ref={typingInputRef}
						/>
						<button className="talk-typing-send" type="submit" aria-label="Send response" disabled={isAwaitingReply}><img src={sendIcon} alt="" /></button>
						<button className="talk-typing-close" type="button" onClick={() => setIsTyping(false)} aria-label="Close keyboard">×</button>
					</form>
				) : (
					<div className="talk-controls">
						<button className="talk-control talk-control--typing" type="button" onClick={openKeyboard} aria-label="Type a response"><img src={typingIcon} alt="" /></button>
						<button
							className={`talk-control talk-control--voice${isSpeaking ? ' is-speaking' : ''}`}
							type="button"
							onPointerDown={() => setIsSpeaking(true)}
							onPointerUp={() => setIsSpeaking(false)}
							onPointerCancel={() => setIsSpeaking(false)}
							onPointerLeave={() => setIsSpeaking(false)}
							aria-label="Hold to speak"
						>
							<img src={voiceIcon} alt="" />
						</button>
						<div className="talk-help-control">
							{showHelpPrompt && <span className="talk-help-prompt" role="status">Need a little help?</span>}
							<button
								className="talk-control"
								type="button"
								onClick={() => {
									setShowHelpPrompt(false)
									setIsHelpVisible((isVisible) => !isVisible)
								}}
								aria-pressed={isHelpVisible}
								aria-label={isHelpVisible ? 'Hide conversation help' : 'Show conversation help'}
							>
								<img src={hintIcon} alt="" />
							</button>
						</div>
						<span className="talk-control-hint">{isAwaitingReply ? 'Talko is thinking...' : 'Type to answer'}</span>
					</div>
				))}
			</section>
		</main>
	)
}

export default Talk
