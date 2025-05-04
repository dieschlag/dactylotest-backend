import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function userFactory() {
  const usersToSeed = [
    {
      username: "Maxime Leboeuf",
      first_name: "Maxime",
      last_name: "Leboeuf",
      email: "maxime@bi-kay.com",
      password: "Password123",
    },
    {
      username: "Louis Vezia",
      first_name: "Louis",
      last_name: "Vezia",
      email: "louis@bi-kay.com",
      password: "Password123",
    },
    {
      username: "Mateo Dischler",
      first_name: "Mateo",
      last_name: "Dischler",
      email: "mateo@bi-kay.com",
      password: "Password123",
    },
  ];

  for (const user of usersToSeed) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`User already exists: ${user.email}, insertion ignored.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(
      user.password,
      Number(process.env.BCRYPT_ROUNDS) || 10
    );

    await prisma.user.create({
      data: {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }
}
