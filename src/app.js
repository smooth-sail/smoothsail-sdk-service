import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/crud-ff-routes";
import { createFlag } from "./controllers/flags-api-controllers";

const app = express();
app.use(cors()); // this should be later replaced with whitelisted domains
app.use(express.json());

app.use("/api", apiRoutes);

app.use("/", (req, res) => {
  res.status(404).json({ error: "no such route" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export default app;
