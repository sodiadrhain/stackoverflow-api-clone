import { JWT } from "@envs";
import { ISession, IUser } from "@interfaces";
import * as jwt from "jsonwebtoken";

export const generateToken = (user: IUser, session: ISession, refresh = false): string => {
  const dateNow = new Date();
  const expires = refresh
    ? dateNow.setHours(dateNow.getHours() + Number(JWT.REFRESH_EXPIRY))
    : dateNow.setSeconds(dateNow.getSeconds() + Number(JWT.EXPIRY));

  const secret = refresh ? JWT.REFRESH_SECRET : JWT.SECRET;

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      email: user.email,
      expires,
      sessionId: session.id,
    },
    secret,
    {
      expiresIn: JWT.EXPIRY,
    }
  );

  return token;
};

export const decodeToken = (token: string, refresh = false): unknown => {
  const secret = refresh ? JWT.REFRESH_SECRET : JWT.SECRET;
  return jwt.verify(token, secret);
};
