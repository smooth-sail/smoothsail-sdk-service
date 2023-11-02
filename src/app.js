import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRouter from "./routes/Api.routes";
import jsm from "./nats";

const app = express();

app.use(cors()); // this should be later replaced with whitelisted domains
app.use(express.json());

// initial fetch of flag data when application spun up
// const GET_ALL_FLAGS = "http://localhost:3000/api/sdk/flags";

// (async () => {
//   const { data } = await axios.get(GET_ALL_FLAGS);
//   for (let flag in data.payload) {
//     FlagCache[flag] = new Flag(data.payload[flag]);
//   }

//   console.log("flag cache: ", FlagCache);
// })();
(async () => {
  await jsm.init();
  await jsm.requestAllFlags();

  // Logs { isValid: true }
  // console.log(
  //   await jsm.validateSdkKey(<INSERT CURRENT KEY>)
  // );
})();

app.use("/api", apiRouter);

app.use("/", (req, res) => {
  res.status(404).json({ error: "no such route" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export default app;
