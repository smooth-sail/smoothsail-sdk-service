import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRouter from "./routes/Api.routes";
import { morganMiddleware, logger } from "./utils/logger";
import jsm from "./nats";
import { authenticateSDK } from "./utils/middleware";

const app = express();

app.use(morganMiddleware);

app.use(cors());
app.use(express.json());

app.use(authenticateSDK);

(async () => {
  await jsm.init();
  await jsm.requestAllFlags();
})();

app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.status(404).json({ error: "No such route" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => logger.info(`SDK Service listening on port ${PORT}!`));

export default app;
