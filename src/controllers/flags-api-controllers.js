import EventEmitter from "events";
import Clients from "../models/sse-clients";

let clients = new Clients();

export const getAllFlags = (req, res) => {
  let flags;
  try {
    // fetch all flags data
  } catch (err) {
    res.status(500).json({ error: "Internal error occured." });
  }

  res.status(200).json([{ flag: "I am a flag" }]);
  return clients.sendNotificationToAllClients("all flags were fetched"); // here updates msg is sent to all sse connected clients
};

export const getFlagById = (req, res) => {
  const flagId = req.params.flagId;

  // check if flag id is correct

  let flag;
  try {
    // get flag by flag id
  } catch (err) {
    res.status(500).json({ error: "Internal error occured." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist` });
  }

  res.status(200).json({ flag });
};

export const createFlag = (req, res) => {
  // validate inputs

  let flag;
  try {
    // attempt to creat new flag
  } catch (error) {
    res.status(500).json({ error: "Internal error occured." });
  }

  res.status(200).json({ flag });
};

export const deleteFlag = (req, res) => {
  const flagId = req.params.flagId;

  // check flagId if valid?

  let flag;
  try {
    // find flag by id
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

export const updateFlag = (req, res) => {
  const flagId = req.params.flagId;

  // validate flagId
  // validate new flag info

  let flag;
  try {
    // find flag by id
  } catch (error) {
    res.status(500).json({ error: "Internal error occured." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist.` });
  }

  let updatedFlag;
  try {
    // update flag
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
