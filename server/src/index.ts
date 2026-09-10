import dotenv from "dotenv"
import connectDB from "./db/index.ts";
import app from "./app.ts";
dotenv.config()

connectDB().then(() => {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
