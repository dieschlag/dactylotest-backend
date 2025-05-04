import { FastifyRequest, FastifyReply } from "fastify";
import * as userDAO from "../dao/user.dao";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import APIResponseDTO from "../dtos/api.dto";
import UserDTO from "../dtos/user.dto";

export const authLogin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password } = loginSchema.parse(request.body);
    const user = await userDAO.findOneByEmail(email);
    if (!user)
      return reply
        .status(401)
        .send(new APIResponseDTO({ message: "User not found" }));

    const authenticated =
      user && (await bcrypt.compare(password, user.password));
    if (!authenticated)
      return reply
        .status(401)
        .send(new APIResponseDTO({ message: "Email or password invalid" }));

    const accessToken = await reply.jwtSign({
      id: user.id,
      email: user.email,
    });
    reply.setCookie("access_token", accessToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 86400,
    });
    return reply.status(200).send({
      access_token: accessToken,
      token_type: "Bearer",
    });
  } catch (error) {
    return reply
      .status(500)
      .send(new APIResponseDTO({ message: "Server Error" }));
  }
};

export const authRegister = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const body = registerSchema.parse(request.body);
    if (await userDAO.findOneByEmail(body.email))
      return reply
        .status(400)
        .send(new APIResponseDTO({ message: "Email already in use" }));

    const user = await userDAO.create(body);
    const accessToken = await reply.jwtSign({
      id: user.id,
      email: user.email,
    });
    reply.setCookie("access_token", accessToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 86400,
    });
    return reply.status(200).send({
      data: UserDTO.objectToDTO(user),
      access_token: accessToken,
    });
  } catch (error) {
    return reply.send(new APIResponseDTO({ message: "ServerError" }));
  }
};

export const authLogout = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    reply.clearCookie("access_token");
    return reply.status(200).send(
      new APIResponseDTO({
        message: "User logged out",
      })
    );
  } catch (error) {
    return reply
      .status(500)
      .send(new APIResponseDTO({ message: "Server Error" }));
  }
};

export const verifyToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { access_token } = request.query as { access_token: string };
    if (!access_token)
      return reply.status(400).send({ message: "Invalid token" });

    const decoded = await request.jwtVerify();
    return reply.status(200).send({ data: decoded, access_token });
  } catch (error) {
    return reply.status(401).send({ message: "Invalid or expired token" });
  }
};
