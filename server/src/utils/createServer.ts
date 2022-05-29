import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { CORS_ORIGIN } from "../constants";

const createServer = () => {
  const app = fastify({
    logger: {
      prettyPrint: true,
      level: "info",
      serializers: {
        res(reply) {
          return {
            statusCode: reply.statusCode,
          };
        },
        req(request) {
          return {
            method: request.method,
            url: request.url,
            path: request.routerPath,
            parameters: request.params,
            headers: request.headers,
          };
        },
      },
    },
  });

  app.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  });

  app.register(jwt, {
    secret: {
      private: readFileSync(`${(join(cwd()), "certs")}/private.key`),
      public: readFileSync(`${(join(cwd()), "certs")}/public.key`),
    },
    sign: { algorithm: "RS256" },
    cookie: {
      cookieName: "jwt_token",
      signed: false,
    },
  });

  app.register(cookie, {
    parseOptions: {},
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await request.jwtVerify<{ _id: string }>();
        request.user = user;
      } catch (error: any) {
        return reply.send(error);
      }
    },
  );

  return app;
};

export default createServer;
