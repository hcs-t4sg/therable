import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import UserAuthForm from "./user-auth-form";

export default async function LoginPage() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Users who are already signed in should be redirected to dashboard
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign up or log in</h1>
        <p className="text-sm text-muted-foreground">Enter your login information, or create a new account</p>
      </div>
      <UserAuthForm />
    </div>
  );
}
