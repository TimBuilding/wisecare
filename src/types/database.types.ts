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
          account_type_id: string
          additional_benefits: string
          agent_id: string
          amount: number | null
          annual_physical_examination_date: string
          balance: number | null
          billing_period: number | null
          coc_issue_date: string
          commision_rate: number
          company_address: string
          company_name: string
          contact_number: string
          contact_person: string
          created_at: string
          current_hmo_provider_id: string
          delivery_date_of_membership_ids: string
          dependent_plan_type_id: string
          due_date: string | null
          effective_date: string
          effectivity_date: string
          expiration_date: string
          hmo_provider_id: string
          id: string
          initial_contract_value: number
          initial_head_count: number
          is_active: boolean
          mode_of_payment_id: string
          mode_of_premium_id: string | null
          nature_of_business: string
          or_date: string | null
          or_number: string | null
          orientation_date: string
          previous_hmo_provider_id: string
          principal_plan_type_id: string
          renewal_date: string
          sa_number: string | null
          signatory_designation: string
          special_benefits: string
          summary_of_benefits: string | null
          total_contract_value: number | null
          total_premium_paid: number
          total_utilization: number
          updated_at: string
          wellness_lecture_date: string
        }
        Insert: {
          account_type_id: string
          additional_benefits: string
          agent_id: string
          amount?: number | null
          annual_physical_examination_date: string
          balance?: number | null
          billing_period?: number | null
          coc_issue_date: string
          commision_rate: number
          company_address: string
          company_name: string
          contact_number: string
          contact_person: string
          created_at?: string
          current_hmo_provider_id: string
          delivery_date_of_membership_ids: string
          dependent_plan_type_id: string
          due_date?: string | null
          effective_date: string
          effectivity_date: string
          expiration_date: string
          hmo_provider_id: string
          id?: string
          initial_contract_value: number
          initial_head_count: number
          is_active?: boolean
          mode_of_payment_id: string
          mode_of_premium_id?: string | null
          nature_of_business: string
          or_date?: string | null
          or_number?: string | null
          orientation_date: string
          previous_hmo_provider_id: string
          principal_plan_type_id: string
          renewal_date: string
          sa_number?: string | null
          signatory_designation: string
          special_benefits: string
          summary_of_benefits?: string | null
          total_contract_value?: number | null
          total_premium_paid: number
          total_utilization: number
          updated_at?: string
          wellness_lecture_date: string
        }
        Update: {
          account_type_id?: string
          additional_benefits?: string
          agent_id?: string
          amount?: number | null
          annual_physical_examination_date?: string
          balance?: number | null
          billing_period?: number | null
          coc_issue_date?: string
          commision_rate?: number
          company_address?: string
          company_name?: string
          contact_number?: string
          contact_person?: string
          created_at?: string
          current_hmo_provider_id?: string
          delivery_date_of_membership_ids?: string
          dependent_plan_type_id?: string
          due_date?: string | null
          effective_date?: string
          effectivity_date?: string
          expiration_date?: string
          hmo_provider_id?: string
          id?: string
          initial_contract_value?: number
          initial_head_count?: number
          is_active?: boolean
          mode_of_payment_id?: string
          mode_of_premium_id?: string | null
          nature_of_business?: string
          or_date?: string | null
          or_number?: string | null
          orientation_date?: string
          previous_hmo_provider_id?: string
          principal_plan_type_id?: string
          renewal_date?: string
          sa_number?: string | null
          signatory_designation?: string
          special_benefits?: string
          summary_of_benefits?: string | null
          total_contract_value?: number | null
          total_premium_paid?: number
          total_utilization?: number
          updated_at?: string
          wellness_lecture_date?: string
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
            foreignKeyName: 'accounts_mode_of_premium_id_fkey'
            columns: ['mode_of_premium_id']
            isOneToOne: false
            referencedRelation: 'mode_of_premium'
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
          department: Database['public']['Enums']['department'] | null
          email: string
          first_name: string
          last_name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: Database['public']['Enums']['department'] | null
          email: string
          first_name: string
          last_name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: Database['public']['Enums']['department'] | null
          email?: string
          first_name?: string
          last_name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_profiles_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
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
      department:
        | 'marketing'
        | 'after-sales'
        | 'under-writing'
        | 'finance'
        | 'admin'
        | 'agent'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey'
            columns: ['upload_id']
            isOneToOne: false
            referencedRelation: 's3_multipart_uploads'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
