import jsm from "../nats";

export const authenticateSDK = async (req, res, next) => {
  const sdkKey = req.query.key;

  const allowAccess = await jsm.validateSdkKey(sdkKey);
  console.log("Allow Access results: ", allowAccess);
  const keyValid = allowAccess["isValid"];

  if (keyValid) {
    next();
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
};
