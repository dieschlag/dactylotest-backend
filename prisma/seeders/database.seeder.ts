import { PrismaClient } from "@prisma/client";
import { userFactory } from "../factories/user.factory";
import { quoteFactory } from "../factories/quote.seeder";

const prisma = new PrismaClient();

export async function seed() {
  try {
    await userFactory();
    await quoteFactory();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
