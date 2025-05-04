import { z } from "zod";

const userSchema = z.object({
  id: z.coerce.number().positive(),
  username: z
    .string()
    .nonempty()
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-ZÀ-ÿ]+(?:[-\s][a-zA-ZÀ-ÿ]+)*$/, "Invalid characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    )
    .regex(
      /^[a-zA-Z0-9!@$%^&*+#]+$/,
      "Password contains invalid special characters (allowed: !, @, $, %, ^, &, *, +, #)"
    ),
  created_at: z.date().default(() => new Date()),
  created_by: z.number().int().nullable(),
  updated_at: z.date().default(() => new Date()),
  updated_by: z.number().int().nullable(),
  deleted_at: z.date().nullable(),
  deleted_by: z.coerce.number().positive(),
});

const userParamSchema = z.object({ userId: z.coerce.number().positive() });
const createUserSchema = userSchema.pick({
  username: true,
  email: true,
  password: true,
});
const updateUserSchema = userSchema.partial().omit({ id: true });

export { userSchema, userParamSchema, createUserSchema, updateUserSchema };
