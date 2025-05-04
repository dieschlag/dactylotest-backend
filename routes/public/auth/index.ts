import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as AuthController from "../../../src/controller/auth.controller";

import { z } from "zod";
import { loginSchema, registerSchema } from "../../../src/schemas/auth.schema";

export default async function (fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        description: "Login to Dashboard",
        summary: "Login to Dashboard",
        body: loginSchema,
      },
    },
    AuthController.authLogin
  );
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/register",
    {
      schema: {
        tags: ["Auth"],
        description: "Register to Dashboard",
        summary: "Register to Dashboard",
        body: registerSchema,
      },
    },
    AuthController.authRegister
  );
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/verify-token",
    {
      schema: {
        tags: ["Auth"],
        description: "Verify Token from Mobile",
        summary: "Verify Token from Mobile",
        querystring: z.object({
          access_token: z.coerce.string().nonempty(),
        }),
      },
    },
    AuthController.verifyToken
  );
}
