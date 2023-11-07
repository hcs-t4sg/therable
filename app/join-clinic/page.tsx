import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import JoinClinicForm from "./join-clinic-form";

export default async function CreateClinicPage() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: patient } = await supabase.from("patients").select().eq("user_id", session.user.id).maybeSingle();
  // Rediret to dashboard if user is not a clinician
  if (!patient){
    redirect("/dashboard")
  }

  return (
    <div style={{ border: '1px solid black', padding: '20px', borderRadius: '4px' }} className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Code</h1>
        <p className="text-sm text-muted-foreground">Ask your physical therapist for the code to be added to the clinic&apos;s portal.</p>
      </div>
      <JoinClinicForm {...patient} />
    </div>
  );
}
