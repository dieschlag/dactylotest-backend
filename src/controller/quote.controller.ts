import { FastifyReply, FastifyRequest } from "fastify";
import APIResponseDTO from "../dtos/api.dto";
import * as quoteDAO from "../dao/quote.dao";

export const getRandomText = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const text = await quoteDAO.findRandom();
    const response = new APIResponseDTO({ data: text });
    return reply.status(200).send(response);
  } catch (error) {
    return reply
      .status(500)
      .send(new APIResponseDTO({ message: "Server Error" }));
  }
};
