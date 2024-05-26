import { PrismaClient } from "@prisma/client";
// import { singleton } from "#app/utils/misc.server";

const prisma = new PrismaClient();
prisma.$connect();

export { prisma };
