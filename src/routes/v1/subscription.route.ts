import { subscriptionController } from "@controllers";
import { authMiddleware } from "@middlewares";
import { subscriptionValidator } from "@validators";
import Express, { Router } from "express";
const router: Router = Express.Router();

router.post(
  "/",
  authMiddleware,
  subscriptionValidator.create,
  subscriptionController.subscribeToQuestion
);
router.get(
  "/question/:id",
  authMiddleware,
  subscriptionValidator.get,
  subscriptionController.getSubByQuestion
);
router.get("/notification", authMiddleware, subscriptionController.getSubNotifications);

export default router;
