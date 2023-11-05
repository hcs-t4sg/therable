import { z } from "zod";

const patientSchema = z.object({
  first_name: z
    .string()
    .min(1),
  last_name: z
    .string()
    .min(1),
  age: z.coerce
    .number()
    .int()
    .gte(0)
    .nullable()
    .transform((val) => (val == 0 ? null : val)),
  state: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
  city: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
  zip: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
});

const clinicianSchema = z.object({
  first_name: z
    .string()
    .min(1),
  last_name: z
    .string()
    .min(1),
  employer: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
  state: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
  city: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
  zip: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
});

type PatientData = z.infer<typeof patientSchema>;
type ClinicianData = z.infer<typeof clinicianSchema>;

export { clinicianSchema, patientSchema, type ClinicianData, type PatientData };
