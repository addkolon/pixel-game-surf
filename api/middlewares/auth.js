/** @format */

import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {
 if (req.headers.auth === process.env.AUTH) {
  return next();
 } else {
  return;
 }
};
