import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { getUserProfile } from "@/lib/utils";
import Link from "next/link";
import UserNav from "./user-nav";

export default async function AuthStatus() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <Button asChild>
        <Link href="/login">Log in</Link>
      </Button>
    );
  }

  const { profile, error } = await getUserProfile(supabase, session);

  if (error) {
    return;
  }

  return <UserNav profile={profile} />;
}
