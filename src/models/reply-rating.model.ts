import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { IReplyRating } from "@interfaces";
import User from "./user.model";
import Question from "./question.model";
import Reply from "./reply.model";

class ReplyRating extends Model<IReplyRating> implements IReplyRating {
  public id: number;
  public replyId: number;
  public userId: number;
  public upVote: boolean;
  public downVote: boolean;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize ReplyRating model
 * it's attributes and relations
 */
ReplyRating.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    upVote: {
      field: "up_vote",
      type: DataTypes.BOOLEAN,
    },
    downVote: {
      field: "down_vote",
      type: DataTypes.BOOLEAN,
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
    tableName: "reply_ratings",
    modelName: "ReplyRating",
    timestamps: false,
  }
);

/**
 * Specify relations for ReplyRating model
 */
ReplyRating.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

ReplyRating.belongsTo(Question, {
  foreignKey: "replyId",
  as: "reply",
});

User.hasMany(ReplyRating, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "reply_ratings",
});

Reply.hasMany(ReplyRating, {
  sourceKey: "id",
  foreignKey: "replyId",
  as: "reply_ratings",
});

export default ReplyRating;
