import prisma from "@/lib/utils/db";
import { getServerSession } from "next-auth";

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