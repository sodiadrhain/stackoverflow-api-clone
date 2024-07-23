import { Request, Response } from "express";
import { sessionService, userService } from "@services";
import { decryptPassword, generateToken, hashPassword, decodeToken } from "@utils";
import { JWT } from "@envs";

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
      res.created({ email: user.email }, "User registered successfully");
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

  /**
   * @route POST refresh
   * @desc Get new authToken
   * @access Public
   */
  refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      req.user = decodeToken(token, true);

      const session = await sessionService.getSession({ id: req.user.sessionId });
      if (!session || session.expiresAt < new Date()) {
        return res.badRequest("Token expired or Invalid");
      }

      // Users can only request new token at a limited interval
      if (session.refreshTokenCount > 4) {
        await sessionService.updateSession(session, {
          expiresAt: new Date(),
        });
      }

      const _token = {
        accessToken: generateToken({ id: req.user.userId, ...req.user }, session),
        refreshToken: token,
      };

      // Increment refreshTokenCount as new token is requested
      await sessionService.updateSession(session, {
        refreshTokenCount: session.refreshTokenCount + 1,
      });

      res.ok({ token: _token });
    } catch (_) {
      res.badRequest("Token expired or Invalid");
    }
  };
}

export default AuthController;
