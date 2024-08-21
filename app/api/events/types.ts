import { WithoutDBMetadata } from "@/lib/utils/db";
import { Prisma, tag } from "@prisma/client";

export type Event = WithoutDBMetadata<Prisma.EventGetPayload<{}>>

export type EventTags = tag;

export type NewEvent = Omit<Event, "id">;

export type UpdateEvent = Partial<NewEvent> & { id: number };

export const EVENT_TAGS = ["TRANSPORT", "LOGISTIQUE", "NATURE", "MONUMENT", "VILLE", "VILLAGE", "ACTIVITE", "RESTAURANT"] as const;