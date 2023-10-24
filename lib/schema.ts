export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          userid: string;
        };
        Insert: {
          id: string;
          userid: string;
        };
        Update: {
          id?: string;
          userid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admins_userid_fkey";
            columns: ["userid"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      clinicians: {
        Row: {
          city: string | null;
          employer: string | null;
          firstname: string | null;
          id: string;
          lastname: string | null;
          state: string | null;
          userid: string | null;
          zip: string | null;
        };
        Insert: {
          city?: string | null;
          employer?: string | null;
          firstname?: string | null;
          id: string;
          lastname?: string | null;
          state?: string | null;
          userid?: string | null;
          zip?: string | null;
        };
        Update: {
          city?: string | null;
          employer?: string | null;
          firstname?: string | null;
          id?: string;
          lastname?: string | null;
          state?: string | null;
          userid?: string | null;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clinicians_userid_fkey";
            columns: ["userid"];
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
          id: string;
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
      patients: {
        Row: {
          age: number | null;
          city: string | null;
          firstname: string | null;
          id: string;
          lastname: string | null;
          state: string | null;
          userid: string;
          zip: string | null;
        };
        Insert: {
          age?: number | null;
          city?: string | null;
          firstname?: string | null;
          id: string;
          lastname?: string | null;
          state?: string | null;
          userid: string;
          zip?: string | null;
        };
        Update: {
          age?: number | null;
          city?: string | null;
          firstname?: string | null;
          id?: string;
          lastname?: string | null;
          state?: string | null;
          userid?: string;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "patients_userid_fkey";
            columns: ["userid"];
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
          assigndate: string;
          assigner: string | null;
          completed: boolean;
          completedate: string;
          description: string | null;
          duedate: string | null;
          id: string;
          media: string | null;
          name: string;
          patient: string | null;
        };
        Insert: {
          assigndate: string;
          assigner?: string | null;
          completed: boolean;
          completedate: string;
          description?: string | null;
          duedate?: string | null;
          id: string;
          media?: string | null;
          name: string;
          patient?: string | null;
        };
        Update: {
          assigndate?: string;
          assigner?: string | null;
          completed?: boolean;
          completedate?: string;
          description?: string | null;
          duedate?: string | null;
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
      users: {
        Row: {
          email: string;
          id: string;
          password: string;
        };
        Insert: {
          email: string;
          id: string;
          password: string;
        };
        Update: {
          email?: string;
          id?: string;
          password?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
