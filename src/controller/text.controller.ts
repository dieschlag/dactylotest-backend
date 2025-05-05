import { FastifyReply, FastifyRequest } from "fastify";
import APIResponseDTO from "../dtos/api.dto";

export const getProjectById = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const text = textDAO.findRandom();
    return reply.status(200).send(text);
  } catch (error) {
    return reply
      .status(500)
      .send(new APIResponseDTO({ message: "Server Error" }));
  }
};
