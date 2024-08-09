'use server'

import prisma from "@/app/utils/db";
import { z } from "zod";

export const getVacations = async () => prisma.vacation.findMany({});

export const getVacationById = async (id: number) => prisma.vacation.findUnique({
  where: { id }
});

export const getVacationsWithEvents = async () => prisma.vacation.findMany({
  include: {
    events: true
  }
});

export const getVacationWithEventsById = async (id: number) => prisma.vacation.findUnique({
  where: { id },
  include: {
    events: true
  }
});

export const createVacation = (formData: FormData) => {
  const vacationSchema = z.object({
    startDate: z.string().transform(startDate => new Date(startDate)),
    endDate: z.string().transform(startDate => new Date(startDate)),
    location: z.string(),
  })

  const vacation = vacationSchema.parse(Object.fromEntries(formData.entries()))

  return prisma.vacation.create({
    data: {
      ...vacation
    }
  })
}
