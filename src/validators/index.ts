import QuestionValidator from "./question.validator";
import RatingValidator from "./rating.validator";
import ReplyValidator from "./reply.validator";
import SubscriptionValidator from "./subscription.validator";
import UserValidator from "./user.validator";
import AuthValidator from "./auth.validator";

export const userValidator = new UserValidator();
export const questionValidator = new QuestionValidator();
export const ratingValidator = new RatingValidator();
export const replyValidator = new ReplyValidator();
export const subscriptionValidator = new SubscriptionValidator();
export const authValidator = new AuthValidator();
