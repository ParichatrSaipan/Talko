export type SavedVocabularyCategory = 'Interview' | 'Work' | 'Travel'

export type SavedVocabularyItem = {
	word: string
	translation: string
	context: string
	categories: SavedVocabularyCategory[]
}

const savedVocabularyStorageKey = 'talko.savedVocabulary'

export function getSavedVocabulary(): SavedVocabularyItem[] {
	try {
		const value = JSON.parse(localStorage.getItem(savedVocabularyStorageKey) ?? '[]')
		return Array.isArray(value) ? value : []
	} catch {
		return []
	}
}

export function saveVocabularyItem(item: SavedVocabularyItem) {
	try {
		const savedItems = getSavedVocabulary()
		const normalizedWord = item.word.trim().toLowerCase()
		const existingIndex = savedItems.findIndex((savedItem) => savedItem.word.trim().toLowerCase() === normalizedWord)

		if (existingIndex >= 0) savedItems[existingIndex] = item
		else savedItems.unshift(item)

		localStorage.setItem(savedVocabularyStorageKey, JSON.stringify(savedItems))
	} catch {
		// Keep the bookmark interaction usable when storage is unavailable.
	}
}

export function removeVocabularyItem(word: string) {
	try {
		const normalizedWord = word.trim().toLowerCase()
		const savedItems = getSavedVocabulary().filter((item) => item.word.trim().toLowerCase() !== normalizedWord)
		localStorage.setItem(savedVocabularyStorageKey, JSON.stringify(savedItems))
	} catch {
		// Keep the bookmark interaction usable when storage is unavailable.
	}
}
