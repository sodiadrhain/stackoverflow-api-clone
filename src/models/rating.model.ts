import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { IRating } from "@interfaces";
import User from "./user.model";
import Question from "./question.model";

class Rating extends Model<IRating> implements IRating {
  public id: number;
  public questionId: number;
  public userId: number;
  public upVote: boolean;
  public downVote: boolean;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize Rating model
 * it's attributes and relations
 */
Rating.init(
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
    tableName: "ratings",
    modelName: "Rating",
    timestamps: false,
  }
);

/**
 * Specify relations for Rating model
 */
Rating.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Rating.belongsTo(Question, {
  foreignKey: "questionId",
  as: "question",
});

User.hasMany(Rating, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "ratings",
});

Question.hasMany(Rating, {
  sourceKey: "id",
  foreignKey: "questionId",
  as: "ratings",
});

export default Rating;
