/** @format */

import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import path from "path";

import dotenv from "dotenv";

import index from "./api/routers/index.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
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
app.use(express.static(path.resolve("./game/public")));
// prod
// app.use(express.static(path.resolve("./omc/build")));

app.use("/", index);

app.get("*", (req, res) =>
 res.sendFile("index.html", {
  //   dev
  root: "./game/public",

  //   prod
  //    root: "./omc/build"
 })
);

app.listen(PORT, () => {
 console.log("lyssnar port " + PORT);
});
