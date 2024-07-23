import Express, { Router } from "express";
import AuthRouter from "./auth.route";
import UserRouter from "./user.route";
import QuestionRouter from "./question.route";
import ReplyRouter from "./reply.route";
import RatingRouter from "./rating.route";
import SubscriptionRouter from "./subscription.route";

const AppRouter: Router = Express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/user", UserRouter);
AppRouter.use("/question", QuestionRouter);
AppRouter.use("/reply", ReplyRouter);
AppRouter.use("/rating", RatingRouter);
AppRouter.use("/subscription", SubscriptionRouter);

export default AppRouter;
