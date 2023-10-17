import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import CreateClinicForm from "./create-clinic-form";

export default async function LoginPage() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

//   if (session) {
//     // Users who are already signed in should be redirected to species page
//     redirect("/species");
//   }
//   else {
//     console.log(session)
//   }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up / Log In</h1>
        <p className="text-sm text-muted-foreground">Enter your email below to sign in or create a new account.</p>
      </div>
      <CreateClinicForm />
    </div>
  );
}