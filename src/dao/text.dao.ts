import prisma from "../utils/prisma";

export const findRandom = async (): Promise<Quote[]> => {
  return prisma.user.findMany();
};
