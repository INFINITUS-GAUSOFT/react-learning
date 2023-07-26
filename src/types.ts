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
    price: number,
    reviews: Review[]
}

export interface Review {
    id: number
    note: number
    comment: string,
    created_at: string
}

export type CreateReview = Pick<Review, "note" | "comment"> & { product_id: number };

export interface Country {
    id: number
    name: string
}

export interface UserData {
    email: string
    firstname: string
    lastname: string
    password: string
}

export interface Credentials {
    email: string
    password: string
}