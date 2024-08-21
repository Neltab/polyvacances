import { WithoutDBMetadata } from "@/lib/utils/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type User = Omit<WithoutDBMetadata<Prisma.UserGetPayload<{}>>, "password">;

export type NewUser = Partial<User> & {
  password: string;
}

export type Credentials = {
  email: string;
  password: string;
}

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});