import { replyController } from "@controllers";
import { authMiddleware } from "@middlewares";
import { replyValidator } from "@validators";
import Express, { Router } from "express";
const router: Router = Express.Router();

router.post("/", authMiddleware, replyValidator.create, replyController.postReply);
router.put("/:id", authMiddleware, replyValidator.update, replyController.updateReply);
router.get("/user", authMiddleware, replyController.getUserReplies);
router.get("/:id", replyValidator.get, replyController.getOneReply);
router.get("/question/:id", replyValidator.get, replyController.getRepliesByQuestionId);
router.delete("/:id", authMiddleware, replyValidator.delete, replyController.deleteReply);

export default router;
