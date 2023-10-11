"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import { patientSchema, type PatientData } from "./info-schemas";
import { type Patient } from "./user-types";

export default function PatientInfoForm(patient: Patient) {
  const router = useRouter();

  const defaultValues: Partial<PatientData> = {
    firstName: patient.firstName ?? undefined,
    lastName: patient.lastName ?? undefined,
    age: patient.age ?? undefined,
    state: patient.state ?? undefined,
    city: patient.city ?? undefined,
    zip: patient.zip ?? undefined,
  };

  const form = useForm<PatientData>({
    resolver: zodResolver(patientSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (input: PatientData) => {
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
        <label htmlFor="age">Age: &nbsp;</label>
        <input type="number" id="age" {...form.register("age")} />
        {form.formState.errors.age && <span> (Error: {form.formState.errors.age?.message})</span>}
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
