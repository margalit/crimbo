export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      harvests: {
        Row: {
          claimant: number
          created_at: string
          id: number
          image: string
          location: string
          points: number
        }
        Insert: {
          claimant: number
          created_at?: string
          id?: number
          image: string
          location: string
          points: number
        }
        Update: {
          claimant?: number
          created_at?: string
          id?: number
          image?: string
          location?: string
          points?: number
        }
      }
      players: {
        Row: {
          created_at: string
          id: number
          image: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          name?: string
        }
      }
    }
    Views: {
      feed: {
        Row: {
          avatar: string | null
          created_at: string | null
          id: number | null
          image: string | null
          location: string | null
          name: string | null
          points: number | null
        }
      }
      leaderboard: {
        Row: {
          harvests: number | null
          id: number | null
          image: string | null
          name: string | null
          points: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
