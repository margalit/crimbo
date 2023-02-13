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
          is_synthetic: boolean
          location: string
          user: string | null
        }
        Insert: {
          claimant: number
          created_at?: string
          id?: number
          image: string
          is_synthetic?: boolean
          location: string
          user?: string | null
        }
        Update: {
          claimant?: number
          created_at?: string
          id?: number
          image?: string
          is_synthetic?: boolean
          location?: string
          user?: string | null
        }
      }
      players: {
        Row: {
          created_at: string
          id: number
          image: string
          name: string
          uuid: string
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          name: string
          uuid?: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          name?: string
          uuid?: string
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
          image: string | null
          name: string | null
          points: number | null
          uuid: string | null
        }
      }
      points: {
        Row: {
          harvest_id: number | null
          total: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
