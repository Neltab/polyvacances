import { Prisma, tag } from "@prisma/client";

export type Event = Prisma.EventGetPayload<{}>

export type EventTags = tag;