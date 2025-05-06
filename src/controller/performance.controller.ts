import { FastifyReply, FastifyRequest } from "fastify";
import APIResponseDTO from "../dtos/api.dto";
import { createPerformanceSchema } from "../schemas/performance.schema";
import * as performanceDAO from "../dao/performance.dao";

export const createPerformance = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { wpm, quote_id, user_id } = createPerformanceSchema.parse(req.body);
    performanceDAO.create(wpm, quote_id, user_id);
  } catch (error) {
    return reply
      .status(500)
      .send(new APIResponseDTO({ message: "Server Error" }));
  }
};
