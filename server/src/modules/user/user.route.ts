import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { registerUser } from "./user.controller";

const getUserRoutes = (
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  app.post("/", registerUser);
  done();
};

export default getUserRoutes;
