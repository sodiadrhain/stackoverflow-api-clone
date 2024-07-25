import { checkSchema } from "express-validator";
import { validate } from "@utils";
class RatingValidator {
  questionRating = validate(
    checkSchema({
      questionId: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Question Id is required",
        },
        isNumeric: {
          errorMessage: "Question Id must be number",
        },
      },
      rate: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Rate is required",
        },
        isBoolean: {
          errorMessage: "Rate must a boolean",
        },
      },
    })
  );

  replyRating = validate(
    checkSchema({
      replyId: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Reply Id is required",
        },
        isNumeric: {
          errorMessage: "Reply Id must be number",
        },
      },
      rate: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Rate is required",
        },
        isBoolean: {
          errorMessage: "Rate must a boolean",
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
}

export default RatingValidator;
