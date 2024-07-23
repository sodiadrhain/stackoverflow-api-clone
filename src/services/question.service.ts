import { IQuestion } from "@interfaces";
import { Question } from "@models";

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
  public listQuestions(): Promise<Question[]> {
    return Question.findAll();
  }

  // UpdateQuestion :one
  public updateQuestion(question: Question, updates: IQuestion): Promise<Question> {
    return question.update({ ...updates });
  }
}

export default QuestionService;
