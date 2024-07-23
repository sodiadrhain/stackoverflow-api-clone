import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { ISession } from "@interfaces";
import User from "./user.model";
import { v4 as uuidv4 } from "uuid";

class Session extends Model<ISession> implements ISession {
  public id: string;
  public userId: number;
  public userAgent?: string;
  public clientIp?: string;
  public refreshTokenCount?: number;
  public isBlocked: boolean;
  public expiresAt: Date;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize Session model
 * it's attributes and relations
 */
Session.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      unique: true,
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    userAgent: {
      field: "user_agent",
      type: DataTypes.STRING,
    },
    clientIp: {
      field: "client_ip",
      type: DataTypes.STRING,
    },
    refreshTokenCount: {
      field: "refresh_token_count",
      type: DataTypes.NUMBER,
    },
    isBlocked: {
      field: "is_blocked",
      type: DataTypes.BOOLEAN,
    },
    expiresAt: {
      field: "expires_at",
      type: DataTypes.DATE,
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
    tableName: "sessions",
    modelName: "Session",
    timestamps: false,
  }
);

/**
 * Specify relations for Session model
 */
Session.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Session, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "sessions",
});

export default Session;
