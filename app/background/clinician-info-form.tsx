"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import { clinicianSchema, type ClinicianData } from "./info-schemas";
import { type Clinician } from "./user-types";

export default function ClinicianInfoForm(clinician: Clinician) {
  const router = useRouter();

  const defaultValues: Partial<ClinicianData> = {
    firstName: clinician.firstName ?? undefined,
    lastName: clinician.lastName ?? undefined,
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

  const onSubmit = (input: ClinicianData) => {
    console.log(input);

    // TODO: Supabase connection
    // const supabase = createClientComponentClient<>();
    // const { error } = await supabase
    //   .from("patients")
    //   .update({
    //     userId: patient.userId,
    //     ...input,
    //   })
    //   .eq("id", patient.id);

    // if (error) {
    //   console.log(error.message);
    // }

    // form.reset(input);

    router.refresh();
  };

  return (
    <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>
      <div>
        <label htmlFor="firstName">First Name: &nbsp;</label>
        <input type="text" id="firstName" {...form.register("firstName")} />
        {form.formState.errors.firstName && <span> (Error: {form.formState.errors.firstName?.message})</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name: &nbsp;</label>
        <input type="text" id="lastName" {...form.register("lastName")} />
        {form.formState.errors.lastName && <span> (Error: {form.formState.errors.lastName?.message})</span>}
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
