import jwt from "jsonwebtoken";
const SECRET_KEY =
  process.env.JWT_SECRET_KEY ||
  "629e31fd1f5e6a0aa0f87c2eb6f206a3144eaa9e751c5c77b57c7dac993980f0";
const token = jwt.sign({ userId: "test-user", roles: ["admin"] }, SECRET_KEY);
console.log("Bearer", token);
