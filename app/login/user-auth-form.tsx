"use client";

import { UserAuthFormUI, type FormData } from "@/components/email-password-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Obtain supabase client from context provider
  const supabaseClient = createClientComponentClient<Database>();
  const router = useRouter();

  const onSubmit = async (input: FormData) => {
    setIsLoading(true);

    // Supabase magic link sign-in
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: input.email.toLowerCase(),
      password: input.password,
    });

    setIsLoading(false);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    router.refresh();
  };

  const OAuthSubmit = async () => {
    setIsLoading(true);

    const { error } = await supabaseClient.auth.signInWithOAuth({ provider: "google" });

    setIsLoading(false);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-2">
      <UserAuthFormUI _onSubmit={onSubmit} isLoading={isLoading} buttonDisplay="Sign In" />
      <Button onClick={() => void OAuthSubmit()}>Sign in with Google</Button>
    </div>
  );
}
