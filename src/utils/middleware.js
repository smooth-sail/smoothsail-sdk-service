import jsm from "../nats";
import { rateLimit } from "express-rate-limit";

export const authenticateSDK = async (req, res, next) => {
  const sdkKey = req.headers.authorization;

  console.log(req.body);

  const allowAccess = await jsm.validateSdkKey(sdkKey);
  const keyValid = allowAccess["isValid"];

  if (keyValid) {
    next();
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
};

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false,
});
