import prisma from "../utils/prisma";
import { Performance } from "@prisma/client";

export const create = async (
  wpm: number,
  user_id: number,
  quote_id: number
): Promise<Performance> => {
  return prisma.performance.create({
    data: {
      wpm,
      user_id,
      quote_id,
    },
  });
};
