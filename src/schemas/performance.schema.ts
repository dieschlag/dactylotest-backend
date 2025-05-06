import * as z from "zod";

export const createPerformanceSchema = z.object({
  user_id: z.number(),
  quote_id: z.number(),
  wpm: z.number(),
});
