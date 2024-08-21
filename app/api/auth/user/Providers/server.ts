'use server'
import prisma from "@/lib/utils/db";
import bcrypt from "bcryptjs";
import { NewUser, userSchema } from "../types";

export const getUser = (email: string) => {
  return prisma.user.findFirst({
    where: {
      email
    }
  });
}

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    }
  });
}

export const createUser = async (data: NewUser) => {
  const user = userSchema.parse(data);

  return prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10)
    },
  })
}