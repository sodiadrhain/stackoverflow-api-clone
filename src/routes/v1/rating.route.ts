import { ratingController } from "@controllers";
import { authMiddleware } from "@middlewares";
import { ratingValidator } from "@validators";
import Express, { Router } from "express";
const router: Router = Express.Router();

router.post(
  "/question",
  authMiddleware,
  ratingValidator.questionRating,
  ratingController.rateQuestion
);
router.get("/question/:id", ratingValidator.get, ratingController.getQuestionRating);
router.post("/reply", authMiddleware, ratingValidator.replyRating, ratingController.rateReply);
router.get("/reply/:id", ratingValidator.get, ratingController.getReplyRating);

export default router;
