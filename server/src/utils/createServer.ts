import fastify from "fastify";

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

  return app;
};

export default createServer;
