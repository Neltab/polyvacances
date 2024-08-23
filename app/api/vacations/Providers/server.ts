'use server'

import prisma from "@/lib/utils/db";
import { getServerSession } from "next-auth";
import { participantsSchema, ParticipantsSchema, updateVacationSchema, UpdateVacationSchema, VacationSchema, vacationSchema } from "./validation";
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

const defaultInclude = {
  events: false,
  participants: false,
};
type VacationInclude = Partial<typeof defaultInclude>;
export const getVacationByUUID = async (uuid: string, include: VacationInclude = defaultInclude) => prisma.vacation.findUnique({
  where: { uuid },
  include,
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

export const updateVacation = async (data: UpdateVacationSchema) => {
  const vacation = updateVacationSchema.parse(data);

  const updatedVacation = await prisma.vacation.update({
    where: {
      id: vacation.id,
    },
    data: {
      startDate: vacation.date.from,
      endDate: vacation.date.to,
      location: vacation.location,
      participants: vacation.participants && {
        set: vacation.participants.map(({value: id, }) =>
          ({ id })
        )
      },
    }
  });

  revalidatePath(`/planner`);

  return updatedVacation;
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
      participants: {
        select: {
          email: true,
          id: true,
          name: true,
        }
      }
    }
  });

  if (!vacation) {
    throw new Error("Vacation not found");
  }

  return vacation.participants;
}

export const updateParticipants = async (vacationUUID: string, data: ParticipantsSchema) => {
  const {participants} = participantsSchema.parse(data);

  const vacation = await prisma.vacation.update({
    where: {
      uuid: vacationUUID
    },
    data: {
      participants: {
        set: participants.map(({ value: id }) => ({ id }))
      }
    }
  });

  revalidatePath(`/planner/vacation/${vacationUUID}/layout`);

  return vacation;
}

export const getVacationPhotos = async (uuid: string) => {
  const photos = await prisma.eventPhotos.findMany({
    where: {
      event: {
        vacation: {
          uuid
        }
      }
    },
    include: {
      event: true
    }
  });

  return photos;
}