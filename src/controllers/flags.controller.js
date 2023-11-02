import FlagCache from "../cache/flagCache";
import clients from "../models/sse-clients";
import jsm from "../nats";

// fetch no longer needed
// export const getAllFlags = async (req, res) => {
//   try {
//     res.status(200).json({ payload: FlagCache });
//   } catch (err) {
//     res.status(500).json({ error: "Internal error occurred." });
//   }
// };

export const sseNotifications = async (req, res) => {
  const sdkKey = req.query.key;
  // needs to be updated to check against stored key
  const allowAccess = await jsm.validateSdkKey(sdkKey);
  console.log("should this key be allowed access: ", allowAccess);

  if (allowAccess["isValid"]) {
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
    res.write(
      `data: ${JSON.stringify({ type: "flags", payload: FlagCache })}\n\n`
    );

    req.on("close", () => {
      console.log(`${clientId} Connection closed`);
      clients.closeClient(clientId);
    });
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
};
