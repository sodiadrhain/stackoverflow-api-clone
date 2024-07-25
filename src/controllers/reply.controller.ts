import { Request, Response } from "express";
import { questionService, replyService } from "@services";
import { paginate } from "@utils";

class ReplyController {
  /**
   * @route POST Reply
   * @desc Post a reply to a question
   * @access Private
   */
  postReply = async (req: Request, res: Response) => {
    const { reply, questionId } = req.body;

    try {
      const question = await questionService.getQuestion({ id: questionId });
      if (!question) {
        return res.notFound("Question not found");
      }

      const data = await replyService.createReplyTx(
        {
          reply,
          questionId,
          userId: req.user.userId,
        },
        question
      );

      res.created(data, "Reply created successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Reply
   * @desc Get one reply
   * @access Public.
   */
  getOneReply = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const reply = await replyService.getReply({ id });
      if (!reply) {
        return res.notFound("Reply not found");
      }

      res.ok(reply, "Reply fetched successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET User Replies
   * @desc Get all user replies
   * @access Private.
   */
  getUserReplies = async (req: Request, res: Response) => {
    const { limit, page } = req.query;
    const pageLimit = Number(limit) || 10;
    const pageNumber = Number(page) || 1;

    try {
      const replies = await replyService.listReplys({
        limit: pageLimit,
        page: pageNumber,
        query: { userId: req.user.userId },
      });

      res.ok(
        {
          data: replies.rows,
          meta: { ...paginate(pageNumber, pageLimit, replies.count) },
        },
        "Replies fetched successfully"
      );
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Question replies
   * @desc Get all replies for a question
   * @access Public.
   */
  getRepliesByQuestionId = async (req: Request, res: Response) => {
    const questionId = Number(req.params.id);
    const { limit, page } = req.query;
    const pageLimit = Number(limit) || 10;
    const pageNumber = Number(page) || 1;

    try {
      const replies = await replyService.listReplys({
        limit: pageLimit,
        page: pageNumber,
        query: { questionId },
      });

      res.ok(
        {
          data: replies.rows,
          meta: { ...paginate(pageNumber, pageLimit, replies.count) },
        },
        "Question replies fetched successfully"
      );
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route PUT reply
   * @desc Update a reply
   * @access Private.
   */
  updateReply = async (req: Request, res: Response) => {
    const { reply } = req.body;
    const id = Number(req.params.id);

    try {
      const getReply = await replyService.getReply({ id });
      if (!getReply) {
        return res.notFound("Reply not found");
      }

      if (getReply.userId !== req.user.userId) {
        return res.unauthorized("You do not have access to this action");
      }

      const updatedReply = await replyService.updateReply(getReply, {
        reply,
        edited: true,
      });

      res.ok(updatedReply, "Reply updated successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route DELETE reply
   * @desc DELETE a reply
   * @access Private.
   */
  deleteReply = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const reply = await replyService.getReply({ id });
      if (!reply) {
        return res.notFound("Reply not found");
      }

      if (reply.userId !== req.user.userId) {
        return res.unauthorized("You do not have access to this action");
      }

      await replyService.deleteReply({ id });
      res.ok(null, "Reply deleted succesfully");
    } catch (error) {
      res.serverError(error);
    }
  };
}

export default ReplyController;
