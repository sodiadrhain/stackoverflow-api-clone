import { questionController } from "@controllers";
import { authMiddleware } from "@middlewares";
import { questionValidator } from "@validators";
import Express, { Router } from "express";
const router: Router = Express.Router();

router.post("/", authMiddleware, questionValidator.create, questionController.postQuestion);
router.put("/:id", authMiddleware, questionValidator.update, questionController.updateQuestion);
router.get("/", questionController.getAllQuestions);
router.get("/user", authMiddleware, questionController.getUserQuestions);
router.get("/user/:id", questionValidator.get, questionController.getQuestionsByUserId);
router.get("/:id", questionValidator.get, questionController.getOneQuestion);
router.delete("/:id", authMiddleware, questionValidator.delete, questionController.deleteQuestion);

export default router;
