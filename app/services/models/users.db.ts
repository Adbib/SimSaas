import type { Prisma } from "@prisma/client";
import { hash } from "~/utils/hash";
import { prisma } from "~/utils/prisma.server";

type CreateUser = Prisma.UserCreateInput;

export async function createUser(user_data: CreateUser) {
  try {
    user_data.password = await hash(user_data.password);
    const user = await prisma.user.create({ data: user_data });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
