import FlagCache from "../cache/flagCache";
import clients from "../models/sse-clients";
import { logger } from "../utils/logger";

const sseHeartbeat = (res, interval) => {
  setInterval(() => {
    res.write(`data: ${JSON.stringify({ type: "heartbeat" })}\n\n`);
  }, interval);
};

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

  res.write(
    `data: ${JSON.stringify({ type: "flags", payload: FlagCache })}\n\n`
  );

  sseHeartbeat(res, 10000);

  req.on("close", () => {
    logger.info(`Client id ${clientId}: Connection closed`);
    clients.closeClient(clientId);
  });
};
