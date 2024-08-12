import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default prisma;

export type WithoutDBMetadata<T> = Omit<T, "createdAt" | "updatedAt">