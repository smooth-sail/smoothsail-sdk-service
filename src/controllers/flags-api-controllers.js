import EventEmitter from "events";
import Clients from "../models/sse-clients";
import pg from "../db/flags";

let clients = new Clients();

export const getAllFlags = async (req, res) => {
  let flags;
  try {
    flags = await pg.getAllFlags();
  } catch (err) {
    res.status(500).json({ error: "Internal error occured." });
  }

  res.status(200).json(flags);
  return clients.sendNotificationToAllClients("all flags were fetched"); // here updates msg is sent to all sse connected clients
};

export const getFlagById = async (req, res) => {
  const flagId = req.params.id;

  // check if flag id is correct

  let flag;
  try {
    flag = await pg.getFlag(flagId);
  } catch (err) {
    res.status(500).json({ error: "Internal error occured." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist` });
  }

  res.status(200).json(flag);
};

export const createFlag = async (req, res) => {
  // validate inputs

  let flag;
  try {
    flag = await pg.createFlag(req.body);
  } catch (error) {
    res.status(500).json({ error: "Internal error occured." });
  }

  res.status(200).json(flag);
};

export const deleteFlag = async (req, res) => {
  const flagId = req.params.id;

  // check flagId if valid?

  let flag;
  try {
    flag = await pg.deleteFlag(flagId);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal error occured. Could not delete flag." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist.` });
  }

  res.status(200).json({ message: "Flag successfully deleted." });
};

export const updateFlag = async (req, res) => {
  const flagId = req.params.id;

  // validate flagId
  // validate new flag info

  let flag;
  try {
    flag = await pg.getFlag(flagId);
  } catch (error) {
    res.status(500).json({ error: "Internal error occured." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist.` });
  }

  const flagUpdates = req.body;
  flagUpdates.title ||= flag.title;
  flagUpdates.description ||= flag.description;
  flagUpdates.is_active =
    flagUpdates.is_active !== undefined
      ? flagUpdates.is_active
      : flag.is_active;

  let updatedFlag;
  try {
    updatedFlag = await pg.updateFlag(flagId, flagUpdates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal error occured. Could not update flag." });
  }

  res.status(200).json({ flag: updatedFlag });
};

export const sseNotifications = (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  const clientId = clients.addNewClient(res);

  const connectMsg = `SSE connection established with client id: ${clientId}`;
  console.log(connectMsg);

  let data = `data: ${JSON.stringify({ msg: connectMsg })}\n\n`;
  res.write(data);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients.closeClient(clientId);
  });
};

// router.get('/status', (req, res) => res.json({clients: clients.length})); // tmp route
