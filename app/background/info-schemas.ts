import { z } from "zod";

const patientSchema = z.object({
  firstName: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
  lastName: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
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
  firstName: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
  lastName: z
    .string()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val?.trim())),
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
