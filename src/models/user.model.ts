import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { IUser } from "@interfaces";

class User extends Model<IUser> implements IUser {
  public id: number;
  public email: string;
  public password: string;
  public displayName: string;
  public fullname: string;
  public role: string;
  public location: string;
  public photo: string;
  public lastLogin: Date;
  public verified: boolean;
  public verifiedAt: Date;
  public isBanned: boolean;
  public lastVisitedPage: string;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize User model
 * it's attributes and relations
 */
User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    displayName: {
      field: "display_name",
      type: DataTypes.STRING,
    },
    fullname: DataTypes.STRING,
    role: DataTypes.STRING,
    location: DataTypes.STRING,
    photo: DataTypes.STRING,
    lastLogin: {
      field: "last_login",
      type: DataTypes.DATE,
    },
    verified: DataTypes.BOOLEAN,
    verifiedAt: {
      field: "verified_at",
      type: DataTypes.DATE,
    },
    isBanned: {
      field: "is_banned",
      type: DataTypes.BOOLEAN,
    },
    lastVisitedPage: {
      field: "last_visited_page",
      type: DataTypes.STRING,
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    modelName: "User",
    timestamps: false,
  }
);

export default User;
