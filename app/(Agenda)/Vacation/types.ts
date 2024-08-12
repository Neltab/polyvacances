import { WithoutDBMetadata } from "@/app/utils/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type Vacation = WithoutDBMetadata<Prisma.VacationGetPayload<{}>>

export type Event = WithoutDBMetadata<Prisma.EventGetPayload<{}>>

export type VacationWithEvents = Vacation & {
  events: Event[]
}

export type NewVacation = Omit<Vacation, 'id'>

export const vacationSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  location: z.string(),
})