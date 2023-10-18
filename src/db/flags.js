import { getClient } from "../config/pg";

const getAllFlags = async () => {
  const client = await getClient();
  const { rows } = await client.query("SELECT * FROM flags");
  client.release();
  return rows;
};

const getFlag = async (flagId) => {
  const client = await getClient();
  const query = "SELECT * FROM flags WHERE id = $1";
  const { rows } = await client.query(query, [flagId]);
  client.release();
  return rows[0];
};

const createFlag = async (newFlag) => {
  const client = await getClient();
  const title = newFlag.title;
  const description = newFlag.description || "";
  const is_active = newFlag.is_active || false;

  const query =
    "INSERT INTO flags (title, description, is_active) VALUES ($1, $2, $3) RETURNING *";
  const values = [title, description, is_active];
  const { rows } = await client.query(query, values);
  client.release();
  return rows[0];
};

const deleteFlag = async (flagId) => {
  const client = await getClient();
  const query = "DELETE FROM flags WHERE id = $1 RETURNING *";
  const { rows } = await client.query(query, [flagId]);
  client.release();
  return rows[0];
};

const updateFlag = async (flagId, flagUpdates) => {
  const client = await getClient();
  const title = flagUpdates.title;
  const description = flagUpdates.description || "";
  const is_active = flagUpdates.is_active || false;

  const query =
    "UPDATE flags SET (title, description, is_active) = ($1, $2, $3) WHERE id = $4 RETURNING *";
  const values = [title, description, is_active, flagId];
  const { rows } = await client.query(query, values);
  client.release();
  return rows[0];
};

export default {
  getAllFlags,
  getFlag,
  createFlag,
  deleteFlag,
  updateFlag,
};
