import { checkSchema } from "express-validator";
import { validate } from "@utils";
import { userService } from "@services";

class AuthValidator {
  login = validate(
    checkSchema({
      email: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Email is required",
        },
        trim: true,
      },
      password: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Password is required",
        },
      },
    })
  );

  register = validate(
    checkSchema({
      email: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Email is required",
        },
        isEmail: {
          errorMessage: "Email is not valid",
        },
        trim: true,
        custom: {
          options: async (value) => {
            const email = await userService.getUserByEmail(value);
            if (email) {
              throw new Error("Email is already in use");
            }
          },
        },
      },
      password: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Password is required",
        },
        isStrongPassword: {
          errorMessage:
            "Password is weak, kindly create strong password with at least 8 characters long containing at least a number, symbol, letter",
        },
      },
    })
  );

  refreshToken = validate(
    checkSchema({
      token: {
        in: ["body"],
        notEmpty: {
          errorMessage: "Token is required",
        },
        isString: {
          errorMessage: "Token must be a string",
        },
      },
    })
  );
}

export default AuthValidator;
