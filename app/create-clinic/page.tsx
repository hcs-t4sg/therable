import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import CreateClinicForm from "./create-clinic-form";

export default async function CreateClinicPage() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create Clinic</h1>
        <p className="text-sm text-muted-foreground">Create a clinic</p>
      </div>
      <CreateClinicForm />
    </div>
  );
}