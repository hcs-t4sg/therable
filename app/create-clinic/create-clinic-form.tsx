"use client";

import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/schema";
type Clinician = Database["public"]["Tables"]["clinicians"]["Row"];


export default function CreateClinicForm(clinician: Clinician) {

  const supabaseClient = createClientComponentClient<Database>();

  type FormData = {
    clinicName: string;
  };

  const CreateClinicForm: React.FC = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function generateUniqueCode() {
      const codeLength = 16;
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

      while (true) {
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Query the Supabase database to check for the existence of the code
        const { data, error } = await supabaseClient
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
    };

    const onSubmit = async (data: FormData) => {
      // if (!userIsClinician) {
      //     // Handle the case where the user is not a clinician
      //     redirect("/dashboard");
      //   }

      setIsLoading(true);

      try {
          // Generate a unique clinic code
          const clinicCode = await generateUniqueCode();

          // Define the data to be inserted
          const clinicData = {
            name: data.clinicName,
            code: clinicCode,
            owner: clinician.id,
          };

          // Insert the clinic data into the 'clinics' table
          const { data: clinic, error } = await supabaseClient
            .from("clinics")
            .upsert(clinicData);

          if (error) {
            setErrorMessage(error.message);
          } else {
            setSuccessMessage(`Your clinic code: ${clinicCode}`);
          }
        } catch (error) {
          setErrorMessage((error as Error).message);
        } finally {
          setIsLoading(false);
        }
    };

    return (
      <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="clinicName">Clinic Name</label>
              <input
                id="clinicName"
                type="text"
                autoComplete="off"
                {...register('clinicName')}
              />
              {errors.clinicName && <p>{errors.clinicName.message}</p>}
            </div>
            <button type="submit" disabled={isLoading}>
              Create Clinic
            </button>
          </form>

        {/* {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>} */}
      </div>
    );
  };
}


