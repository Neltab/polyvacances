'use server'

import prisma from "@/lib/utils/db";
import { getServerSession } from "next-auth";
import { VacationSchema, vacationSchema } from "./validation";
import { revalidatePath } from "next/cache";

export const getVacations = async () => prisma.vacation.findMany({
  orderBy: {
    startDate: "asc"
  }
});

export const getMyVacations = async () => {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return [];
  }

  return prisma.vacation.findMany({
    where: {
      participants: {
        some: {
          email: session.user.email
        }
      }
    },
    orderBy: {
      startDate: "asc"
    },
    include: {
      events: true,
      participants: true
    }
  });
}

export const getVacationByUUID = async (uuid: string) => prisma.vacation.findUnique({
  where: { uuid }
});

export const getVacationsWithEvents = async () => prisma.vacation.findMany({
  include: {
    events: true
  }
});

export const getVacationWithEventsByUUID = async (uuid: string) => prisma.vacation.findUnique({
  where: { uuid },
  include: {
    events: true,
    participants: true,
  }
});

export const createVacation = async (data: VacationSchema) => {
  const vacation = vacationSchema.parse(data)

  const newVacation = await prisma.vacation.create({
    data: {
      startDate: vacation.date.from,
      endDate: vacation.date.to,
      location: vacation.location,
      participants: vacation.participants && {
        connect: vacation.participants.map(({value: id, }) =>
          ({ id })
        )
      },
    }
  })

  revalidatePath(`/planner`);

  return newVacation;
}


export const getVacationNavigation = async (uuid: string) => {
  const vacation = await prisma.vacation.findUnique({
    where: { uuid: uuid },
  });

  if (!vacation) {
    throw new Error("Vacation not found");
  }

  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return {
      previous: null,
      current: vacation,
      next: null,
    }
  }

  const previousVacation = await prisma.vacation.findFirst({
    where: {
      participants: {
        some: {
          email: session.user.email
        }
      },
      startDate: {
        lt: vacation.startDate
      }
    },
    orderBy: {
      startDate: "desc"
    }
  });

  const nextVacation = await prisma.vacation.findFirst({
    where: {
      participants: {
        some: {
          email: session.user.email
        }
      },
      startDate: {
        gt: vacation.startDate
      }
    },
    orderBy: {
      startDate: "asc"
    }
  });

  return {
    previous: previousVacation,
    current: vacation,
    next: nextVacation,
  }
}

export const getVacationParticipants = async (uuid: string) => {
  const vacation = await prisma.vacation.findUnique({
    where: { uuid },
    include: {
      participants: true
    }
  });

  if (!vacation) {
    throw new Error("Vacation not found");
  }

  return vacation.participants;
}

export const canEditVacation = async (vacationUUID: string) => {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return false;
  }

  const vacation = await prisma.vacation.findUnique({
    where: { uuid: vacationUUID },
    include: {
      participants: true
    }
  });

  if (!vacation) {
    return false;
  }

  return vacation.participants.some(participant => participant.email === session.user?.email);
}
