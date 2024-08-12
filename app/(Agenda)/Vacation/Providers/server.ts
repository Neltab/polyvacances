'use server'

import prisma from "@/app/utils/db";
import moment from "moment";
import { z } from "zod";
import { NewVacation, vacationSchema } from "../types";

export const getVacations = async () => prisma.vacation.findMany({
  orderBy: {
    startDate: "asc"
  }
});

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

export const createVacation = (data: NewVacation) => {
  const vacation = vacationSchema.parse(data)

  return prisma.vacation.create({
    data: {
      ...vacation
    }
  })
}
