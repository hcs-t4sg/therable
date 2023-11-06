"use client";

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/schema";
type Clinician = Database["public"]["Tables"]["clinicians"]["Row"];


export default function CreateClinicForm(clinician: Clinician) {

  const supabaseClient = createClientComponentClient<Database>();

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [clinicName, setClinicName] = useState<string>("")

  async function generateUniqueCode() {
    // Spit out clinician's code if they have already made a clinic
    const { data: existingClinic } = await supabaseClient.from("clinics").select().eq("owner", clinician.id).single();

    if (existingClinic?.code) {
      return existingClinic?.code
    }

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
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', display: 'inline-block' }}>
            <input
              id="clinicName"
              type="text"
              autoComplete="off"
              placeholder="Clinic Name"  // Add the placeholder attribute
              onChange={(e) => setClinicName(e.target.value)}
            />
          </div>
        </div>
        <button onClick={() => void onSubmit(clinicName)} disabled={isLoading}
              style={{
                display: 'block',
                margin: '0 auto',
                backgroundColor: 'black',
                color: 'white',
                padding: '2px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
          Submit
        </button>
      </form>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};



