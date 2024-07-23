import { checkSchema } from "express-validator";
import { validate } from "@utils";
class QuestionValidator {
  create = validate(
    checkSchema({
      title: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Title is required",
        },
        isString: {
          errorMessage: "Title must be string",
        },
        trim: true,
      },
      description: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Description is required",
        },
        isString: {
          errorMessage: "Description must be string",
        },
        optional: true,
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
      title: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Title is required",
        },
        isString: {
          errorMessage: "Title must be string",
        },
        trim: true,
        optional: true,
      },
      description: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Description is required",
        },
        isString: {
          errorMessage: "Description must be string",
        },
        optional: true,
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

export default QuestionValidator;
