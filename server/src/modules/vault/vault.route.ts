import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";

const getVaultRoutes = (
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  done();
};

export default getVaultRoutes;
