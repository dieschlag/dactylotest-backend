import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as PerformanceController from "../../../src/controller/performance.controller";

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
}
