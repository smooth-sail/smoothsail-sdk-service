import "dotenv/config";
import jsm from "../nats";
import { rateLimit } from "express-rate-limit";

export const authenticateSDK = async (req, res, next) => {
  const sdkKey = req.headers.authorization;

  const allowAccess = await jsm.validateSdkKey(sdkKey);
  const keyValid = allowAccess["isValid"];

  if (keyValid) {
    next();
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
};

// Limit each IP to 100 requests per `window` by default
// or use the rate limit in environmental variable

let limit = process.env.RATE_LIMIT || 10;

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  limit: limit,
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false,
});
