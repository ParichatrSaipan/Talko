// โหมดไม่มี backend: ทุกฟังก์ชันทำงานในเครื่อง (offline) ไม่เรียก API ภายนอก
// ถ้าจะกลับไปต่อ backend ทีหลัง ให้แก้เฉพาะไฟล์นี้ — ชื่อฟังก์ชันและ type ยังเหมือนเดิม

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

const SCRIPTED_REPLIES = [
  "Nice to meet you! Can you tell me a little about yourself?",
  "That sounds interesting. What do you like to do in your free time?",
  "Great! Why is that important to you?",
  "Thank you for sharing. You did a great job today!",
]

const words: Record<string, Omit<WordInfo, "word">> = {
  welcome: { pronunciation: "/ˈwel.kəm/", translation: "ยินดีต้อนรับ", example: "Welcome to our English class.", exampleTranslation: "ยินดีต้อนรับสู่ชั้นเรียนภาษาอังกฤษของเรา" },
  to: { pronunciation: "/tuː/", translation: "ไปยัง, ถึง", example: "I am going to school.", exampleTranslation: "ฉันกำลังไปโรงเรียน" },
  talko: { pronunciation: "/ˈtɔːk.oʊ/", translation: "ทอล์คโก", example: "Talko is your AI tutor.", exampleTranslation: "Talko คือครู AI ของคุณ" },
  say: { pronunciation: "/seɪ/", translation: "พูด", example: "Say it again, please.", exampleTranslation: "ช่วยพูดอีกครั้งได้ไหม" },
  hello: { pronunciation: "/həˈloʊ/", translation: "สวัสดี", example: "Hello, how are you?", exampleTranslation: "สวัสดี คุณสบายดีไหม" },
  start: { pronunciation: "/stɑːrt/", translation: "เริ่ม", example: "Let's start the lesson.", exampleTranslation: "มาเริ่มบทเรียนกันเถอะ" },
  our: { pronunciation: "/aʊər/", translation: "ของเรา", example: "This is our classroom.", exampleTranslation: "นี่คือห้องเรียนของเรา" },
  conversation: { pronunciation: "/ˌkɑːn.vɚˈseɪ.ʃən/", translation: "บทสนทนา", example: "We had a long conversation.", exampleTranslation: "เราคุยกันนานมาก" },
  nice: { pronunciation: "/naɪs/", translation: "ดี, น่ารัก", example: "It's a nice day.", exampleTranslation: "วันนี้อากาศดี" },
  meet: { pronunciation: "/miːt/", translation: "พบ, เจอ", example: "Nice to meet you.", exampleTranslation: "ยินดีที่ได้รู้จัก" },
  you: { pronunciation: "/juː/", translation: "คุณ", example: "Thank you.", exampleTranslation: "ขอบคุณ" },
  tell: { pronunciation: "/tel/", translation: "บอก, เล่า", example: "Tell me a story.", exampleTranslation: "เล่าเรื่องให้ฉันฟังหน่อย" },
  about: { pronunciation: "/əˈbaʊt/", translation: "เกี่ยวกับ", example: "Tell me about your job.", exampleTranslation: "เล่าเกี่ยวกับงานของคุณหน่อย" },
  yourself: { pronunciation: "/jʊrˈself/", translation: "ตัวคุณเอง", example: "Please introduce yourself.", exampleTranslation: "กรุณาแนะนำตัวเอง" },
  interesting: { pronunciation: "/ˈɪn.trɪ.stɪŋ/", translation: "น่าสนใจ", example: "This book is interesting.", exampleTranslation: "หนังสือเล่มนี้น่าสนใจ" },
  free: { pronunciation: "/friː/", translation: "ว่าง, ฟรี", example: "Are you free tonight?", exampleTranslation: "คืนนี้คุณว่างไหม" },
  time: { pronunciation: "/taɪm/", translation: "เวลา", example: "What time is it?", exampleTranslation: "ตอนนี้กี่โมงแล้ว" },
  great: { pronunciation: "/ɡreɪt/", translation: "ยอดเยี่ยม", example: "You did a great job.", exampleTranslation: "คุณทำได้ยอดเยี่ยมมาก" },
  important: { pronunciation: "/ɪmˈpɔːr.tənt/", translation: "สำคัญ", example: "This is very important.", exampleTranslation: "สิ่งนี้สำคัญมาก" },
  thank: { pronunciation: "/θæŋk/", translation: "ขอบคุณ", example: "Thank you for your help.", exampleTranslation: "ขอบคุณสำหรับความช่วยเหลือ" },
  sharing: { pronunciation: "/ˈʃer.ɪŋ/", translation: "การแบ่งปัน", example: "Thanks for sharing.", exampleTranslation: "ขอบคุณที่แบ่งปัน" },
  job: { pronunciation: "/dʒɑːb/", translation: "งาน", example: "I love my job.", exampleTranslation: "ฉันรักงานของฉัน" },
  today: { pronunciation: "/təˈdeɪ/", translation: "วันนี้", example: "I'm busy today.", exampleTranslation: "วันนี้ฉันยุ่ง" },
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sendChat(req: ChatRequest): Promise<ChatResponse> {
  await delay(600)
  const userTurns = req.history.filter((turn) => turn.role === "user").length
  const index = Math.min(userTurns, SCRIPTED_REPLIES.length - 1)
  return {
    reply: SCRIPTED_REPLIES[index],
    finished: index === SCRIPTED_REPLIES.length - 1,
  }
}

export async function getWord(word: string): Promise<WordInfo> {
  const key = word.toLowerCase().replace(/[’']/g, "")
  const info = words[key]
  if (info) return { word, ...info }
  return { word, pronunciation: "", translation: "ยังไม่มีคำแปลสำหรับคำนี้", example: "", exampleTranslation: "" }
}

export async function getScenarios(): Promise<Scenario[]> {
  return []
}
