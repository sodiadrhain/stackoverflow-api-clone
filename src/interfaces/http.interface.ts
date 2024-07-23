import { ROLE } from "@enums";

export interface IRequestUser {
  userId?: number;
  role?: ROLE;
  email?: string;
  expires?: number;
  sessionId: string;
}
