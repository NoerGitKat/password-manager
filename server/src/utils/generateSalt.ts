import crypto from "crypto";

const generateSalt = () => {
  return crypto.randomBytes(64).toString("hex");
};

export default generateSalt;
