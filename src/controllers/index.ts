import QuestionController from "./question.controller";
import RatingController from "./rating.controller";
import ReplyController from "./reply.controller";
import SubscriptionController from "./subscription.controller";
import UserController from "./user.controller";
import AuthController from "./auth.controller";

export const userController = new UserController();
export const questionController = new QuestionController();
export const ratingController = new RatingController();
export const replyController = new ReplyController();
export const subscriptionController = new SubscriptionController();
export const authController = new AuthController();
