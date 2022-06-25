/** @format */

import express from "express";

import {
 create_score,
 get_rank,
 delete_all_scores,
} from "../controllers/score-controller.js";

const router = express.Router();

// score
router.post("/create_score", create_score);
router.get("/get_rank", get_rank);
router.get("/delete_all_scores", delete_all_scores);

export default router;
