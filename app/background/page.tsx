import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import ClinicianInfoForm from "./clinician-info-form";
import PatientInfoForm from "./patient-info-form";

export default async function BackgroundInfo() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  // Retrieve user information
  const userid = session.user.id;
  const { data: patients } = await supabase.from("patients").select().eq("user_id", userid);
  const { data: clinicians } = await supabase.from("clinicians").select().eq("user_id", userid);

  // Allow size > 1 for now
  if (!patients?.length && !clinicians?.length) {
    return <>User data not found.</>;
  }

  return (
    <>
      {patients?.map((patient) => <PatientInfoForm key={patient.id} {...patient} />)}
      {clinicians?.map((clinician) => <ClinicianInfoForm key={clinician.id} {...clinician} />)}
    </>
  );
}
