import { FastifyError, FastifyInstance, FastifyPluginOptions } from "fastify";
import { loginUser, registerUser } from "./user.controller";

const getUserRoutes = (
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: FastifyError) => void,
) => {
  app.post("/register", registerUser);
  app.post("/login", loginUser);
  done();
};

export default getUserRoutes;
