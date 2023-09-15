import jwt from "jsonwebtoken";
export const getJWTToken = (email: string, name: string) =>
  jwt.sign(
    {
      email: email,
      name: name,
    },
    process.env.JWT ?? "",
    { expiresIn: "10min" }
  );
