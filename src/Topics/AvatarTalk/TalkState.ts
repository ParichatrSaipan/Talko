// state ทั้งหมดของ Talko ในการพูดคุยกับผู้ใช้
export type TalkState = 'idle' | 'listening' | 'thinking' | 'speaking'

export const talkStateLabels: Record<TalkState, string> = {
	idle: 'Talko is waiting for your response',
	listening: 'Talko is listening',
	thinking: 'Talko is thinking',
	speaking: 'Talko is speaking',
}

export function getTalkStateClassName(state: TalkState) {
	return `talk-video--${state}`
}

