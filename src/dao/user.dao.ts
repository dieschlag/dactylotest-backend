import { Prisma, User } from "@prisma/client";
import prisma from "../utils/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { updateUserSchema } from "../schemas/user.schema";

export const findAll = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const findOne = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const findOneByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const create = async (data: Prisma.UserCreateInput): Promise<User> => {
  const { password } = data;
  return prisma.user.create({
    data: {
      ...data,
      password: await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS) || 10
      ),
    },
  });
};

export const update = async (
  id: number,
  data: z.infer<typeof updateUserSchema>
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { ...data, updated_at: new Date() },
  });
};

export const destroy = async (
  id: number,
  deleted_by: number
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { deleted_at: new Date(), deleted_by },
  });
};
