import { PrismaClient } from "@prisma/client";
import { userFactory } from "../factories/user.factory";

const prisma = new PrismaClient();

export async function seed() {
  try {
    await userFactory();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
