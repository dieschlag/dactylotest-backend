import { FastifyInstance } from "fastify";

export default async function projectRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["Projects"],
        description: "Get all Projects",
        summary: "Get all Projects",
      },
    },
    TextController.getRandomText
  );
}
