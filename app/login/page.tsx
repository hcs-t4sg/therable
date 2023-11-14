import { LoginCard } from "@/components/login-card";
import { createServerSupabaseClient } from "@/lib/server-utils";
import Link from "next/link";
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
    <LoginCard className="sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Therable</h1>
      </div>
      <UserAuthForm />
      <div className="flex flex-col space-y-1 text-center">
        <p className="text-xs text-muted-foreground">
          <Link className="text-base underline" href="/signup">
            New user? Create an account.
          </Link>{" "}
        </p>
      </div>
    </LoginCard>
  );
}
