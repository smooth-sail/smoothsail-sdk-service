import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import { Flag } from "./models/Flag";
import apiRouter from "./routes/Api.routes";

const app = express();
let flagData = {};

const GET_ALL_FLAGS = "http://localhost:3000/api/sdk/flags";

(async () => {
  const { data } = await axios.get(GET_ALL_FLAGS);
  for (let flag in data.payload) {
    flagData[flag] = new Flag(data.payload[flag]);
  }
  console.log("flag data", flagData);

  // with test data
  // let featureFlags = TEST_FLAGS.payload;
  // for (let flag in featureFlags) {
  //   this.flagData[flag] = new Flag(featureFlags[flag]);
  //   console.log(this.flagData);
  // }
})();

app.use(cors()); // this should be later replaced with whitelisted domains
app.use(express.json());

app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.status(404).json({ error: "no such route" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export default app;
