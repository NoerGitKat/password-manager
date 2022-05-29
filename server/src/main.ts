import { PORT } from "./constants";
import { connectDB, createServer } from "./utils";

const main = async () => {
  const app = createServer();

  try {
    await app.listen(PORT, "0.0.0.0");
    await connectDB(app);
  } catch (error) {
    process.exit(1);
  }
};

main();
