import { Request, Response } from "express";
import { sessionService, userService } from "@services";
import { decryptPassword, generateToken, hashPassword } from "@utils";
import { JWT } from "@envs";
import { RESPONSE_MSG } from "@enums";

class AuthController {
  /**
   * @route POST register
   * @desc Register user
   * @access Public
   */
  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.createUser({ email, password: hashPassword(password) });
      res.ok({ email: user.email }, "User registered successfully");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route POST login
   * @desc Login user
   * @access Public
   */
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.badRequest("User does not exist");
      }

      const verifyPassword = decryptPassword(password, user.password);
      if (!verifyPassword) {
        return res.badRequest("Invalid credentials");
      }

      const dateNow = new Date();
      user.lastLogin = dateNow;
      await user.save();

      // create session
      const session = await sessionService.createSession({
        userId: user.id,
        expiresAt: new Date(dateNow.setHours(dateNow.getHours() + Number(JWT.REFRESH_EXPIRY))),
        userAgent: req.get("user-agent"),
        clientIp: req.ip,
      });

      const token = {
        accessToken: generateToken(user, session),
        refreshToken: generateToken(user, session, true),
      };

      res.ok({ email: user.email, token }, "Login successful");
    } catch (error) {
      res.serverError(error);
    }
  };

  /**
   * @route GET logout
   * @desc Logout user
   * @access Private
   */
  logout = async (req: Request, res: Response) => {
    try {
      const session = await sessionService.getSession({ id: req.user.sessionId });
      await sessionService.updateSession(session, { expiresAt: new Date() });
      res.ok(null, "Logout successful");
    } catch (error) {
      res.serverError(error);
    }
  };
}

export default AuthController;
