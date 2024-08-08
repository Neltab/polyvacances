import prisma from "@/app/(components)/utils/db";

export const getUser = (email: string, password: string) => {
  return prisma.user.findFirst({
    where: {
      email,
      password
    }
  });
}