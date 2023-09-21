"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Template: https://github.com/shadcn/taxonomy/blob/main/components/user-auth-form.tsx

// Create Zod object schema with validations
const userAuthSchema = z.object({
  email: z.string().email(),
});

// Use Zod to extract inferred type from schema
type FormData = z.infer<typeof userAuthSchema>;

export default function UserAuthForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Create form with react-hook-form and use Zod schema to validate the form submission (with resolver)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Obtain supabase client from context provider
  const supabaseClient = createClientComponentClient<Database>();

  const onSubmit = async (input: FormData) => {
    setIsLoading(true);

    // Supabase magic link sign-in
    const { error } = await supabaseClient.auth.signInWithOtp({
      email: input.email.toLowerCase(),
      options: {
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
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={(e: BaseSyntheticEvent) => void handleSubmit(onSubmit)(e)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
