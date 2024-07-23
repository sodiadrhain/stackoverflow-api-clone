import { IQuestion } from "@interfaces";
import { Question } from "@models";
import { IPaginationOptions } from "src/interfaces/pagination.interface";

class QuestionService {
  // CreateQuestion :one
  public createQuestion(question: IQuestion): Promise<Question> {
    return Question.create(question);
  }

  // GetQuestion :one
  public getQuestion(question: IQuestion): Promise<Question> {
    return Question.findByPk(question.id);
  }

  // ListQuestions :many
  public listQuestions(
    arg: IPaginationOptions<IQuestion>
  ): Promise<{ rows: Question[]; count: number }> {
    return Question.findAndCountAll({
      where: { ...arg.query },
      limit: arg.limit,
      offset: arg.limit * (arg.page - 1),
      order: [["id", "DESC"]],
    });
  }

  // UpdateQuestion :one
  public updateQuestion(question: Question, updates: IQuestion): Promise<Question> {
    question.update({ ...updates });
    return question.save();
  }

  // DeleteQuestion :one
  public deleteQuestion(question: IQuestion): Promise<number> {
    return Question.destroy({ where: { id: question.id }, cascade: true });
  }
}

export default QuestionService;
