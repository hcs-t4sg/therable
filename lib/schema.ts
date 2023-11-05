export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          user_id: string;
        };
        Insert: {
          id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admins_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      clinic_members: {
        Row: {
          clinic_id: string | null;
          diagnosis: string;
          id: string;
          join_date: string;
          patient_id: string | null;
        };
        Insert: {
          clinic_id?: string | null;
          diagnosis: string;
          id: string;
          join_date: string;
          patient_id?: string | null;
        };
        Update: {
          clinic_id?: string | null;
          diagnosis?: string;
          id?: string;
          join_date?: string;
          patient_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clinic_members_clinic_id_fkey";
            columns: ["clinic_id"];
            referencedRelation: "clinics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "clinic_members_patient_id_fkey";
            columns: ["patient_id"];
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      clinicians: {
        Row: {
          city: string | null;
          employer: string | null;
          first_name: string;
          id: string;
          last_name: string;
          state: string | null;
          user_id: string | null;
          zip: string | null;
        };
        Insert: {
          city?: string | null;
          employer?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          state?: string | null;
          user_id?: string | null;
          zip?: string | null;
        };
        Update: {
          city?: string | null;
          employer?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          state?: string | null;
          user_id?: string | null;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clinicians_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      clinics: {
        Row: {
          code: string;
          id: string;
          name: string;
          owner: string;
        };
        Insert: {
          code: string;
          id?: string;
          name: string;
          owner: string;
        };
        Update: {
          code?: string;
          id?: string;
          name?: string;
          owner?: string;
        };
        Relationships: [
          {
            foreignKeyName: "clinics_owner_fkey";
            columns: ["owner"];
            referencedRelation: "clinicians";
            referencedColumns: ["id"];
          },
        ];
      };
      data: {
        Row: {
          aud: string | null;
          banned_until: string | null;
          confirmation_sent_at: string | null;
          confirmation_token: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          deleted_at: string | null;
          email: string | null;
          email_change: string | null;
          email_change_confirm_status: number | null;
          email_change_sent_at: string | null;
          email_change_token_current: string | null;
          email_change_token_new: string | null;
          email_confirmed_at: string | null;
          encrypted_password: string | null;
          id: string | null;
          instance_id: string | null;
          invited_at: string | null;
          is_sso_user: boolean | null;
          is_super_admin: boolean | null;
          last_sign_in_at: string | null;
          phone: string | null;
          phone_change: string | null;
          phone_change_sent_at: string | null;
          phone_change_token: string | null;
          phone_confirmed_at: string | null;
          raw_app_meta_data: Json | null;
          raw_user_meta_data: Json | null;
          reauthentication_sent_at: string | null;
          reauthentication_token: string | null;
          recovery_sent_at: string | null;
          recovery_token: string | null;
          role: string | null;
          updated_at: string | null;
        };
        Insert: {
          aud?: string | null;
          banned_until?: string | null;
          confirmation_sent_at?: string | null;
          confirmation_token?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          email_change?: string | null;
          email_change_confirm_status?: number | null;
          email_change_sent_at?: string | null;
          email_change_token_current?: string | null;
          email_change_token_new?: string | null;
          email_confirmed_at?: string | null;
          encrypted_password?: string | null;
          id?: string | null;
          instance_id?: string | null;
          invited_at?: string | null;
          is_sso_user?: boolean | null;
          is_super_admin?: boolean | null;
          last_sign_in_at?: string | null;
          phone?: string | null;
          phone_change?: string | null;
          phone_change_sent_at?: string | null;
          phone_change_token?: string | null;
          phone_confirmed_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: string | null;
          reauthentication_token?: string | null;
          recovery_sent_at?: string | null;
          recovery_token?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Update: {
          aud?: string | null;
          banned_until?: string | null;
          confirmation_sent_at?: string | null;
          confirmation_token?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          email?: string | null;
          email_change?: string | null;
          email_change_confirm_status?: number | null;
          email_change_sent_at?: string | null;
          email_change_token_current?: string | null;
          email_change_token_new?: string | null;
          email_confirmed_at?: string | null;
          encrypted_password?: string | null;
          id?: string | null;
          instance_id?: string | null;
          invited_at?: string | null;
          is_sso_user?: boolean | null;
          is_super_admin?: boolean | null;
          last_sign_in_at?: string | null;
          phone?: string | null;
          phone_change?: string | null;
          phone_change_sent_at?: string | null;
          phone_change_token?: string | null;
          phone_confirmed_at?: string | null;
          raw_app_meta_data?: Json | null;
          raw_user_meta_data?: Json | null;
          reauthentication_sent_at?: string | null;
          reauthentication_token?: string | null;
          recovery_sent_at?: string | null;
          recovery_token?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          media: string | null;
          message: string;
          receiver: string | null;
          sender: string | null;
        };
        Insert: {
          id: string;
          media?: string | null;
          message: string;
          receiver?: string | null;
          sender?: string | null;
        };
        Update: {
          id?: string;
          media?: string | null;
          message?: string;
          receiver?: string | null;
          sender?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "messages_receiver_fkey";
            columns: ["receiver"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_fkey";
            columns: ["sender"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      milestones: {
        Row: {
          assigner: string | null;
          clinic_id: string | null;
          description: string | null;
          id: string;
          name: string;
          patient: string | null;
        };
        Insert: {
          assigner?: string | null;
          clinic_id?: string | null;
          description?: string | null;
          id: string;
          name: string;
          patient?: string | null;
        };
        Update: {
          assigner?: string | null;
          clinic_id?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          patient?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "milestones_assigner_fkey";
            columns: ["assigner"];
            referencedRelation: "clinicians";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "milestones_clinic_id_fkey";
            columns: ["clinic_id"];
            referencedRelation: "clinics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "milestones_patient_fkey";
            columns: ["patient"];
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      patients: {
        Row: {
          age: number | null;
          city: string | null;
          first_name: string;
          id: string;
          last_name: string;
          state: string | null;
          user_id: string;
          zip: string | null;
        };
        Insert: {
          age?: number | null;
          city?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          state?: string | null;
          user_id: string;
          zip?: string | null;
        };
        Update: {
          age?: number | null;
          city?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          state?: string | null;
          user_id?: string;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "patients_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          biography: string | null;
          display_name: string;
          email: string;
          id: string;
          timestamp: string | null;
        };
        Insert: {
          biography?: string | null;
          display_name: string;
          email: string;
          id: string;
          timestamp?: string | null;
        };
        Update: {
          biography?: string | null;
          display_name?: string;
          email?: string;
          id?: string;
          timestamp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          assign_date: string;
          assigner: string | null;
          complete_date: string;
          completed: boolean;
          description: string | null;
          due_date: string | null;
          id: string;
          media: string | null;
          name: string;
          patient: string | null;
        };
        Insert: {
          assign_date: string;
          assigner?: string | null;
          complete_date: string;
          completed: boolean;
          description?: string | null;
          due_date?: string | null;
          id: string;
          media?: string | null;
          name: string;
          patient?: string | null;
        };
        Update: {
          assign_date?: string;
          assigner?: string | null;
          complete_date?: string;
          completed?: boolean;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          media?: string | null;
          name?: string;
          patient?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_assigner_fkey";
            columns: ["assigner"];
            referencedRelation: "clinicians";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_patient_fkey";
            columns: ["patient"];
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      test_call: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
