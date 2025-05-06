import { FastifyReply, FastifyRequest } from "fastify";
import APIResponseDTO from "../dtos/api.dto";
import * as textDAO from "../dao/quote.dao";

export const getRandomText = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const text = await textDAO.findRandom();
    return reply.status(200).send(text);
  } catch (error) {
    return reply
      .status(500)
      .send(new APIResponseDTO({ message: "Server Error" }));
  }
};
