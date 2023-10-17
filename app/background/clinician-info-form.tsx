"use client";

import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import { type Database } from "@/lib/schema";
import { clinicianSchema, type ClinicianData } from "./info-schemas";
type Clinician = Database["public"]["Tables"]["clinicians"]["Row"];

export default function ClinicianInfoForm(clinician: Clinician) {
  const router = useRouter();

  const defaultValues: Partial<ClinicianData> = {
    firstname: clinician.firstname ?? undefined,
    lastname: clinician.lastname ?? undefined,
    employer: clinician.employer ?? undefined,
    state: clinician.state ?? undefined,
    city: clinician.city ?? undefined,
    zip: clinician.zip ?? undefined,
  };

  const form = useForm<ClinicianData>({
    resolver: zodResolver(clinicianSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (input: ClinicianData) => {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase
      .from("clinicians")
      .update({
        userid: clinician.userid,
        ...input,
      })
      .eq("id", clinician.id);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    form.reset(input);
    router.refresh();
  };

  return (
    <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>
      <div>
        <label htmlFor="firstname">First Name: &nbsp;</label>
        <input type="text" id="firstname" {...form.register("firstname")} />
        {form.formState.errors.firstname && <span> (Error: {form.formState.errors.firstname?.message})</span>}
      </div>
      <div>
        <label htmlFor="lastname">Last Name: &nbsp;</label>
        <input type="text" id="lastname" {...form.register("lastname")} />
        {form.formState.errors.lastname && <span> (Error: {form.formState.errors.lastname?.message})</span>}
      </div>
      <div>
        <label htmlFor="age">Employer: &nbsp;</label>
        <input type="text" id="employer" {...form.register("employer")} />
        {form.formState.errors.employer && <span> (Error: {form.formState.errors.employer?.message})</span>}
      </div>
      <div>
        <label htmlFor="state">State: &nbsp;</label>
        <input type="text" id="state" {...form.register("state")} />
        {form.formState.errors.state && <span> (Error: {form.formState.errors.state?.message})</span>}
      </div>
      <div>
        <label htmlFor="city">City: &nbsp;</label>
        <input type="text" id="city" {...form.register("city")} />
        {form.formState.errors.city && <span> (Error: {form.formState.errors.city?.message})</span>}
      </div>
      <div>
        <label htmlFor="zip">Zip Code: &nbsp;</label>
        <input type="text" id="zip" {...form.register("zip")} />
        {form.formState.errors.zip && <span> (Error: {form.formState.errors.zip?.message})</span>}
      </div>
      <div>
        <br />
        <button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
}
