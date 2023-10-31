"use client";

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/schema";
type Clinician = Database["public"]["Tables"]["clinicians"]["Row"];


export default function CreateClinicForm(clinician: Clinician) {

  const supabaseClient = createClientComponentClient<Database>();

  // type FormData = {
  //   clinicName: string;
  // };

  // const CreateClinicForm: React.FC = () => {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<FormData>();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [clinicName, setClinicName] = useState<string>("")

  async function generateUniqueCode() {
    const codeLength = 16;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

    // eslint-disable-next-line no-constant-condition
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

  const onSubmit = async (name: string) => {
    setIsLoading(true);
    if (!name){
      setErrorMessage("Clinic name cannot be empty.")
      return
    }

    try {
        // Generate a unique clinic code
        const clinicCode = await generateUniqueCode();

        // Define the data to be inserted
        const clinicData = {
          name,
          code: clinicCode,
          owner: clinician.id,
        };

        // Insert the clinic data into the 'clinics' table
        const { error } = await supabaseClient
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
      <form>
          <div>
            <label htmlFor="clinicName">Clinic Name</label>
            <input
              id="clinicName"
              type="text"
              autoComplete="off"
              onChange={(e) => setClinicName(e.target.value)}
            />
            {/* {errors.clinicName && <p>{errors.clinicName.message}</p>} */}
          </div>
          <button onClick={() => void onSubmit(clinicName)} disabled={isLoading}>
            Create Clinic
          </button>
        </form>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};



