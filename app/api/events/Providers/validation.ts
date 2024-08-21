import { z } from "zod";
import { EVENT_TAGS } from "../types";
import { Vacation } from "@prisma/client";

export type EventSchema = z.infer<ReturnType<typeof getEventSchemaForVacation>>;

export const getEventSchemaForVacation = (vacation: Vacation) => {
  return z.object({
    vacationId: z.coerce.number(),

    title: z.string({
      required_error: "Requis",
      invalid_type_error: "Le titre doit être une chaîne de caractères",
    }),

    description: z.string().optional(),

    tag: z.enum(EVENT_TAGS, {
      invalid_type_error: "Le type d'évènement n'est pas valide",
      required_error: "Requis",
    }),

    start: z.coerce.date({
      required_error: "Requis",
      invalid_type_error: "La date de début doit être une date",
    }).min(vacation.startDate, {message: "La date de début doit être après le début des vacances"}),

    end: z.coerce.date({
      required_error: "Requis",
      invalid_type_error: "La date de fin doit être une date",
    }).max(vacation.endDate, {message: "La date de fin doit être avant la fin des vacances"}),
    
    location: z.string({
      required_error: "Requis",
      invalid_type_error: "L'emplacement doit être une chaîne de caractères",
    }),
  })
  .superRefine((values, ctx) => {
    if (values.start && values.end && values.start > values.end) {
      ctx.addIssue({
        code: "invalid_date",
        message: "La date de début doit être avant la date de fin",
        path: ["start"],
      });
      ctx.addIssue({
        code: "invalid_date",
        message: "La date de fin doit être après la date de début",
        path: ["end"],
      });
    }
  });
}