import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
// import apiRouter from "./routes/Api.routes";
import { Flags } from "./models/flags";

const app = express();

app.use(cors()); // this should be later replaced with whitelisted domains
app.use(express.json());

// initial fetch of flag data when application spun up
const GET_ALL_FLAGS = "http://localhost:3000/api/sdk/flags";
let flagData;
(async () => {
  const { data } = await axios.get(GET_ALL_FLAGS);
  flagData = new Flags(data.payload);
  console.log("flag data: ", flagData.formattedForSDK());
})();

// test subscriber
app.post("/flagUpdates", (req, res) => {
  flagData.updateFlagData(req.body);

  // write to SSE stream

  // flags logged & sent back for POSTman tests
  console.log("flag data: ", flagData.formattedForSDK());
  res.status(200).json({ flags: flagData.formattedForSDK() });
});

// route for SDK to fetch routes
app.get("/sdk/flags", (req, res) => {
  res.status(200).json({ flags: flagData.formattedForSDK() });
});

// not used on first iteration
// app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.status(404).json({ error: "no such route" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export default app;
