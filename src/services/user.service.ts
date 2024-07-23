import { IUser } from "@interfaces";
import { User } from "@models";

class UserService {
  // CreateUser :one
  public createUser(user: IUser): Promise<User> {
    return User.create(user);
  }

  // GetUser :one
  public getUser(user: IUser): Promise<User> {
    return User.findByPk(user.id);
  }

  // ListUsers :many
  public listUsers(): Promise<User[]> {
    return User.findAll();
  }

  // UpdateUser :one
  public updateUser(user: User, updates: IUser): Promise<User> {
    user.update({ ...updates });
    return user.save();
  }

  // GetUserByEmail :one
  public getUserByEmail(email: string): Promise<User> {
    return User.findOne({ where: { email } });
  }
}

export default UserService;
