import { FastifyInstance } from "fastify";
import disconnectDB from "./disconnectDB";

const closeServer = async (signal: string, app: FastifyInstance) => {
  process.on(signal, async () => {
    app.log.info(`Signal ${signal} received. Goodbye!`);
    app.close();
  });
  await disconnectDB(app);
  process.exit(0);
};

export default closeServer;
