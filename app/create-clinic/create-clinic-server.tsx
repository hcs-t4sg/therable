import { createServerSupabaseClient } from '@/lib/server-utils';

const supabase = createServerSupabaseClient();

async function userIsClinician(userId: string) {
  const { data, error } = await supabase
    .from("clinicians")
    .select()
    .eq("user_id", userId);

  if (error) {
    console.error("Error checking if user is a clinician:", error);
    return false;
  }

  return data.length > 0;
}

async function generateUniqueCode() {
  const codeLength = 16;
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  while (true) {
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const { data, error } = await supabase
        .from('clinics')
        .select('id')
        .eq('code', code);

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return code;
    }
  }
}

type FormData = {
    clinicName: string;
  };

export async function createClinic(data: FormData, userId: string) {
  const clinicCode = await generateUniqueCode();
  const ownerID = userId; 

  const clinicData = {
    clinic_name: data.clinicName,
    clinic_code: clinicCode,
    owner_id: ownerID,
  };

  try {
      const { data: clinic, error } = await supabase
        .from("clinics")
        .upsert([clinicData]);

      if (error) {
          throw new Error(error.message);
      } else {
        console.log(`Your clinic code: ${clinicCode}`);
    }
  } catch (error) {
    console.error("Error creating clinic:", error);
  }
}

export default function CreateClinicFormServer() {
  createClinic
}
