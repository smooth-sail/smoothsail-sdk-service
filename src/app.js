import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import apiRouter from "./routes/Api.routes";
import { Flags } from "./models/flags";

const app = express();

app.use(cors()); // this should be later replaced with whitelisted domains
app.use(express.json());

let flagData;

const GET_ALL_FLAGS = "http://localhost:3000/api/sdk/flags";

(async () => {
  const { data } = await axios.get(GET_ALL_FLAGS);
  flagData = new Flags(data.payload);
  console.log("flag data: ", flagData);

  // with test data
  // let featureFlags = TEST_FLAGS.payload;
  // for (let flag in featureFlags) {
  //   flagData[flag] = new Flag(featureFlags[flag]);
  //   console.log(flagData);
  // }
})();

// test subscriber
app.post("/flagUpdates", (req, res) => {
  flagData.updateFlagData(req.body);
  console.log("flag data: ", flagData);

  res.status(200).json({ flagData });
});

// app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.status(404).json({ error: "no such route" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export default app;
