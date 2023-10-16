import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ffCRUDRoutes from './routes/crud-ff-routes';

const app = express();
app.use(cors());
app.use(express.json());


app.use("/", ffCRUDRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);

export default app;