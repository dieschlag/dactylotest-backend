import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function quoteFactory() {
  const quotesToSeed = [
    {
      paragraph: "Ceci est un premier pragraphe",
    },
    {
      paragraph: "Ceci est un deuxième pragraphe",
    },
    {
      paragraph: "Ceci est un troisième pragraphe",
    },
    {
      paragraph: "Ceci est un quatrième pragraphe",
    },
    {
      paragraph: "Ceci est un cinquième pragraphe",
    },
    {
      paragraph: "Ceci est un sixième pragraphe",
    },
    {
      paragraph: "Ceci est un septième pragraphe",
    },
    {
      paragraph: "Ceci est un huitième pragraphe",
    },
    {
      paragraph: "Ceci est un neuvième pragraphe",
    },
    {
      paragraph: "Ceci est un dixième pragraphe",
    },
  ];

  for (const quote of quotesToSeed) {
    const existingQuote = await prisma.quote.findFirst({
      where: { paragraph: quote.paragraph },
    });

    if (existingQuote) {
      console.log(
        `Quote already exists, id: ${existingQuote.id}, insertion ignored.`
      );
      continue;
    }

    await prisma.quote.create({
      data: {
        paragraph: quote.paragraph,
      },
    });
  }
}
