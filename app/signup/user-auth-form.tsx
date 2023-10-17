"use client";

import { UserAuthFormUI, type FormData } from "@/components/signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Obtain supabase client from context provider
  const supabaseClient = createClientComponentClient<Database>();

  const onSubmit = async (input: FormData) => {
    setIsLoading(true);
    let data;
    switch (input.type) {
      case "patient":
        data = {
          first_name: input.first_name,
          last_name: input.last_name,
          age: input.age,
          state: input.last_name,
          city: input.city,
          zipcode: input.zipcode,
          type: input.type,
        };
        break;
      case "clinician":
        data = {
          first_name: input.first_name,
          last_name: input.last_name,
          employer: input.employer,
          state: input.last_name,
          city: input.city,
          zipcode: input.zipcode,
          type: input.type,
        };
        break;
    }
    const { error } = await supabaseClient.auth.signUp({
      email: input.email.toLowerCase(),
      password: input.password,
      options: {
        data: data,
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    setIsLoading(false);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a confirmation email.",
    });
  };

  return (
    <Tabs defaultValue="patient" className="grid gap-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger disabled={isLoading} value="patient">
          Patient
        </TabsTrigger>
        <TabsTrigger disabled={isLoading} value="clinician">
          Clinician
        </TabsTrigger>
      </TabsList>
      <TabsContent value="patient">
        <UserAuthFormUI _onSubmit={onSubmit} isLoading={isLoading} patient />
      </TabsContent>
      <TabsContent value="clinician">
        <UserAuthFormUI _onSubmit={onSubmit} isLoading={isLoading} patient={false} />
      </TabsContent>
    </Tabs>
  );
}
