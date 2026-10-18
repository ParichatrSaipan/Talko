import { supabase } from '../lib/supabase'

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export type ChatMode = "free" | "scenario"

export type Turn = {
  role: "user" | "model"
  content: string
}

export type ChatRequest = {
  mode: ChatMode
  scenario_id?: number | null
  message: string
  history: Turn[]
  level?: string | null
}

export type ChatResponse = {
  reply: string
  finished?: boolean
}

export type WordInfo = {
  word: string
  pronunciation: string
  translation: string
  example: string
  exampleTranslation: string
}

export type Scenario = {
  id: number
  category: string
  title: string
  description: string
  level: string
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function sendChat(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(await authHeaders()) },
    body: JSON.stringify(req),
  })
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`)
  return res.json()
}

export async function getWord(word: string): Promise<WordInfo> {
  const res = await fetch(`${BASE_URL}/word/${encodeURIComponent(word)}`, {
    headers: { ...(await authHeaders()) },
  })
  if (!res.ok) throw new Error(`Word request failed: ${res.status}`)
  return res.json()
}

export async function getScenarios(): Promise<Scenario[]> {
  const res = await fetch(`${BASE_URL}/scenarios`, {
    headers: { ...(await authHeaders()) },
  })
  if (!res.ok) throw new Error(`Scenarios request failed: ${res.status}`)
  return res.json()
}
