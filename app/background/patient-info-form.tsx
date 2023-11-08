"use client";

import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import { type Database } from "@/lib/schema";
import { patientSchema, type PatientData } from "./info-schemas";
type Patient = Database["public"]["Tables"]["patients"]["Row"];

export default function PatientInfoForm(patient: Patient) {
  const router = useRouter();

  const defaultValues: Partial<PatientData> = {
    first_name: patient.first_name,
    last_name: patient.last_name,
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

  const onSubmit = async (input: PatientData) => {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase
      .from("patients")
      .update({
        user_id: patient.user_id,
        ...input,
      })
      .eq("id", patient.id);

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
        <input type="text" id="firstname" {...form.register("first_name")} />
        {form.formState.errors.first_name && <span> (Error: {form.formState.errors.first_name?.message})</span>}
      </div>
      <div>
        <label htmlFor="lastname">Last Name: &nbsp;</label>
        <input type="text" id="lastname" {...form.register("last_name")} />
        {form.formState.errors.last_name && <span> (Error: {form.formState.errors.last_name?.message})</span>}
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
