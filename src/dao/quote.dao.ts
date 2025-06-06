import { Quote } from "@prisma/client";
import prisma from "../utils/prisma";

export const findRandom = async (): Promise<Quote | null> => {
  const count = await prisma.quote.count();
  if (count === 0) return null;
  const randomOffset = Math.floor(Math.random() * count);

  const [quote] = await prisma.quote.findMany({
    skip: randomOffset,
    take: 1,
  });
  return quote;
};
