'use server'
import prisma from "@/lib/utils/db";
import path from "path";
import fs from "fs";
import { EventSchema, getEventSchemaForVacation } from "./validation";
import { revalidatePath } from "next/cache";

export const getEventsFromVacation = async (vacationId: number) => prisma.event.findMany({
  where: {
    vacationId
  }
});

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

export const createEvent = async (data: EventSchema) => {
  const vacation = await prisma.vacation.findUnique({
    where: {
      id: data.vacationId,
    },
  });

  if (!vacation) {
    throw new Error("Vacation not found");
  }

  const eventSchema = getEventSchemaForVacation(vacation);
  const event = eventSchema.parse(data);

  const newEvent = await prisma.event.create({
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
  
  revalidatePath(`/planner/${vacation.id}/overview/@planning`);

  return newEvent;

};