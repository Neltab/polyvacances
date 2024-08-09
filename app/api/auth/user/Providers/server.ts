'use server'
import prisma from "@/app/utils/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const getUser = (email: string) => {
  return prisma.user.findFirst({
    where: {
      email
    }
  });
}

export const createUser = async (formData: FormData) => {

  const userSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
  });

  const user = userSchema.parse(Object.fromEntries(formData.entries()));

  return prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10)
    },
  })
}