import { WithoutDBMetadata } from "@/lib/utils/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type Vacation = Prisma.VacationGetPayload<{
  include: {
    participants: true
  }
}>

export type Event = Prisma.EventGetPayload<{}>

export type VacationWithEvents = Prisma.VacationGetPayload<{
  include: {
    participants: true,
    events: true
  }
}>

export type NewVacation = Partial<Vacation>;