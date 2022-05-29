import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";

const getUserRoutes = (
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  done();
};

export default getUserRoutes;
