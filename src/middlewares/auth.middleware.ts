import passport from "passport";
import { IRequestUser } from "@interfaces";

import { Request, Response, NextFunction } from "express";
import { sessionService } from "@services";

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", async function (err: Error, user: IRequestUser) {
    if (err) return next(err);
    if (!user) return res.unauthorized();

    try {
      const session = await sessionService.getSession({ id: user.sessionId });
      if (!session || session.expiresAt < new Date()) {
        return res.unauthorized();
      }

      req.user = user;
      next();
    } catch (error) {
      res.serverError(error);
    }
  })(req, res, next);
};
