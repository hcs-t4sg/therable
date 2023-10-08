import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { toast } from "../../components/ui/use-toast";

import { patientSchema, type FormData } from "./info-schemas";
import { type Patient } from "./user-types";

export default function PatientInfoForm(patient: Patient) {
  const router = useRouter();

  const defaultValues: Partial<FormData> = {
    firstName: patient.firstName ?? undefined,
    lastName: patient.lastName ?? undefined,
    age: patient.age ?? undefined,
    state: patient.state ?? undefined,
    city: patient.city ?? undefined,
    zip: patient.zip ?? undefined,
  };

  const form = useForm<FormData>({
    resolver: zodResolver(patientSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (input: FormData) => {
    const supabase = createClientComponentClient<Patient>(); // TODO: Supabase typing
    const { error } = await supabase
      .from("patients")
      .update({
        userId: patient.userId,
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
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => {
            const { value, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input value={value ?? ""} {...rest} />
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
        <Button onClick={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>Subit</Button>
      </form>
    </Form>
  );
}
