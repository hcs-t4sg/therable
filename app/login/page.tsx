import { createServerSupabaseClient } from "@/lib/server-utils";
import { Card } from "@radix-ui/themes";
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
    <Card className="sm:w-[350px]">
      <div className="flex flex-col space-y-2 pb-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Kinnect</h1>
      </div>
      <UserAuthForm />
      <div className="flex flex-col space-y-1 pt-4 text-center">
        <p className="text-xs text-muted-foreground">
          <Link className="text-base underline" href="/signup">
            New user? Create an account.
          </Link>{" "}
        </p>
      </div>
    </Card>
  );
}
