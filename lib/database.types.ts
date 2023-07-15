export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      harvests: {
        Row: {
          claimant: number | null
          created_at: string
          id: number
          image: string
          is_synthetic: boolean
          location: string
          user: string | null
        }
        Insert: {
          claimant?: number | null
          created_at?: string
          id?: number
          image: string
          is_synthetic?: boolean
          location: string
          user?: string | null
        }
        Update: {
          claimant?: number | null
          created_at?: string
          id?: number
          image?: string
          is_synthetic?: boolean
          location?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "harvests_claimant_fkey"
            columns: ["claimant"]
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "harvests_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
        Relationships: []
      }
      leaderboard: {
        Row: {
          harvests: number | null
          image: string | null
          name: string | null
          points: number | null
          uuid: string | null
        }
        Relationships: []
      }
      points: {
        Row: {
          harvest_id: number | null
          total: number | null
        }
        Relationships: []
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
