// import EventEmitter from "events";
import FlagCache from "../cache/flagCache";
import Clients from "../models/sse-clients";
// import Flag from "../models/flags";

let clients = new Clients();

export const getAllFlags = async (req, res) => {
  try {
    res.status(200).json({ payload: FlagCache });
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred." });
  }
};

export const getFlagById = async (req, res) => {
  const flagId = req.params.id;

  let flag;
  try {
    // flag = await pg.getFlag(flagId);
  } catch (err) {
    res.status(500).json({ error: "Internal error occurred." });
  }

  if (!flag) {
    res.status(404).json({ error: `Flag with id ${flagId} does not exist` });
  }

  res.status(200).json(flag);
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
