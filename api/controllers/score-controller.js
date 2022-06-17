/** @format */
import { scoreModel } from "../models/score-model.js";

const g_t_s = async (page, limit) => {
  const scores = await scoreModel
    .find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort([["score", -1]])
    .exec();

  return scores;
};

export const create_score = async (req, res) => {
  try {
    scoreModel
      .create(req.body)
      .then(async (c) => {
        const i = await scoreModel
          .find()
          .sort([["score", -1]])
          .exec()
          .then((d) => {
            return d.findIndex((e) => e._id.valueOf() === c._id.valueOf());
          });
        return {
          scores: await g_t_s(1, 10),
          yourRank: { data: c, rank: i + 1 },
        };
      })
      .then((data) => {
        let resData;
        if (
          data.scores.some(
            (o) => o._id.valueOf() === data.yourRank.data._id.valueOf()
          )
        ) {
          resData = { scores: data.scores };
        } else {
          resData = { scores: data.scores, yourRank: data.yourRank };
        }
        return res.json({
          message: "Score success",
          success: true,
          data: resData,
        });
      });
  } catch (err) {
    return res.json({
      message: "Score failed: " + err,
      success: false,
      data: null,
    });
  }
};

export const get_all_scores = async (req, res) => {
  try {
    const scores = await scoreModel.find({}).exec();
    const sortedScores = scores.sort((a, b) => b.score - a.score);

    return res.json({
      message: "Find scores success",
      success: true,
      data: sortedScores,
    });
  } catch (err) {
    return res.json({
      message: "Find scores failed: " + err,
      success: false,
      data: null,
    });
  }
};

export const get_top_scores = async (req, res) => {
  const { page, limit } = req.query;
  const parsedPage = parseInt(page);
  try {
    const scores = await g_t_s(parsedPage, limit);
    const count = await scoreModel.countDocuments();
    return res.json({
      message: "Find scores success",
      success: true,
      data: {
        scores: scores,
        totalPages: Math.ceil(count / limit),
        page: parsedPage,
      },
    });
  } catch (err) {
    return res.json({
      message: "Find scores failed: " + err,
      success: false,
      data: null,
    });
  }
};

export const delete_all_scores = async (req, res) => {
  try {
    await scoreModel.deleteMany({}).exec();

    return res.json({
      message: "Delete all scores success",
      success: true,
      data: null,
    });
  } catch (err) {
    return res.json({
      message: "Delete all scores failed: " + err,
      success: false,
      data: null,
    });
  }
};
