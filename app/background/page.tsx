import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import PatientInfoForm from "./patient-info-form";

export default async function BackgroundInfo() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  // const { data: patient } = await supabase.from("patients").select().eq("userId", userId);
  // const { data: clinician } = await supabase.from("clinicians").select().eq("userId", userId);

  const patient = {
    id: "22434",
    userId: "testuser"
  };

  return (
    <>
      {patient && (PatientInfoForm(patient))}
    </>
  );
}
