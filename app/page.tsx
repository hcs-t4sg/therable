import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Home() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Users who aren't signed in should be directed to do so.
    redirect("/login");
  } else {
    // Users who are already signed in should be redirected to dashboard
    redirect("/dashboard")
  }
}
