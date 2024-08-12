'use server'
import prisma from "@/app/utils/db";
import path from "path";
import fs from "fs";
import { eventSchema, NewEvent } from "../types";

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

export const createEvent = async (data: NewEvent) => {
  console.log(data)

  const event = eventSchema.parse(data);

  console.log(event);

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