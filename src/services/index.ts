import LoggerService from "./logger.service";
import QuestionService from "./question.service";
import RatingService from "./rating.service";
import ReplyService from "./reply.service";
import SubscriptionService from "./subscription.service";
import UserService from "./user.service";
import SessionService from "./session.service";

export const userService = new UserService();
export const questionService = new QuestionService();
export const ratingService = new RatingService();
export const replyService = new ReplyService();
export const subscriptionService = new SubscriptionService();
export const log = new LoggerService();
export const sessionService = new SessionService();
