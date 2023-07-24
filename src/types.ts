import type { SupabaseClient, User } from '@supabase/supabase-js'

export type SupabaseContextType = {
    supabase: SupabaseClient | null
    user: User | null
}

export interface Product {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export interface Country {
    id: number
    name: string
}