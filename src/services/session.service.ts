import { ISession, IUser } from "@interfaces";
import { Session } from "@models";

class SessionService {
  // CreateSession :one
  public createSession(session: ISession): Promise<Session> {
    return Session.create(session);
  }

  // GetSession :one
  public getSession(session: ISession): Promise<Session> {
    return Session.findByPk(session.id);
  }

  // ListUserSessions :many DESC
  public getSessionsByUserId(user: IUser): Promise<Session[]> {
    return Session.findAll({ where: { userId: user.id }, order: [["id", "DESC"]] });
  }

  // UpdateSession :one
  public updateSession(session: Session, updates: ISession): Promise<Session> {
    session.update({ ...updates });
    return session.save();
  }
}

export default SessionService;
