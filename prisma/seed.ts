import { PrismaClient, type User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function seed() {
  const users = [
    {
      username: "admin",
      email: "mradbib@gmail.com",
      password: await bcrypt.hash("dev", 10),
      permissions: ["READ", "WRITE", "DELETE", "UPDATE"],
      roles: ["ADMIN"],
    },
  ];
  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      console.log(`User ${user.email} already exists.`);
      continue;
    }
    await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        permissions: user.permissions,
        roles: user.roles,
      },
    });
    console.log(`User ${user.email} has been created.`);
  }
  //eslint-disable-next-line no-console
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
