import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import PatientInfoForm from "./patient-info-form";
import ClinicianInfoForm from "./clinician-info-form";

export default async function BackgroundInfo() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  // TODO: pull user data from Supabase
  // const userId = session.user.id;
  // const { data: patient } = await supabase.from("patients").select().eq("userId", userId);
  // const { data: clinician } = await supabase.from("clinicians").select().eq("userId", userId);

  const testUser = {
    id: "22434",
    userId: "testuser",
    firstName: "Bob",
    lastName: "Johnson"
  }

  const patient = testUser;
  const clinician = testUser;

  return (
    <>
      {patient && (<PatientInfoForm {...patient} />)}
      {clinician && (<ClinicianInfoForm {...clinician} />)}
    </>
  );
}
