import jwt from "jsonwebtoken";
const SECRET_KEY =
  process.env.JWT_SECRET_KEY ||
  "629e31fd1f5e6a0aa0f87c2eb6f206a3144eaa9e751c5c77b57c7dac993980f0";

const authenticate = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    throw new Error("Authorization header is required");
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    throw new Error("Bearer token is required");
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid or expired token");
  }
};

export default authenticate;
