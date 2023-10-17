import EventEmitter from "events";

const eventEmitter = new EventEmitter();

export const getAllFlags = (req, res) => {
  let flags;
  try {
    // fetch all flags data
  } catch (err) {
    res.status(500).json({ error: "Internal error occured." });
  }

  eventEmitter.emit("change", "all flags were fetched"); // tmp, prototyping line

  res.status(200).json([{ flag: "I am a flag" }]);
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

let clients = []; // where is best way to keep clients?

export const sseNotifications = (req, res) => {
  console.log("Establishing new sse connection.");

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  // write now it sends full log, but if time allows this can be only the updated log record only
  let data = `data: ${JSON.stringify({ msg: "sse established." })}\n\n`;

  // trying to catch event
  eventEmitter.on("change", (msg) => {
    // console.log(msg);
    data = `data: ${JSON.stringify({ msg })}\n\n`;
    res.write(data);
  });

  res.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    res,
  };

  clients.push(newClient);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
};

// router.get('/status', (req, res) => res.json({clients: clients.length})); // tmp route
