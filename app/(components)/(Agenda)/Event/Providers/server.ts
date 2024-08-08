'use server'
import prisma from "@/app/(components)/utils/db";
import path from "path";
import fs from "fs";
import { z } from "zod";

const EVENT_TAGS = ["TRANSPORT", "LOGISTIQUE", "NATURE", "MONUMENT", "VILLE", "VILLAGE", "ACTIVITE", "RESTAURANT"] as const;

export const getEventsPhotos = async (eventId: number) => prisma.eventPhotos.findMany({
  where: {
    eventId
  }
});

export const uploadImages = async (eventId: number, formData: FormData) => {
  const formDataEntryValues = Array.from(formData.values());
  
  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const file = formDataEntryValue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(process.cwd(), 'public/uploads', file.name);
      await prisma.eventPhotos.create({
        data: {
          eventId,
          photoUrl: "uploads/" + file.name,
        },
      });
      fs.writeFileSync(filePath, buffer);
    }
  }
};

export const createEvent = async (formData: FormData) => {
  console.log(Object.fromEntries(formData.entries()));
  const eventSchema = z.object({
    vacationId: z.string().transform(Number),
    title: z.string(),
    description: z.string(),
    tag: z.enum(EVENT_TAGS),
    start: z.string().transform((value) => new Date(value).toISOString()),
    end: z.string().transform((value) => new Date(value).toISOString()),
    location: z.string(),
  });

  const event = eventSchema.parse(Object.fromEntries(formData.entries()));

  return prisma.event.create({
    data: {
      title: event.title,
      description: event.description,
      tag: event.tag,
      start: event.start,
      end: event.end,
      location: event.location,
      vacation: {
        connect: {
          id: event.vacationId,
        },
      },
    },
  });


};