import { FastifyInstance } from "fastify";
import * as TextController from "../../../src/controller/quote.controller";
import * as z from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function projectRoutes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get("/", TextController.getRandomText);
}
