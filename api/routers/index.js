/** @format */

import express from "express";

import {
  create_score,
  get_all_scores,
  get_top_scores,
  delete_all_scores,
} from "../controllers/score-controller.js";

const router = express.Router();

// score
router.post("/create_score", create_score);
router.get("/get_all_scores", get_all_scores);
router.get("/get_top_scores", get_top_scores);
router.get("/delete_all_scores", delete_all_scores);

export default router;
