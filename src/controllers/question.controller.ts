import { Request, Response } from "express";
import { questionService } from "@services";
import { generateSlug, isEmptyObject, paginate } from "@utils";
import { v4 as uuidv4 } from "uuid";

class QuestionController {
  /**
   * @route POST Question
   * @desc Post a new question
   * @access Private
   */
  postQuestion = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    try {
      const question = await questionService.createQuestion({
        title,
        description,
        slug: generateSlug(title + "-" + uuidv4()),
        userId: req.user.userId,
      });
      res.created(question, "Question created successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Question
   * @desc Get one question
   * @access Public.
   */
  getOneQuestion = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const question = await questionService.getQuestion({ id });
      if (!question) {
        return res.notFound("Question not found");
      }

      res.ok(question, "Question fetched successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET Questions
   * @desc Get all question
   * @access Public.
   */
  getAllQuestions = async (req: Request, res: Response) => {
    const { limit, page } = req.query;
    const pageLimit = Number(limit) || 10;
    const pageNumber = Number(page) || 1;

    try {
      const questions = await questionService.listQuestions({
        limit: pageLimit,
        page: pageNumber,
      });

      res.ok(
        {
          data: questions.rows,
          meta: { ...paginate(pageNumber, pageLimit, questions.count) },
        },
        "Questions fetched successfully"
      );
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET User Questions
   * @desc Get all user question
   * @access Private.
   */
  getUserQuestions = async (req: Request, res: Response) => {
    const { limit, page } = req.query;
    const pageLimit = Number(limit) || 10;
    const pageNumber = Number(page) || 1;

    try {
      const questions = await questionService.listQuestions({
        limit: pageLimit,
        page: pageNumber,
        query: { userId: req.user.userId },
      });

      res.ok(
        {
          data: questions.rows,
          meta: { ...paginate(pageNumber, pageLimit, questions.count) },
        },
        "Questions fetched successfully"
      );
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET User Questions
   * @desc Get all questions by user id
   * @access Private.
   */
  getQuestionsByUserId = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const { limit, page } = req.query;
    const pageLimit = Number(limit) || 10;
    const pageNumber = Number(page) || 1;

    try {
      const questions = await questionService.listQuestions({
        limit: pageLimit,
        page: pageNumber,
        query: { userId },
      });

      res.ok(
        {
          data: questions.rows,
          meta: { ...paginate(pageNumber, pageLimit, questions.count) },
        },
        "User questions fetched successfully"
      );
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route PUT question
   * @desc Update a question
   * @access Private.
   */
  updateQuestion = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const id = Number(req.params.id);

    if (isEmptyObject(req.body))
      return res.badRequest("Body must have at least one of [title, description]");

    try {
      const question = await questionService.getQuestion({ id });
      if (!question) {
        return res.notFound("Question not found");
      }

      if (question.userId !== req.user.userId) {
        return res.unauthorized("You do not have access to this action");
      }

      const updatedQuestion = await questionService.updateQuestion(question, {
        title,
        description,
        edited: true,
      });

      res.ok(updatedQuestion, "Question updated successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route DELETE question
   * @desc DELETE a question
   * @access Private.
   */
  deleteQuestion = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const question = await questionService.getQuestion({ id });
      if (!question) {
        return res.notFound("Question not found");
      }

      if (question.userId !== req.user.userId) {
        return res.unauthorized("You do not have access to this action");
      }

      await questionService.deleteQuestion({ id });
      res.ok(null, "Question deleted succesfully");
    } catch (error) {
      res.serverError(error);
    }
  };
}

export default QuestionController;
