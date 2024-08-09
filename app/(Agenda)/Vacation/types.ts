import { Prisma } from "@prisma/client";

export type Vacation = Prisma.VacationGetPayload<{}>

export type Event = Prisma.EventGetPayload<{}>

export type VacationWithEvents = Vacation & {
  events: Event[]
}