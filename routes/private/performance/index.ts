import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as PerformanceController from "../../../src/controller/performance.controller";

import { z } from "zod";
import { createPerformanceSchema } from "../../../src/schemas/performance.schema";
export default async function (fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        tags: ["Performance"],
        description: "Add a performance",
        summary: "Create a performance",
        body: createPerformanceSchema,
      },
    },
    PerformanceController.createPerformance
  );
  //   fastify.withTypeProvider<ZodTypeProvider>().post(
  //     "/register",
  //     {
  //       schema: {
  //         tags: ["Auth"],
  //         description: "Register to Dashboard",
  //         summary: "Register to Dashboard",
  //         body: registerSchema,
  //       },
  //     },
  //     AuthController.authRegister
  //   );
  //   fastify.withTypeProvider<ZodTypeProvider>().post(
  //     "/verify-token",
  //     {
  //       schema: {
  //         tags: ["Auth"],
  //         description: "Verify Token from Mobile",
  //         summary: "Verify Token from Mobile",
  //         querystring: z.object({
  //           access_token: z.coerce.string().nonempty(),
  //         }),
  //       },
  //     },
  //     AuthController.verifyToken
  //   );
}
