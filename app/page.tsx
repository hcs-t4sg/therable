import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Home() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Users who are already signed in should be redirected to dashboard
    redirect("/login");
  }
  return (
      <TypographyH2>Welcome to Therable!</TypographyH2>
  );
}
