import { Request, Response } from "express";
import { questionService, ratingService, replyService } from "@services";

class RatingController {
  /**
   * @route POST Rate question
   * @desc Rating for a question
   * @access Private
   */
  rateQuestion = async (req: Request, res: Response) => {
    const { rate, questionId } = req.body;
    const userId = req.user.userId;

    try {
      let upVote = false,
        downVote = false;
      if (rate === true) {
        upVote = true;
      } else {
        downVote = true;
      }

      const existingRating = await ratingService.getQuestionRating({ questionId, userId });
      if (existingRating) {
        await ratingService.updateQuestionRating(existingRating, { upVote, downVote });
        return res.ok(existingRating, "Rating updated successfully");
      } else {
        const newRating = await ratingService.createQuestionRating({
          upVote,
          downVote,
          questionId,
          userId,
        });
        res.created(newRating, "Rating created successfully");
      }
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route POST Rate reply
   * @desc Rating for a reply
   * @access Private
   */
  rateReply = async (req: Request, res: Response) => {
    const { rate, replyId } = req.body;
    const userId = req.user.userId;

    try {
      let upVote = false,
        downVote = false;
      if (rate === true) {
        upVote = true;
      } else {
        downVote = true;
      }

      const existingRating = await ratingService.getReplyRating({ replyId, userId });
      if (existingRating) {
        await ratingService.updateReplyRating(existingRating, { upVote, downVote });
        return res.ok(existingRating, "Rating updated successfully");
      } else {
        const newRating = await ratingService.createReplyRating({
          upVote,
          downVote,
          replyId,
          userId: req.user.userId,
        });
        res.created(newRating, "Rating created successfully");
      }
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Question Rating
   * @desc Get total rating of a question
   * @access Public.
   */
  getQuestionRating = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const question = await questionService.getQuestion({ id });
      if (!question) {
        return res.notFound("Question not found");
      }

      const upVote = await ratingService.getQuestionRatingCount({
        questionId: question.id,
        upVote: true,
      });
      const downVote = await ratingService.getQuestionRatingCount({
        questionId: question.id,
        downVote: true,
      });

      res.ok({ count: upVote.count - downVote.count }, "Question rating fetched successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Reply Rating
   * @desc Get total rating of a reply
   * @access Public.
   */
  getReplyRating = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const reply = await replyService.getReply({ id });
      if (!reply) {
        return res.notFound("Reply not found");
      }

      const upVote = await ratingService.getReplyRatingCount({ replyId: reply.id, upVote: true });
      const downVote = await ratingService.getReplyRatingCount({
        replyId: reply.id,
        downVote: true,
      });

      res.ok({ count: upVote.count - downVote.count }, "Reply rating fetched successfully");
    } catch (error) {
      res.serverError(error);
    }
  };
}

export default RatingController;
