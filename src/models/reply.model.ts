import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { IReply } from "@interfaces";
import User from "./user.model";
import Question from "./question.model";

class Reply extends Model<IReply> implements IReply {
  public id: number;
  public reply: string;
  public questionId: number;
  public userId: number;
  public edited: boolean;
  public status: boolean;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize Reply model
 * it's attributes and relations
 */
Reply.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    reply: DataTypes.STRING,
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
    edited: DataTypes.BOOLEAN,
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
    tableName: "replies",
    modelName: "Reply",
    timestamps: false,
  }
);

/**
 * Specify relations for Reply model
 */
Reply.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Reply.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

User.hasMany(Reply, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "replies",
});

Question.hasMany(Reply, {
  sourceKey: "id",
  foreignKey: "questionId",
  as: "replies",
});

export default Reply;
