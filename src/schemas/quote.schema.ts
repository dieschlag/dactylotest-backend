import * as z from "zod";

export const quoteSchema = z.object({
  id: z.number().positive(),
  paragraph: z.string(),
});
