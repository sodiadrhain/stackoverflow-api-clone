export interface IUser {
  id?: number;
  email?: string;
  password?: string;
  displayName?: string;
  fullname?: string;
  role?: string;
  location?: string;
  photo?: string;
  lastLogin?: Date;
  verified?: boolean;
  verifiedAt?: Date;
  isBanned?: boolean;
  lastVisitedPage?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IQuestion {
  id?: number;
  title?: string;
  description?: string;
  slug?: string;
  userId?: number;
  edited?: boolean;
  status?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ISubscription {
  id?: number;
  questionId?: number;
  userId?: number;
  status?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IRating {
  id?: number;
  questionId?: number;
  userId?: number;
  upVote?: boolean;
  downVote?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IReply {
  id?: number;
  reply?: string;
  questionId?: number;
  userId?: number;
  edited?: boolean;
  status?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ISession {
  id?: string;
  userId?: number;
  userAgent?: string;
  clientIp?: string;
  refreshTokenCount?: number;
  isBlocked?: boolean;
  expiresAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
}
