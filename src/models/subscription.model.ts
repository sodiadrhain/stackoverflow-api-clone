import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { ISubscription } from "@interfaces";
import User from "./user.model";
import Question from "./question.model";

class Subscription extends Model<ISubscription> implements ISubscription {
  public id: number;
  public questionId: number;
  public userId: number;
  public status: boolean;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize Subscription model
 * it's attributes and relations
 */
Subscription.init(
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
    tableName: "subscriptions",
    modelName: "Subscription",
    timestamps: false,
  }
);

/**
 * Specify relations for Subscription model
 */
Subscription.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Subscription.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});

User.hasMany(Subscription, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "subscriptions",
});

Question.hasMany(Subscription, {
  sourceKey: "id",
  foreignKey: "question_id",
  as: "subscriptions",
});

export default Subscription;
