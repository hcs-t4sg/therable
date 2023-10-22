import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseSyntheticEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const prettyText = (text: string, capitalize: boolean) => {
  let no_case = text.replaceAll("_", " ");
  if (capitalize) {
    no_case = no_case.charAt(0).toUpperCase() + no_case.slice(1);
  }
  return no_case;
};

// Create Zod object schema with validations
const patientAuthSchema = z.object({
  type: z.literal("patient").default("patient"),
  email: z.string().email(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  age: z.coerce.number().gte(0).optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
});

const clinicianAuthSchema = z.object({
  type: z.literal("clinician").default("clinician"),
  email: z.string().email(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  employer: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
});

const clinicianFields = clinicianAuthSchema.omit({ email: true, password: true, type: true }).keyof().options;
const patientFields = patientAuthSchema.omit({ email: true, password: true, type: true }).keyof().options;

// Use Zod to extract inferred type from schema
// export type FormData = z.infer<typeof userAuthSchema>;

export type FormData = z.infer<typeof patientAuthSchema> | z.infer<typeof clinicianAuthSchema>;

interface UserAuthForm extends React.HTMLAttributes<HTMLDivElement> {
  _onSubmit: SubmitHandler<FormData>;
  isLoading: boolean;
  patient: boolean;
}

export function UserAuthFormUI({ _onSubmit, isLoading, patient, className, ...props }: UserAuthForm) {
  // Create form with react-hook-form and use Zod schema to validate the form submission (with resolver)
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(patient ? patientAuthSchema : clinicianAuthSchema),
  });

  function inputItem(field: (typeof clinicianFields)[number] | (typeof patientFields)[number]) {
    return (
      <div key={field} className="grid grow gap-1">
        <Label className="sr-only" htmlFor={field}>
          {prettyText(field, true)}
        </Label>
        <Input
          id={field}
          className="border-black"
          placeholder={prettyText(field, false)}
          type={field}
          autoCapitalize="none"
          autoComplete="none"
          autoCorrect="off"
          disabled={isLoading}
          {...register(field)}
        />
        {errors[field as keyof typeof errors] && (
          <p className="px-1 text-xs text-red-600">{errors[field as keyof typeof errors]?.message}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={(e: BaseSyntheticEvent) => void handleSubmit(_onSubmit)(e)}>
        {errors?.type && <p className="px-1 text-xs text-red-600">{errors.type.message}</p>}
        <div className="grid grid-cols-2 gap-2">
          <div className="grid grow gap-1">
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
              className="border-black"
              {...register("email")}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="grid grow gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              className="border-black"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && <p className="px-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          {patient ? patientFields.map((field) => inputItem(field)) : clinicianFields.map((field) => inputItem(field))}
          <Button className="col-span-2" disabled={isLoading} type="submit">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
