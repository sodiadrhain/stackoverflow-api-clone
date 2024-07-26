import { questionService, snSevice, subscriptionService } from "@services";
import { paginate } from "@utils";
import { Request, Response } from "express";

class SubscriptionController {
  /**
   * @route POST Subscribe
   * @desc Subscribe to a question
   * @access Private
   */
  subscribeToQuestion = async (req: Request, res: Response) => {
    const { questionId } = req.body;
    const userId = req.user.userId;

    try {
      const question = await questionService.getQuestion({ id: questionId });
      if (!question) {
        return res.notFound("Question not found");
      }

      const checkIfSubs = await subscriptionService.getSubscription({ questionId, userId });
      if (checkIfSubs) {
        return res.badRequest("Already subscibed to question");
      }

      const subsciption = await subscriptionService.createSubscription({
        questionId,
        userId,
      });
      res.ok(subsciption, "Subscribed to question successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Subscription questions
   * @desc Get
   * @access Private.
   */
  getSubByQuestion = async (req: Request, res: Response) => {
    const questionId = Number(req.params.id);
    const userId = req.user.userId;
    try {
      const subscriptions = await subscriptionService.getSubscription({
        userId,
        questionId,
      });
      if (!subscriptions) {
        return res.notFound("You have not subscribed to this question");
      }

      res.ok(subscriptions, "Subscription fetched successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Subscription notifications
   * @desc Get
   * @access Private.
   */
  getSubNotifications = async (req: Request, res: Response) => {
    const { limit, page } = req.query;
    const pageLimit = Number(limit) || 10;
    const pageNumber = Number(page) || 1;
    const userId = req.user.userId;
    try {
      const sn = await snSevice.listSns({
        limit: pageLimit,
        page: pageNumber,
        query: { userId },
      });

      res.ok(
        {
          data: sn.rows,
          meta: { ...paginate(pageNumber, pageLimit, sn.count) },
        },
        "Subscription notifications fetched successfully"
      );
    } catch (error) {
      res.serverError(error);
    }
  };
}

export default SubscriptionController;
