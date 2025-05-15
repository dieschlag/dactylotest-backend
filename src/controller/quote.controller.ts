import { FastifyReply, FastifyRequest } from "fastify";
import APIResponseDTO from "../dtos/api.dto";
import * as quoteDAO from "../dao/quote.dao";
import QuoteDTO from "../dtos/quote.dto";

export const getRandomText = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await quoteDAO.findRandom();
    if (data) {
      const response = new APIResponseDTO({ data: QuoteDTO.objectToDTO(data) });
      return reply.status(200).send(response);
    }
    return reply
      .status(503)
      .send(new APIResponseDTO({ message: "No text available" }));
  } catch (error) {
    return reply
      .status(500)
      .send(new APIResponseDTO({ message: "Server Error" }));
  }
};
