import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase is optional - only create client if credentials are provided
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Database types
export interface Page {
  id: string
  title: string
  content: PageContent
  created_at: string
  updated_at: string
}

export interface PageContent {
  components: Component[]
}

export interface Component {
  id: string
  type: 'text' | 'image' | 'button' | 'container'
  content: string
  styles: Record<string, string>
  children?: Component[]
}
