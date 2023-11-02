export const authenticateSDK = (req, res, next) => {
  console.log("key that is passed", req.query.key);
  next();
};
