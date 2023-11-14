import PatientCard from "@/components/patient-card";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function MyPatients() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || session.user.user_metadata.type !== "clinician") {
    redirect("/dashboard");
  }
  const { data: clinician } = await supabase.from("clinicians").select().eq("user_id", session.user.id).single();

  // redundant check if clinician irretrievable for some reason
  if (!clinician) {
    redirect("/dashboard");
  }

  const { data: clinic } = await supabase.from("clinics").select().eq("owner", clinician.id).single();
  const { data: patients } = await supabase
    .from("clinic_members")
    .select(`*, patients(first_name, last_name)`)
    .eq("clinic_id", clinic?.id);

  return (
    <>
      <p className="mb-10 text-2xl">My patients</p>
      <div className="grid grid-cols-4 gap-4">
        {patients && patients.length > 0 ? (
          patients.map((patient, i) => (
            <PatientCard
              key={i}
              userId={patient.id}
              firstName={patient.patients ? patient.patients.first_name : "FNU"}
              lastName={patient.patients ? patient.patients.last_name : "LNU"}
              diagnosis={patient.diagnosis}
              lastVisit={new Date()} // placeholder
              nextVisit={new Date()} // placeholder
              avatar="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" // placeholder
            />
          ))
        ) : clinic ? (
          <p>No patients currently enrolled</p>
        ) : (
          <p>You haven&apos;t created a clinic yet!</p>
        )}
      </div>
    </>
  );
}
