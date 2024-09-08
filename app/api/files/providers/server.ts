"use server";

import path from "path";
import fs from "fs";
import { FilesSchema, filesSchema } from "./validation";
import prisma from "@/lib/utils/db";
import { UPLOAD_PATH } from "@/lib/utils/constants";
import ExifReader from "exifreader";
import { parse } from "date-fns/parse";
import { format } from "date-fns/format";
import { Event } from "../../events/types";
import { isWithinInterval } from "date-fns";
import { revalidatePath } from "next/cache";
import { type } from "@prisma/client";


export const uploadFiles = async (eventId: number, data: FilesSchema) => {
  const {files} = filesSchema.parse(data);

  const fileArray = Array.from(files);
  
  const uploadFolderPath = path.join(process.cwd(), UPLOAD_PATH, eventId.toString());

  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, { recursive: true });
  }

  fileArray.forEach(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadFolderPath, file.name);
    await prisma.eventPhotos.create({
      data: {
        eventId,
        photoUrl: `/api/${UPLOAD_PATH}/${eventId}/${file.name}`,
      },
    });
    fs.writeFileSync(filePath, buffer);
  });
};

const getEventAndVacationPhotos = async (filesCreationDates: string[], files: File[], events: Event[], vacationUUID: string) => {

  const eventPhotos: {eventId: number, photoUrl: string, fileIndex: number}[] = [];
  const vacationPhotos: {vacationUUID: string, photoUrl: string, fileIndex: number}[] = [];

  filesCreationDates.forEach((creationDate, index) => {
    const event = events.find(({start, end}) => isWithinInterval(new Date(creationDate), {start, end}));
    
    if (!event) {
      vacationPhotos.push({vacationUUID, photoUrl: path.join(UPLOAD_PATH, vacationUUID, files[index].name), fileIndex: index});
      return;
    }

    eventPhotos.push({eventId: event.id, photoUrl: path.join(UPLOAD_PATH, event.id.toString(), files[index].name), fileIndex: index});
  });

  return {eventPhotos, vacationPhotos};
}

type Type = type;

export const uploadFilesBulk = async (vacationUUID: string, data: FormData) => {
  const creationDatesAndFiles = Object.fromEntries(data.entries());

  const creationDates: string[] = [];
  const files: File[] = [];
  let i = 0;

  while (`date-${i}` in creationDatesAndFiles && `file-${i}` in creationDatesAndFiles && i < 1000) {
    creationDates.push(creationDatesAndFiles[`date-${i}`] as string);
    files.push(creationDatesAndFiles[`file-${i}`] as File);
    i++;
  }
  
  const vacation = await prisma.vacation.findUnique({
    where: {
      uuid: vacationUUID,
    },
    include: {
      events: true,
    },
  });

  if (!vacation) {
    throw new Error("Vacation not found");
  }

  const {eventPhotos, vacationPhotos} = await getEventAndVacationPhotos(creationDates, files, vacation.events, vacationUUID);

  await prisma.eventPhotos.createMany({
    data: eventPhotos.map(({eventId, photoUrl}) => ({ eventId, photoUrl: `/api/${photoUrl}`, type: photoUrl.endsWith(".mp4") ? "video" : "photo" })),
  });

  await prisma.vacationPhotos.createMany({
    data: vacationPhotos.map(({vacationUUID, photoUrl}) => ({ vacationUUID, photoUrl: `/api/${photoUrl}`, type: photoUrl.endsWith(".mp4") ? "video" : "photo" })),
  });
  
  eventPhotos.forEach(async ({photoUrl, fileIndex}) => {
    const buffer = Buffer.from(await files[fileIndex].arrayBuffer());
    const filePath = path.join(process.cwd(), photoUrl);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);
  });

  vacationPhotos.forEach(async ({photoUrl, fileIndex}) => {
    const buffer = Buffer.from(await files[fileIndex].arrayBuffer());
    const filePath = path.join(process.cwd(), photoUrl);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    
    fs.writeFileSync(filePath, buffer);
  });

  revalidatePath(`/planner/vacation/${vacationUUID}/photos`);
};