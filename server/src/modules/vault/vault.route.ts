import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { updateVault } from "./vault.controller";

const getVaultRoutes = (
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  app.put(
    "/",
    {
      onRequest: [app.authenticate],
    },
    updateVault,
  );

  done();
};

export default getVaultRoutes;
