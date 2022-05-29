export const PORT = process.env.PORT || 4000;
export const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://root:root@cluster0.3nhc5.mongodb.net/?retryWrites=true&w=majority";
export const SIGNALS = ["SIGTERM", "SIGINT"];
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
