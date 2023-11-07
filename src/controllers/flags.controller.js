import FlagCache from "../cache/flagCache";
import clients from "../models/sse-clients";
import logger from "../utils/logger";

export const sseNotifications = async (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  const clientId = clients.addNewClient(res);

  const connectMsg = `SSE connection established with client id: ${clientId}`;
  logger.info(connectMsg);

  let data = `data: ${JSON.stringify({ msg: connectMsg })}\n\n`;
  res.write(data);
  res.write(
    `data: ${JSON.stringify({ type: "flags", payload: FlagCache })}\n\n`
  );

  setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: "heartbeat" })}\n\n`);
  }, 10000);

  req.on("close", () => {
    logger.info(`${clientId} Connection closed`);
    clients.closeClient(clientId);
  });
};
