/** @format */

import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const scoreSchema = new Schema({
 name: {
  type: String,
  required: true,
 },
 score: {
  type: Number,
  required: true,
 },
});

export const scoreModel = mongoose.model("Score", scoreSchema);
