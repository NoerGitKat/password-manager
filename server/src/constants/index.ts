export const PORT = process.env.PORT || 4000;
export const MONGO_URI =
  process.env.MONGO_URI ||
  "";
export const SIGNALS = ["SIGTERM", "SIGINT"];
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
