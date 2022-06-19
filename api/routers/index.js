/** @format */

import express from "express";

import {
 get_all_scores,
 get_top_scores,
} from "../controllers/score-controller.js";

const router = express.Router();

// score
router.get("/get_all_scores", get_all_scores);
router.get("/get_top_scores", get_top_scores);

export default router;
