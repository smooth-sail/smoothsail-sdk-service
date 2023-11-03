import jsm from "../nats";

export const authenticateSDK = async (req, res, next) => {
  const sdkKey = req.query.key;
  const allowAccess = await jsm.validateSdkKey(sdkKey);
  console.log("(middleware) should this key be allowed access: ", allowAccess);
  if (allowAccess["isValid"]) {
    next();
  } else {
    res.status(401).send({ error: "Invalid credentials" });
  }
};
