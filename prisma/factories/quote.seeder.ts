import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function quoteFactory() {
  const quotesToSeed = [
    {
      paragraph: "Ceci est un premier paragraphe",
    },
    {
      paragraph: "Ceci est un deuxième paragraphe",
    },
    {
      paragraph: "Ceci est un troisième paragraphe",
    },
    {
      paragraph: "Ceci est un quatrième paragraphe",
    },
    {
      paragraph: "Ceci est un cinquième paragraphe",
    },
    {
      paragraph: "Ceci est un sixième paragraphe",
    },
    {
      paragraph: "Ceci est un septième paragraphe",
    },
    {
      paragraph: "Ceci est un huitième paragraphe",
    },
    {
      paragraph: "Ceci est un neuvième paragraphe",
    },
    {
      paragraph: "Ceci est un dixième paragraphe",
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
