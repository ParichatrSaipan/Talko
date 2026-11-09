import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string

// ไม่มี env ของ Supabase → คืนค่า null แล้วแอปจะใช้ mock login แทน
export const supabase = url && key ? createClient(url, key) : null
