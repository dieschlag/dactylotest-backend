import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import AutoLoad from "@fastify/autoload";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
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

// Add schema validator and serializer
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

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

fastify.register(cookie, {
  hook: "preHandler",
});

// AutoLoad public routes dynamically
fastify.register(AutoLoad, {
  dir: path.join(__dirname, "../routes/public"),
  routeParams: true,
  options: { prefix: "/api" },
});

fastify.register(async function privateRoutes(plugin, opts) {
  plugin.addHook(
    "preHandler",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const decoded = await request.jwtVerify<{
          id: number;
          email: string;
        }>();
        jwtUser = decoded; // user from JWT token
        request.user = decoded; // for subsequent request, user id and email will be available
      } catch (err) {
        return reply.status(401).send({
          message: "Invalid credentials",
        });
      }
    }
  );
  plugin.register(AutoLoad, {
    dir: path.join(__dirname, "../routes/private"),
    routeParams: true,
    options: { prefix: "/api" },
  });
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
