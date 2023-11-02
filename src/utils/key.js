import bcrypt from "bcrypt";

export const hashSdkKey = async (key) => {
  const saltRounds = 10;
  const hashedKey = await bcrypt.hash(key, saltRounds);
  return hashedKey;
};

export const compareKeys = async (key, hashedKey) => {
  const match = await bcrypt.compare(key, hashedKey);
  return match;
};
