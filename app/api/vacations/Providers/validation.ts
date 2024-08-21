import { z } from "zod";

export type VacationSchema = z.infer<typeof vacationSchema>;

export const vacationSchema = z.object({
  participants: z.array(z.object({ value: z.coerce.number(), label: z.string() })).optional(),
  date: z.object({
    from: z.coerce.date({
      required_error: "Requise",
      invalid_type_error: "La date de début doit être une date",
    }),
    to: z.coerce.date({
      required_error: "Requise",
      invalid_type_error: "La date de fin doit être une date",
    }),
  }),
  location: z.string({
    required_error: "Requis",
    invalid_type_error: "Le lieu doit être une chaîne de caractères",
  }),
}).superRefine((values, ctx) => {
  if (values.date.from && values.date.to && values.date.from > values.date.to) {
    ctx.addIssue({
      code: "invalid_date",
      message: "La date de début doit être avant la date de fin",
      path: ["date", "from"],
    });
    ctx.addIssue({
      code: "invalid_date",
      message: "La date de fin doit être après la date de début",
      path: ["date", "to"],
    });
  }
});