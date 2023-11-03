import keyMemory from "../models/Key";

export const authenticateSDK = async (req, res, next) => {
  const sdkKey = req.query.key;
  let keyValid;

  if (keyMemory.noKeyInMemory()) {
    keyValid = await keyMemory.fetchKeyFromNatsAndCompare(sdkKey);
  } else {
    keyValid = await keyMemory.compareKeyAgainstKeyMemory(sdkKey);
  }

  if (keyValid) {
    next();
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
};
