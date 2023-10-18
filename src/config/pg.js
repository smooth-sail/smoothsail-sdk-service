import { Pool } from "pg";

const pool = new Pool();

pool.on("connect", () => {
  console.log("New connection to Postgres");
});

export const getClient = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (err) {
    console.error("Problem connecting to Postgres:", err.message);
  }
};
