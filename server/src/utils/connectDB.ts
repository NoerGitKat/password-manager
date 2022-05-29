import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import { MONGO_URI } from "../constants";

const connectDB = async (app: FastifyInstance) => {
  try {
    await mongoose.connect(MONGO_URI);
    app.log.info("Database is connected!");
  } catch (error: any) {
    app.log.error("Error!", error);
  }
};

export default connectDB;
