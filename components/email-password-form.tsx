import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseSyntheticEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

// Template: https://github.com/shadcn/taxonomy/blob/main/components/user-auth-form.tsx

// Create Zod object schema with validations
const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const patientAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  age: z.number().gte(0).optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
});

const clinicianAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  employer: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
});

// Use Zod to extract inferred type from schema
// export type FormData = z.infer<typeof userAuthSchema>;

export type FormData =
  | z.infer<typeof userAuthSchema>
  | z.infer<typeof patientAuthSchema>
  | z.infer<typeof clinicianAuthSchema>;

interface UserAuthForm extends React.HTMLAttributes<HTMLDivElement> {
  _onSubmit: SubmitHandler<FormData>;
  isLoading: boolean;
  buttonDisplay: string;
}

export function UserAuthFormUI({ _onSubmit, isLoading, buttonDisplay, className, ...props }: UserAuthForm) {
  // Create form with react-hook-form and use Zod schema to validate the form submission (with resolver)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={(e: BaseSyntheticEvent) => void handleSubmit(_onSubmit)(e)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="border-black"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              className="border-black"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && <p className="px-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <Button className="border-black" variant="outline" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {buttonDisplay}
          </Button>
        </div>
      </form>
    </div>
  );
}
