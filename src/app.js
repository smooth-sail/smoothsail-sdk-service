import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRouter from "./routes/Api.routes";
import jsm from "./nats";
import { authenticateSDK } from "./utils/middleware";

const app = express();

app.use(cors()); // this should be later replaced with whitelisted domains
app.use(express.json());
app.use(authenticateSDK);

(async () => {
  await jsm.init();
  await jsm.requestAllFlags();
})();

app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.status(404).json({ error: "no such route" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export default app;
