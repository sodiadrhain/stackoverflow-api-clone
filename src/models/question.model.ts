import { DataTypes, Model } from "sequelize";
import { db } from "@config";
import { IQuestion } from "@interfaces";
import User from "./user.model";

class Question extends Model<IQuestion> implements IQuestion {
  public id: number;
  public title: string;
  public description: string;
  public slug: string;
  public userId: number;
  public edited: boolean;
  public status: boolean;

  public readonly updatedAt: Date;
  public readonly createdAt: Date;
}

/**
 * Initialize Question model
 * it's attributes and relations
 */
Question.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
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
    tableName: "questions",
    modelName: "Question",
    timestamps: false,
  }
);

/**
 * Specify realtions to be able to fetch all User Questions
 */
Question.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Question, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "questions",
});

export default Question;
