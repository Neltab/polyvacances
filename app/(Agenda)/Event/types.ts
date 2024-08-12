import { WithoutDBMetadata } from "@/app/utils/db";
import { Prisma, tag } from "@prisma/client";
import moment from "moment";
import { z } from "zod";

export type Event = WithoutDBMetadata<Prisma.EventGetPayload<{}>>

export type EventTags = tag;

export type NewEvent = Omit<Event, "id">

export const EVENT_TAGS = ["TRANSPORT", "LOGISTIQUE", "NATURE", "MONUMENT", "VILLE", "VILLAGE", "ACTIVITE", "RESTAURANT"] as const;

export const eventSchema = z.object({
  vacationId: z.coerce.number(),
  title: z.string(),
  description: z.string(),
  tag: z.enum(EVENT_TAGS),
  start: z.coerce.date(),
  end: z.coerce.date(),
  location: z.string(),
});