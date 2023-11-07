"use client";

import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
type Patient = Database["public"]["Tables"]["patients"]["Row"];

// CF&Y@cHWrxI$z8p3

export default function JoinClinicForm(patient: Patient) {
  const supabaseClient = createClientComponentClient<Database>();

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [clinicCode, setClinicCode] = useState<string>("");
  const [clinicName, setClinicName] = useState<string>("");
  const [clinicId, setClinicId] = useState<string>("");
  // const [confirmation, setConfirmation] = useState<boolean>(false);

  const onSubmit = async (code: string) => {
    setIsLoading(true);
    if (!code) {
      setErrorMessage("Please enter a clinic code");
      return;
    }

    const { data, error } = await supabaseClient.from("clinics").select("name, id").eq("code", clinicCode);

    if (error) {
      setErrorMessage(error.message);
    } else if (data && data.length > 0 && data[0]) {
      setClinicName(data[0].name);
      setClinicId(data[0].id);
      // setConfirmation(true);
    } else {
      setErrorMessage("Could not find a clinic with this code.");
    }

    setIsLoading(false);

    try {
      // Define the data to be inserted
      const clinicMemberData = {
        patient_id: patient.id,
        clinic_id: clinicId,
        diagnosis: "",
      };

      // Insert the clinic data into the 'clinics' table
      const { error } = await supabaseClient.from("clinic_members").upsert(clinicMemberData);

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage(`Joined clinic: ${clinicName}`);
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
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px", display: "inline-block" }}>
            <input
              id="clinicCode"
              type="text"
              autoComplete="off"
              onChange={(e) => setClinicCode(e.target.value)}
              style={{ border: "none", width: "100%", padding: "8px", outline: "none" }}
            />
          </div>
        </div>
        <button
          onClick={() => void onSubmit(clinicCode)}
          disabled={isLoading}
          style={{
            display: "block",
            margin: "0 auto",
            backgroundColor: "black",
            color: "white",
            padding: "2px 10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
