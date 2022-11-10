/** @format */

import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import path from "path";

import dotenv from "dotenv";

import index from "./api/routers/index.js";
import protectedRouter from "./api/routers/protected.js";
import { auth } from "./api/middlewares/auth.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  console.log('gege');
 try {
  await mongoose.connect(process.env.DB_URI);

  console.log("mongo connected");
 } catch (err) {
  process.exit(); 
 }
})();

const corsOptions = {
 origin: "*",
 credentials: true,
 optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// dev
// app.use(express.static(path.resolve("./game/public")));
// prod
// app.use(express.static(path.resolve("./omc/build")));

app.use(
 process.env.MODE === "dev"
  ? express.static(path.resolve("./game/public"))
  : express.static(path.resolve("./game/build"))
);

app.use("/", index);
app.use("/auth", auth, protectedRouter);


app.get("*", (req, res) =>
 res.sendFile("index.html", {
  root: process.env.MODE === "dev" ? "./game/public" : "./game/build",
 })
);




app.listen(PORT, () => {
 console.log("lyssnar port " + PORT);
});
