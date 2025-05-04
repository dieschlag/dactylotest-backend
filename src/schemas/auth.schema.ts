import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8),
});

export { loginSchema, registerSchema };
