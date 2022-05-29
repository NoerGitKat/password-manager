import { FastifyInstance } from "fastify";
import mongoose from "mongoose";

const disconnectDB = async (app: FastifyInstance) => {
  try {
    await mongoose.connection.close();
    app.log.info("Successfully disconnected DB.");
  } catch (error: any) {
    app.log.error("DB error!", error);
  }
};

export default disconnectDB;
