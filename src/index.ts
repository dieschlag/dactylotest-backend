import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";

dotenv.config();

export let jwtUser: { id: number; email: string } = { id: 0, email: "" };

export const fastify = Fastify({
  logger: ["production", "staging", "test"].includes(
    process.env.ENVIRONMENT || "development"
  )
    ? false
    : {
        level: "info",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss.l",
            ignore: "pid,hostname",
            singleLine: true,
          },
        },
      },
});

fastify.register(jwt, {
  secret: {
    private: readFileSync(
      path.join(__dirname, "../storage/certs/jwt-rsa-4096-private.pem"),
      "utf8"
    ),
    public: readFileSync(
      path.join(__dirname, "../storage/certs/jwt-rsa-4096-public.pem"),
      "utf8"
    ),
  },
  sign: { algorithm: "RS256" },
  cookie: { cookieName: "access_token", signed: false },
});

fastify.get("/ping", async (request, reply) => {
  return "pong\n";
});

fastify.register(cookie, {
  hook: "preHandler",
});

fastify.register(swagger, {
  openapi: {
    info: {
      title: "Placodist API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  transform: jsonSchemaTransform,
});

fastify.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    tagsSorter: "alpha",
    operationsSorter: "method",
    withCredentials: true,
  },
});
fastify.get("/", async (request, reply) => {
  reply.redirect("/docs");
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await fastify.listen({
      host: process.env.FASTIFY_ADDRESS,
      port: Number(PORT),
    });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
