export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          active: boolean
          created_at: string
          emoji: string | null
          flow_type: Database["public"]["Enums"]["flow_type_enum"] | null
          id: string
          is_system_seed: boolean
          ledger_id: string
          name: string
          parent_id: string | null
          sort_index: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          emoji?: string | null
          flow_type?: Database["public"]["Enums"]["flow_type_enum"] | null
          id?: string
          is_system_seed?: boolean
          ledger_id: string
          name: string
          parent_id?: string | null
          sort_index?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          emoji?: string | null
          flow_type?: Database["public"]["Enums"]["flow_type_enum"] | null
          id?: string
          is_system_seed?: boolean
          ledger_id?: string
          name?: string
          parent_id?: string | null
          sort_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledgers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      issuer_catalog: {
        Row: {
          code: string
          display_name: string
          id: string
          issuer_type: string
          logo_url: string | null
        }
        Insert: {
          code: string
          display_name: string
          id?: string
          issuer_type: string
          logo_url?: string | null
        }
        Update: {
          code?: string
          display_name?: string
          id?: string
          issuer_type?: string
          logo_url?: string | null
        }
        Relationships: []
      }
      ledger_entitlements: {
        Row: {
          amount: number
          created_at: string
          expires_at: string | null
          feature: string
          id: string
          ledger_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at?: string | null
          feature: string
          id?: string
          ledger_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string | null
          feature?: string
          id?: string
          ledger_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entitlements_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledgers"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_invites: {
        Row: {
          accepted_at: string | null
          canceled_at: string | null
          created_at: string
          expires_at: string
          id: string
          invitee_user_id: string
          inviter_id: string
          ledger_id: string
          role: Database["public"]["Enums"]["member_role"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          canceled_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invitee_user_id: string
          inviter_id: string
          ledger_id: string
          role?: Database["public"]["Enums"]["member_role"]
          token?: string
        }
        Update: {
          accepted_at?: string | null
          canceled_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invitee_user_id?: string
          inviter_id?: string
          ledger_id?: string
          role?: Database["public"]["Enums"]["member_role"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_invites_invitee_user_id_fkey"
            columns: ["invitee_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_invites_inviter_id_fkey"
            columns: ["inviter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_invites_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledgers"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_members: {
        Row: {
          joined_at: string
          ledger_id: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Insert: {
          joined_at?: string
          ledger_id: string
          role?: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Update: {
          joined_at?: string
          ledger_id?: string
          role?: Database["public"]["Enums"]["member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_members_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledgers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_purchases: {
        Row: {
          consumed_at: string | null
          expires_at: string | null
          id: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          consumed_at?: string | null
          expires_at?: string | null
          id?: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          consumed_at?: string | null
          expires_at?: string | null
          id?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ledgers: {
        Row: {
          base_member_cap: number
          created_at: string
          created_by: string
          id: string
          name: string
          purchase_id: string | null
        }
        Insert: {
          base_member_cap?: number
          created_at?: string
          created_by: string
          id?: string
          name: string
          purchase_id?: string | null
        }
        Update: {
          base_member_cap?: number
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          purchase_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ledgers_purchase"
            columns: ["purchase_id"]
            isOneToOne: true
            referencedRelation: "ledger_purchases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledgers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledgers_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: true
            referencedRelation: "ledger_purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_method_owners: {
        Row: {
          method_id: string
          user_id: string
        }
        Insert: {
          method_id: string
          user_id: string
        }
        Update: {
          method_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_method_owners_method_id_fkey"
            columns: ["method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_method_owners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          account_type: string | null
          active: boolean
          billing_day: number | null
          brand_name: string | null
          created_at: string
          credit_limit: number | null
          id: string
          issuer_id: string
          last4: string | null
          ledger_id: string
          metadata: Json | null
          name: string
          payment_method_type: Database["public"]["Enums"]["payment_method_type"]
        }
        Insert: {
          account_type?: string | null
          active?: boolean
          billing_day?: number | null
          brand_name?: string | null
          created_at?: string
          credit_limit?: number | null
          id?: string
          issuer_id: string
          last4?: string | null
          ledger_id: string
          metadata?: Json | null
          name: string
          payment_method_type: Database["public"]["Enums"]["payment_method_type"]
        }
        Update: {
          account_type?: string | null
          active?: boolean
          billing_day?: number | null
          brand_name?: string | null
          created_at?: string
          credit_limit?: number | null
          id?: string
          issuer_id?: string
          last4?: string | null
          ledger_id?: string
          metadata?: Json | null
          name?: string
          payment_method_type?: Database["public"]["Enums"]["payment_method_type"]
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_issuer_id_fkey"
            columns: ["issuer_id"]
            isOneToOne: false
            referencedRelation: "issuer_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_methods_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledgers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          locale: string | null
          provider_meta: Json | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          locale?: string | null
          provider_meta?: Json | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          locale?: string | null
          provider_meta?: Json | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category_id: string
          created_at: string
          created_by: string
          currency: string
          flow_type: Database["public"]["Enums"]["flow_type_enum"]
          id: string
          ledger_id: string
          memo: string | null
          merchant: string | null
          occurred_on: string
          payment_method_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          category_id: string
          created_at?: string
          created_by: string
          currency?: string
          flow_type: Database["public"]["Enums"]["flow_type_enum"]
          id?: string
          ledger_id: string
          memo?: string | null
          merchant?: string | null
          occurred_on: string
          payment_method_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          category_id?: string
          created_at?: string
          created_by?: string
          currency?: string
          flow_type?: Database["public"]["Enums"]["flow_type_enum"]
          id?: string
          ledger_id?: string
          memo?: string | null
          merchant?: string | null
          occurred_on?: string
          payment_method_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledgers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_transactions: {
        Row: {
          amount: number | null
          category_id: string | null
          category_parent_id: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          flow_type: Database["public"]["Enums"]["flow_type_enum"] | null
          id: string | null
          ledger_id: string | null
          memo: string | null
          merchant: string | null
          occurred_on: string | null
          payment_method_id: string | null
          signed_amount: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["category_parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_ledger_id_fkey"
            columns: ["ledger_id"]
            isOneToOne: false
            referencedRelation: "ledgers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      accept_ledger_invite: { Args: { p_token: string }; Returns: string }
      accept_ledger_invite_by_id: {
        Args: { p_invite_id: string }
        Returns: string
      }
      accept_ledger_invite_for_ledger: {
        Args: { p_ledger_id: string }
        Returns: string
      }
      can_add_member: { Args: { l: string }; Returns: boolean }
      can_edit_ledger: { Args: { l: string; u: string }; Returns: boolean }
      can_edit_method: {
        Args: { p_method: string; u: string }
        Returns: boolean
      }
      create_ledger_from_purchase: {
        Args: { p_name?: string; p_purchase_id: string }
        Returns: string
      }
      create_ledger_invite_by_user_id: {
        Args: {
          p_invitee_user_id: string
          p_ledger_id: string
          p_role?: Database["public"]["Enums"]["member_role"]
        }
        Returns: string
      }
      create_payment_method: {
        Args: {
          p_account_type?: string
          p_billing_day?: number
          p_brand_name?: string
          p_credit_limit?: number
          p_issuer_code?: string
          p_last4?: string
          p_ledger_id: string
          p_logo_url?: string
          p_name: string
          p_owner_user_ids?: string[]
          p_type: Database["public"]["Enums"]["payment_method_type"]
        }
        Returns: string
      }
      create_transaction: {
        Args: {
          p_amount: number
          p_category_id: string
          p_currency?: string
          p_flow_type?: Database["public"]["Enums"]["flow_type_enum"]
          p_ledger_id: string
          p_memo?: string
          p_merchant?: string
          p_occurred_on: string
          p_payment_method_id?: string
        }
        Returns: string
      }
      default_category_seed: { Args: never; Returns: Json }
      delete_transaction: { Args: { p_id: string }; Returns: undefined }
      effective_member_cap: { Args: { l: string }; Returns: number }
      find_user_by_email_exact: {
        Args: { p_email: string }
        Returns: {
          display_name: string
          email: string
          user_id: string
        }[]
      }
      get_ledger_members: {
        Args: { p_ledger_id: string }
        Returns: {
          avatar_url: string
          display_name: string
          email: string
          joined_at: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }[]
      }
      invite_status: {
        Args: { p_ledger_id: string; p_user_id: string }
        Returns: string
      }
      is_member: { Args: { l: string; u: string }; Returns: boolean }
      is_member_of_method: {
        Args: { p_method: string; u: string }
        Returns: boolean
      }
      is_owner: { Args: { l: string; u: string }; Returns: boolean }
      list_payment_methods: {
        Args: { p_ledger_id: string }
        Returns: {
          account_type: string
          active: boolean
          billing_day: number
          created_at: string
          credit_limit: number
          id: string
          issuer_id: string
          last4: string
          name: string
          owners: Json
          type: Database["public"]["Enums"]["payment_method_type"]
        }[]
      }
      list_transactions: {
        Args: {
          p_category_id?: string
          p_flow?: Database["public"]["Enums"]["flow_type_enum"]
          p_from?: string
          p_ledger_id: string
          p_limit?: number
          p_offset?: number
          p_search?: string
          p_to?: string
        }
        Returns: {
          amount: number
          category_emoji: string
          category_id: string
          category_name: string
          category_parent_id: string
          category_parent_name: string
          created_at: string
          created_by: string
          created_by_name: string
          currency: string
          flow_type: Database["public"]["Enums"]["flow_type_enum"]
          id: string
          memo: string
          merchant: string
          occurred_on: string
          payment_method_id: string
          payment_method_name: string
          signed_amount: number
        }[]
      }
      max_regular_ledgers_for_user: { Args: { u: string }; Returns: number }
      member_count_unrestricted: { Args: { l: string }; Returns: number }
      method_ledger_id: { Args: { p_method: string }; Returns: string }
      month_kpis: {
        Args: { p_ledger_id: string; p_month: number; p_year: number }
        Returns: {
          expense_delta: number
          expense_prev: number
          expense_rate: number
          expense_total: number
          income_delta: number
          income_prev: number
          income_total: number
          month: string
          net_signed: number
          saving_delta: number
          saving_prev: number
          saving_rate: number
          saving_total: number
        }[]
      }
      my_pending_invites: {
        Args: never
        Returns: {
          created_at: string
          expires_at: string
          id: string
          inviter_id: string
          ledger_id: string
          ledger_name: string
          role: Database["public"]["Enums"]["member_role"]
        }[]
      }
      seed_categories: {
        Args: { p_ledger_id: string; p_tree: Json }
        Returns: undefined
      }
      set_payment_method_owners: {
        Args: { p_method_id: string; p_owner_user_ids: string[] }
        Returns: undefined
      }
      share_any_ledger: { Args: { a: string; b: string }; Returns: boolean }
      update_payment_method: {
        Args: {
          p_account_type?: string
          p_active?: boolean
          p_billing_day?: number
          p_brand_name?: string
          p_credit_limit?: number
          p_issuer_code?: string
          p_last4?: string
          p_logo_url?: string
          p_method_id: string
          p_name?: string
        }
        Returns: undefined
      }
      update_transaction: {
        Args: {
          p_amount?: number
          p_category_id?: string
          p_currency?: string
          p_flow_type?: Database["public"]["Enums"]["flow_type_enum"]
          p_id: string
          p_memo?: string
          p_merchant?: string
          p_occurred_on?: string
          p_payment_method_id?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      flow_type_enum: "income" | "saving" | "expense"
      issuer_type_enum: "card" | "bank" | "point"
      member_role: "owner" | "editor"
      payment_method_type:
        | "credit_card"
        | "debit_card"
        | "bank_transfer"
        | "cash"
        | "points"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      flow_type_enum: ["income", "saving", "expense"],
      issuer_type_enum: ["card", "bank", "point"],
      member_role: ["owner", "editor"],
      payment_method_type: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "cash",
        "points",
      ],
    },
  },
} as const
