import { checkSchema } from "express-validator";
import { validate } from "@utils";

class ReplyValidator {
  create = validate(
    checkSchema({
      reply: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Reply is required",
        },
        isString: {
          errorMessage: "Reply must be string",
        },
      },
      questionId: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Question Id is required",
        },
        isNumeric: {
          errorMessage: "Question Id must be number",
        },
      },
    })
  );

  update = validate(
    checkSchema({
      id: {
        in: ["params"],
        notEmpty: {
          errorMessage: "Id is required",
        },
        isNumeric: {
          errorMessage: "Id must be type of number",
        },
      },
      reply: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Reply is required",
        },
        isString: {
          errorMessage: "Reply must be string",
        },
      },
    })
  );

  get = validate(
    checkSchema({
      id: {
        in: ["params"],
        notEmpty: {
          errorMessage: "Id is required",
        },
        isNumeric: {
          errorMessage: "Id must be type of number",
        },
      },
    })
  );

  delete = validate(
    checkSchema({
      id: {
        in: ["params"],
        notEmpty: {
          errorMessage: "Id is required",
        },
        isNumeric: {
          errorMessage: "Id must be type of number",
        },
      },
    })
  );
}

export default ReplyValidator;
