import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function userFactory() {
  const usersToSeed = [
    {
      username: "User1",
      first_name: "Test",
      last_name: "TestLastName",
      email: "test@test.com",
      password: "Test123456",
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
        email: user.email,
        password: hashedPassword,
      },
    });
  }
}
