import { checkSchema } from "express-validator";
import { validate } from "@utils";

class SubscriptionValidator {
  create = validate(
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

export default SubscriptionValidator;
