export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cell_todos: {
        Row: {
          category: number
          cell_id: string
          created_at: string
          id: string
          is_done: boolean | null
          title: string | null
        }
        Insert: {
          category?: number
          cell_id: string
          created_at?: string
          id?: string
          is_done?: boolean | null
          title?: string | null
        }
        Update: {
          category?: number
          cell_id?: string
          created_at?: string
          id?: string
          is_done?: boolean | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cell_todos_cell_id_fkey"
            columns: ["cell_id"]
            isOneToOne: false
            referencedRelation: "mandalart_cells"
            referencedColumns: ["id"]
          },
        ]
      }
      mandalart_blocks: {
        Row: {
          block_index: number
          created_at: string
          id: string
          mandalart_id: string | null
          primary: boolean | null
        }
        Insert: {
          block_index: number
          created_at?: string
          id?: string
          mandalart_id?: string | null
          primary?: boolean | null
        }
        Update: {
          block_index?: number
          created_at?: string
          id?: string
          mandalart_id?: string | null
          primary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "mandalart_cells_mandalart_id_fkey"
            columns: ["mandalart_id"]
            isOneToOne: false
            referencedRelation: "mandalarts"
            referencedColumns: ["id"]
          },
        ]
      }
      mandalart_cells: {
        Row: {
          block_id: string
          cell_index: number
          content: string | null
          created_at: string
          id: string
          is_center: boolean | null
          is_done: boolean | null
        }
        Insert: {
          block_id: string
          cell_index: number
          content?: string | null
          created_at?: string
          id?: string
          is_center?: boolean | null
          is_done?: boolean | null
        }
        Update: {
          block_id?: string
          cell_index?: number
          content?: string | null
          created_at?: string
          id?: string
          is_center?: boolean | null
          is_done?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "mandalart_cells_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "mandalart_blocks"
            referencedColumns: ["id"]
          },
        ]
      }
      mandalarts: {
        Row: {
          created_at: string
          id: string
          private: boolean
          room_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          private?: boolean
          room_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          private?: boolean
          room_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "mandalarts_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mandalarts_user_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          created_at: string
          id: string
          mandalart_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mandalart_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mandalart_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_mandalart_id_fkey"
            columns: ["mandalart_id"]
            isOneToOne: false
            referencedRelation: "mandalarts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      realtime: {
        Row: {
          cell_id: number
          id: number
          text: string | null
        }
        Insert: {
          cell_id: number
          id?: number
          text?: string | null
        }
        Update: {
          cell_id?: number
          id?: number
          text?: string | null
        }
        Relationships: []
      }
      realtime3: {
        Row: {
          cell: number | null
          content: string | null
          id: string
        }
        Insert: {
          cell?: number | null
          content?: string | null
          id?: string
        }
        Update: {
          cell?: number | null
          content?: string | null
          id?: string
        }
        Relationships: []
      }
      "room_ participants": {
        Row: {
          created_at: string
          id: string
          role: string
          room_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          room_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          room_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_ participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_ participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          allow_guests: boolean
          created_at: string
          id: string
          invite_code: string
          owner: string | null
          passcode: string
        }
        Insert: {
          allow_guests?: boolean
          created_at?: string
          id?: string
          invite_code: string
          owner?: string | null
          passcode: string
        }
        Update: {
          allow_guests?: boolean
          created_at?: string
          id?: string
          invite_code?: string
          owner?: string | null
          passcode?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          nickname: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nickname: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nickname?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
