'use server'

import prisma from "@/app/(components)/utils/db";

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
