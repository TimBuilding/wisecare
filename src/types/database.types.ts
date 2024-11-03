export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      account_types: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      accounts: {
        Row: {
          account_type_id: string | null
          additional_benefits: string | null
          agent_id: string | null
          annual_physical_examination_date: string | null
          coc_issue_date: string | null
          commision_rate: number | null
          company_address: string | null
          company_name: string
          contact_number: string | null
          contact_person: string | null
          created_at: string
          current_hmo_provider_id: string | null
          delivery_date_of_membership_ids: string | null
          dependent_plan_type_id: string | null
          designation_of_contact_person: string | null
          effectivity_date: string | null
          email_address_of_contact_person: string | null
          expiration_date: string | null
          hmo_provider_id: string | null
          id: string
          initial_contract_value: number | null
          initial_head_count: number | null
          is_active: boolean
          mode_of_payment_id: string | null
          name_of_signatory: string | null
          nature_of_business: string | null
          orientation_date: string | null
          previous_hmo_provider_id: string | null
          principal_plan_type_id: string | null
          signatory_designation: string | null
          special_benefits: string | null
          summary_of_benefits: string | null
          total_premium_paid: number | null
          total_utilization: number | null
          updated_at: string
          wellness_lecture_date: string | null
        }
        Insert: {
          account_type_id?: string | null
          additional_benefits?: string | null
          agent_id?: string | null
          annual_physical_examination_date?: string | null
          coc_issue_date?: string | null
          commision_rate?: number | null
          company_address?: string | null
          company_name: string
          contact_number?: string | null
          contact_person?: string | null
          created_at?: string
          current_hmo_provider_id?: string | null
          delivery_date_of_membership_ids?: string | null
          dependent_plan_type_id?: string | null
          designation_of_contact_person?: string | null
          effectivity_date?: string | null
          email_address_of_contact_person?: string | null
          expiration_date?: string | null
          hmo_provider_id?: string | null
          id?: string
          initial_contract_value?: number | null
          initial_head_count?: number | null
          is_active?: boolean
          mode_of_payment_id?: string | null
          name_of_signatory?: string | null
          nature_of_business?: string | null
          orientation_date?: string | null
          previous_hmo_provider_id?: string | null
          principal_plan_type_id?: string | null
          signatory_designation?: string | null
          special_benefits?: string | null
          summary_of_benefits?: string | null
          total_premium_paid?: number | null
          total_utilization?: number | null
          updated_at?: string
          wellness_lecture_date?: string | null
        }
        Update: {
          account_type_id?: string | null
          additional_benefits?: string | null
          agent_id?: string | null
          annual_physical_examination_date?: string | null
          coc_issue_date?: string | null
          commision_rate?: number | null
          company_address?: string | null
          company_name?: string
          contact_number?: string | null
          contact_person?: string | null
          created_at?: string
          current_hmo_provider_id?: string | null
          delivery_date_of_membership_ids?: string | null
          dependent_plan_type_id?: string | null
          designation_of_contact_person?: string | null
          effectivity_date?: string | null
          email_address_of_contact_person?: string | null
          expiration_date?: string | null
          hmo_provider_id?: string | null
          id?: string
          initial_contract_value?: number | null
          initial_head_count?: number | null
          is_active?: boolean
          mode_of_payment_id?: string | null
          name_of_signatory?: string | null
          nature_of_business?: string | null
          orientation_date?: string | null
          previous_hmo_provider_id?: string | null
          principal_plan_type_id?: string | null
          signatory_designation?: string | null
          special_benefits?: string | null
          summary_of_benefits?: string | null
          total_premium_paid?: number | null
          total_utilization?: number | null
          updated_at?: string
          wellness_lecture_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'accounts_account_type_id_fkey'
            columns: ['account_type_id']
            isOneToOne: false
            referencedRelation: 'account_types'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_agent_id_fkey'
            columns: ['agent_id']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['user_id']
          },
          {
            foreignKeyName: 'accounts_current_hmo_provider_id_fkey'
            columns: ['current_hmo_provider_id']
            isOneToOne: false
            referencedRelation: 'hmo_providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_dependent_plan_type_id_fkey'
            columns: ['dependent_plan_type_id']
            isOneToOne: false
            referencedRelation: 'plan_types'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_hmo_provider_id_fkey'
            columns: ['hmo_provider_id']
            isOneToOne: false
            referencedRelation: 'hmo_providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_mode_of_payment_id_fkey'
            columns: ['mode_of_payment_id']
            isOneToOne: false
            referencedRelation: 'mode_of_payments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_previous_hmo_provider_id_fkey'
            columns: ['previous_hmo_provider_id']
            isOneToOne: false
            referencedRelation: 'hmo_providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accounts_principal_plan_type_id_fkey'
            columns: ['principal_plan_type_id']
            isOneToOne: false
            referencedRelation: 'plan_types'
            referencedColumns: ['id']
          },
        ]
      }
      accounts_column_visibility: {
        Row: {
          columns: Json | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          columns?: Json | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          columns?: Json | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string | null
          created_at: string
          description: string | null
          id: number
          table_name: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string
          description?: string | null
          id?: number
          table_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string
          description?: string | null
          id?: number
          table_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      billing_statements: {
        Row: {
          account_id: string | null
          amount: number | null
          amount_billed: number | null
          amount_paid: number | null
          balance: number | null
          billing_period: number | null
          commission_earned: number | null
          commission_rate: number | null
          created_at: string
          due_date: string | null
          id: string
          is_active: boolean
          mode_of_payment_id: string | null
          or_date: string | null
          or_number: string | null
          sa_number: string | null
          total_contract_value: number | null
          updated_at: string
        }
        Insert: {
          account_id?: string | null
          amount?: number | null
          amount_billed?: number | null
          amount_paid?: number | null
          balance?: number | null
          billing_period?: number | null
          commission_earned?: number | null
          commission_rate?: number | null
          created_at?: string
          due_date?: string | null
          id?: string
          is_active?: boolean
          mode_of_payment_id?: string | null
          or_date?: string | null
          or_number?: string | null
          sa_number?: string | null
          total_contract_value?: number | null
          updated_at?: string
        }
        Update: {
          account_id?: string | null
          amount?: number | null
          amount_billed?: number | null
          amount_paid?: number | null
          balance?: number | null
          billing_period?: number | null
          commission_earned?: number | null
          commission_rate?: number | null
          created_at?: string
          due_date?: string | null
          id?: string
          is_active?: boolean
          mode_of_payment_id?: string | null
          or_date?: string | null
          or_number?: string | null
          sa_number?: string | null
          total_contract_value?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'billing_statements_account_id_fkey'
            columns: ['account_id']
            isOneToOne: false
            referencedRelation: 'accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'billing_statements_mode_of_payment_id_fkey'
            columns: ['mode_of_payment_id']
            isOneToOne: false
            referencedRelation: 'mode_of_payments'
            referencedColumns: ['id']
          },
        ]
      }
      company_employees: {
        Row: {
          account_id: string | null
          birth_date: string | null
          card_number: string | null
          civil_status: string | null
          created_at: string
          created_by: string | null
          effective_date: string | null
          first_name: string | null
          gender: string | null
          id: string
          is_active: boolean
          last_name: string | null
          maximum_benefit_limit: string | null
          room_plan: string | null
          updated_at: string
        }
        Insert: {
          account_id?: string | null
          birth_date?: string | null
          card_number?: string | null
          civil_status?: string | null
          created_at?: string
          created_by?: string | null
          effective_date?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          maximum_benefit_limit?: string | null
          room_plan?: string | null
          updated_at?: string
        }
        Update: {
          account_id?: string | null
          birth_date?: string | null
          card_number?: string | null
          civil_status?: string | null
          created_at?: string
          created_by?: string | null
          effective_date?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          maximum_benefit_limit?: string | null
          room_plan?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'company_employees_account_id_fkey'
            columns: ['account_id']
            isOneToOne: false
            referencedRelation: 'accounts'
            referencedColumns: ['id']
          },
        ]
      }
      departments: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      hmo_providers: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      mode_of_payments: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      mode_of_premium: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          description: string
          id: string
          read: boolean
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          read?: boolean
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          read?: boolean
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pending_accounts: {
        Row: {
          account_id: string | null
          account_type_id: string | null
          additional_benefits: string | null
          agent_id: string | null
          annual_physical_examination_date: string | null
          coc_issue_date: string | null
          commision_rate: number | null
          company_address: string | null
          company_name: string
          contact_number: string | null
          contact_person: string | null
          created_at: string
          created_by: string
          current_hmo_provider_id: string | null
          delivery_date_of_membership_ids: string | null
          dependent_plan_type_id: string | null
          designation_of_contact_person: string | null
          effectivity_date: string | null
          email_address_of_contact_person: string | null
          expiration_date: string | null
          hmo_provider_id: string | null
          id: string
          initial_contract_value: number | null
          initial_head_count: number | null
          is_active: boolean
          is_approved: boolean
          is_delete_account: boolean
          mode_of_payment_id: string | null
          name_of_signatory: string | null
          nature_of_business: string | null
          operation_type: Database['public']['Enums']['pending_operation']
          orientation_date: string | null
          previous_hmo_provider_id: string | null
          principal_plan_type_id: string | null
          signatory_designation: string | null
          special_benefits: string | null
          summary_of_benefits: string | null
          total_premium_paid: number | null
          total_utilization: number | null
          updated_at: string
          wellness_lecture_date: string | null
        }
        Insert: {
          account_id?: string | null
          account_type_id?: string | null
          additional_benefits?: string | null
          agent_id?: string | null
          annual_physical_examination_date?: string | null
          coc_issue_date?: string | null
          commision_rate?: number | null
          company_address?: string | null
          company_name: string
          contact_number?: string | null
          contact_person?: string | null
          created_at?: string
          created_by: string
          current_hmo_provider_id?: string | null
          delivery_date_of_membership_ids?: string | null
          dependent_plan_type_id?: string | null
          designation_of_contact_person?: string | null
          effectivity_date?: string | null
          email_address_of_contact_person?: string | null
          expiration_date?: string | null
          hmo_provider_id?: string | null
          id?: string
          initial_contract_value?: number | null
          initial_head_count?: number | null
          is_active?: boolean
          is_approved?: boolean
          is_delete_account?: boolean
          mode_of_payment_id?: string | null
          name_of_signatory?: string | null
          nature_of_business?: string | null
          operation_type: Database['public']['Enums']['pending_operation']
          orientation_date?: string | null
          previous_hmo_provider_id?: string | null
          principal_plan_type_id?: string | null
          signatory_designation?: string | null
          special_benefits?: string | null
          summary_of_benefits?: string | null
          total_premium_paid?: number | null
          total_utilization?: number | null
          updated_at?: string
          wellness_lecture_date?: string | null
        }
        Update: {
          account_id?: string | null
          account_type_id?: string | null
          additional_benefits?: string | null
          agent_id?: string | null
          annual_physical_examination_date?: string | null
          coc_issue_date?: string | null
          commision_rate?: number | null
          company_address?: string | null
          company_name?: string
          contact_number?: string | null
          contact_person?: string | null
          created_at?: string
          created_by?: string
          current_hmo_provider_id?: string | null
          delivery_date_of_membership_ids?: string | null
          dependent_plan_type_id?: string | null
          designation_of_contact_person?: string | null
          effectivity_date?: string | null
          email_address_of_contact_person?: string | null
          expiration_date?: string | null
          hmo_provider_id?: string | null
          id?: string
          initial_contract_value?: number | null
          initial_head_count?: number | null
          is_active?: boolean
          is_approved?: boolean
          is_delete_account?: boolean
          mode_of_payment_id?: string | null
          name_of_signatory?: string | null
          nature_of_business?: string | null
          operation_type?: Database['public']['Enums']['pending_operation']
          orientation_date?: string | null
          previous_hmo_provider_id?: string | null
          principal_plan_type_id?: string | null
          signatory_designation?: string | null
          special_benefits?: string | null
          summary_of_benefits?: string | null
          total_premium_paid?: number | null
          total_utilization?: number | null
          updated_at?: string
          wellness_lecture_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'pending_accounts_account_id_fkey'
            columns: ['account_id']
            isOneToOne: false
            referencedRelation: 'accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_accounts_account_type_id_fkey'
            columns: ['account_type_id']
            isOneToOne: false
            referencedRelation: 'account_types'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_accounts_agent_id_fkey'
            columns: ['agent_id']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['user_id']
          },
          {
            foreignKeyName: 'pending_accounts_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['user_id']
          },
          {
            foreignKeyName: 'pending_accounts_current_hmo_provider_id_fkey'
            columns: ['current_hmo_provider_id']
            isOneToOne: false
            referencedRelation: 'hmo_providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_accounts_dependent_plan_type_id_fkey'
            columns: ['dependent_plan_type_id']
            isOneToOne: false
            referencedRelation: 'plan_types'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_accounts_hmo_provider_id_fkey'
            columns: ['hmo_provider_id']
            isOneToOne: false
            referencedRelation: 'hmo_providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_accounts_mode_of_payment_id_fkey'
            columns: ['mode_of_payment_id']
            isOneToOne: false
            referencedRelation: 'mode_of_payments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_accounts_previous_hmo_provider_id_fkey'
            columns: ['previous_hmo_provider_id']
            isOneToOne: false
            referencedRelation: 'hmo_providers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_accounts_principal_plan_type_id_fkey'
            columns: ['principal_plan_type_id']
            isOneToOne: false
            referencedRelation: 'plan_types'
            referencedColumns: ['id']
          },
        ]
      }
      pending_billing_statements: {
        Row: {
          account_id: string
          amount: number | null
          amount_billed: number | null
          amount_paid: number | null
          balance: number | null
          billing_period: number | null
          commission_earned: number | null
          commission_rate: number | null
          created_at: string
          created_by: string
          due_date: string | null
          id: string
          is_active: boolean
          is_approved: boolean
          is_delete_billing_statement: boolean
          mode_of_payment_id: string | null
          operation_type: Database['public']['Enums']['pending_operation']
          or_date: string | null
          or_number: string | null
          sa_number: string | null
          total_contract_value: number | null
          updated_at: string
        }
        Insert: {
          account_id: string
          amount?: number | null
          amount_billed?: number | null
          amount_paid?: number | null
          balance?: number | null
          billing_period?: number | null
          commission_earned?: number | null
          commission_rate?: number | null
          created_at?: string
          created_by: string
          due_date?: string | null
          id?: string
          is_active?: boolean
          is_approved?: boolean
          is_delete_billing_statement?: boolean
          mode_of_payment_id?: string | null
          operation_type: Database['public']['Enums']['pending_operation']
          or_date?: string | null
          or_number?: string | null
          sa_number?: string | null
          total_contract_value?: number | null
          updated_at?: string
        }
        Update: {
          account_id?: string
          amount?: number | null
          amount_billed?: number | null
          amount_paid?: number | null
          balance?: number | null
          billing_period?: number | null
          commission_earned?: number | null
          commission_rate?: number | null
          created_at?: string
          created_by?: string
          due_date?: string | null
          id?: string
          is_active?: boolean
          is_approved?: boolean
          is_delete_billing_statement?: boolean
          mode_of_payment_id?: string | null
          operation_type?: Database['public']['Enums']['pending_operation']
          or_date?: string | null
          or_number?: string | null
          sa_number?: string | null
          total_contract_value?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'pending_billing_statements_account_id_fkey'
            columns: ['account_id']
            isOneToOne: false
            referencedRelation: 'accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'pending_billing_statements_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'user_profiles'
            referencedColumns: ['user_id']
          },
          {
            foreignKeyName: 'pending_billing_statements_mode_of_payment_id_fkey'
            columns: ['mode_of_payment_id']
            isOneToOne: false
            referencedRelation: 'mode_of_payments'
            referencedColumns: ['id']
          },
        ]
      }
      plan_types: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          department_id: number | null
          email: string | null
          first_name: string | null
          last_name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department_id?: number | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department_id?: number | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_profiles_department_id_fkey'
            columns: ['department_id']
            isOneToOne: false
            referencedRelation: 'departments'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pending_operation: 'insert' | 'update' | 'delete'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
