import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { ISubscriptionNotification } from "@interfaces";
import User from "./user.model";
import Question from "./question.model";
import Reply from "./reply.model";

class SubscriptionNotification
  extends Model<ISubscriptionNotification>
  implements ISubscriptionNotification
{
  public id: number;
  public questionId: number;
  public replyId: number;
  public userId: number;
  public status: boolean;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize SubscriptionNotification model
 * it's attributes and relations
 */
SubscriptionNotification.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    questionId: {
      field: "question_id",
      type: DataTypes.INTEGER,
      references: {
        model: "questions",
        key: "id",
      },
    },
    replyId: {
      field: "reply_id",
      type: DataTypes.INTEGER,
      references: {
        model: "replies",
        key: "id",
      },
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: DataTypes.BOOLEAN,
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
    tableName: "subscription_notifications",
    modelName: "SubscriptionNotification",
    timestamps: false,
  }
);

/**
 * Specify relations for SubscriptionNotification model
 */
SubscriptionNotification.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

SubscriptionNotification.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

SubscriptionNotification.belongsTo(Reply, {
  foreignKey: "replyId",
  as: "reply",
});

User.hasMany(SubscriptionNotification, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "subscription_notifications",
});

Question.hasMany(SubscriptionNotification, {
  sourceKey: "id",
  foreignKey: "questionId",
  as: "subscription_notifications",
});

Reply.hasMany(SubscriptionNotification, {
  sourceKey: "id",
  foreignKey: "replyId",
  as: "subscription_notifications",
});

export default SubscriptionNotification;
