import { PORT } from "./constants";
import { createServer } from "./utils";

const main = async () => {
  const app = createServer();

  try {
    const url = await app.listen(PORT, "0.0.0.0");

    console.log(`Server is running on port ${url}!`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
